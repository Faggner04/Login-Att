import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import CalendarScreen from './screens/CalendarScreen';
import DayTasksScreen from './screens/DayTasksScreen';
import TaskFormScreen from './screens/TaskFormScreen';
import SettingsScreen from './screens/SettingsScreen';
import { getSession, logout, saveSession } from './services/authService';
import { createTask, deleteTask, getTasksByUser, updateTask } from './services/taskService';
import { getSettings, saveSettings } from './services/settingsService';
import { todayString } from './utils/date';
import { getTasksForDate } from './utils/recurrence';
import { makeStyles } from './styles/globalStyles';
import { themes } from './styles/theme';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [settings, setSettings] = useState({ theme: 'light' });
  const [screen, setScreen] = useState('login');
  const [selectedDate, setSelectedDate] = useState(todayString());
  const [editingTask, setEditingTask] = useState(null);
  const theme = themes[settings.theme] || themes.light;
  const styles = useMemo(() => makeStyles(theme), [theme]);

  useEffect(() => {
    async function boot() {
      const storedSettings = await getSettings();
      const storedSession = await getSession();
      setSettings(storedSettings);
      if (storedSession) {
        setUser(storedSession);
        setTasks(await getTasksByUser(storedSession.id));
        setScreen('dashboard');
      }
      setLoading(false);
    }
    boot();
  }, []);

  async function handleAuthenticated(nextUser) {
    await saveSession(nextUser);
    setUser(nextUser);
    setTasks(await getTasksByUser(nextUser.id));
    setScreen('dashboard');
  }

  async function refreshTasks() {
    if (user) setTasks(await getTasksByUser(user.id));
  }

  async function handleSaveTask(taskInput) {
    if (editingTask) await updateTask(user.id, { ...editingTask, ...taskInput });
    else await createTask(user.id, taskInput);
    await refreshTasks();
    setEditingTask(null);
    setScreen('day');
  }

  async function handleDeleteTask(taskId) {
    await deleteTask(user.id, taskId);
    await refreshTasks();
  }

  async function handleToggleTask(task) {
    await updateTask(user.id, { ...task, status: task.status === 'concluida' ? 'pendente' : 'concluida' });
    await refreshTasks();
  }

  async function handleThemeChange(themeName) {
    const nextSettings = { ...settings, theme: themeName };
    setSettings(nextSettings);
    await saveSettings(nextSettings);
  }

  async function handleLogout() {
    await logout();
    setUser(null);
    setTasks([]);
    setScreen('login');
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const commonProps = { theme, styles };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={settings.theme === 'dark' ? 'light' : 'dark'} />
      {screen === 'login' && <LoginScreen {...commonProps} onLogin={handleAuthenticated} onRegister={() => setScreen('register')} />}
      {screen === 'register' && <RegisterScreen {...commonProps} onRegister={handleAuthenticated} onBack={() => setScreen('login')} />}
      {screen === 'dashboard' && user && (
        <DashboardScreen
          {...commonProps}
          user={user}
          tasks={tasks}
          todayTasks={getTasksForDate(tasks, todayString())}
          onOpenCalendar={() => setScreen('calendar')}
          onOpenToday={() => {
            setSelectedDate(todayString());
            setScreen('day');
          }}
          onSettings={() => setScreen('settings')}
          onLogout={handleLogout}
        />
      )}
      {screen === 'calendar' && (
        <CalendarScreen
          {...commonProps}
          tasks={tasks}
          selectedDate={selectedDate}
          onSelectDate={(date) => {
            setSelectedDate(date);
            setScreen('day');
          }}
          onBack={() => setScreen('dashboard')}
        />
      )}
      {screen === 'day' && (
        <DayTasksScreen
          {...commonProps}
          date={selectedDate}
          tasks={getTasksForDate(tasks, selectedDate)}
          onBack={() => setScreen('calendar')}
          onCreate={() => {
            setEditingTask(null);
            setScreen('taskForm');
          }}
          onEdit={(task) => {
            setEditingTask(task);
            setScreen('taskForm');
          }}
          onDelete={handleDeleteTask}
          onToggle={handleToggleTask}
        />
      )}
      {screen === 'taskForm' && (
        <TaskFormScreen {...commonProps} task={editingTask} defaultDate={selectedDate} onCancel={() => setScreen('day')} onSave={handleSaveTask} />
      )}
      {screen === 'settings' && (
        <SettingsScreen {...commonProps} user={user} settings={settings} onThemeChange={handleThemeChange} onBack={() => setScreen('dashboard')} onLogout={handleLogout} />
      )}
    </SafeAreaView>
  );
}
