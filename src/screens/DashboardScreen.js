import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import StatCard from '../components/StatCard';
import { addDays, todayString } from '../utils/date';
import { countByStatus, getTasksForDate } from '../utils/recurrence';

export default function DashboardScreen({ styles, user, tasks, todayTasks, onOpenCalendar, onOpenToday, onSettings, onLogout }) {
  const totals = countByStatus(tasks);
  const nextTasks = [1, 2, 3, 4, 5, 6, 7].flatMap((offset) => getTasksForDate(tasks, addDays(todayString(), offset))).slice(0, 4);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text testID="dashboard-title" style={styles.title}>Olá, {user.username}</Text>
        <Text style={styles.subtitle}>Seu resumo de hoje está pronto.</Text>
      </View>
      <View style={styles.statGrid}>
        <StatCard label="Pendentes" value={totals.pending} styles={styles} />
        <StatCard label="Concluídas" value={totals.done} styles={styles} />
        <StatCard label="Tarefas hoje" value={todayTasks.length} styles={styles} />
      </View>
      <View style={[styles.wrapRow, { marginVertical: 16 }]}>
        <AppButton label="Abrir calendário" onPress={onOpenCalendar} styles={styles} testID="open-calendar" />
        <AppButton label="Tarefas de hoje" onPress={onOpenToday} variant="secondary" styles={styles} testID="open-today" />
        <AppButton label="Configurações" onPress={onSettings} variant="secondary" styles={styles} testID="open-settings" />
        <AppButton label="Sair" onPress={onLogout} variant="secondary" styles={styles} testID="logout" />
      </View>
      <Text style={styles.taskTitle}>Hoje</Text>
      {todayTasks.length === 0 ? <Text style={styles.subtitle}>Nenhuma tarefa para hoje.</Text> : todayTasks.map((task) => <TaskSummary key={task.id} task={task} styles={styles} />)}
      <Text style={[styles.taskTitle, { marginTop: 16 }]}>Próximos compromissos</Text>
      {nextTasks.length === 0 ? <Text style={styles.subtitle}>Sem compromissos nos próximos dias.</Text> : nextTasks.map((task) => <TaskSummary key={`${task.id}-next`} task={task} styles={styles} />)}
    </ScrollView>
  );
}

function TaskSummary({ task, styles }) {
  return (
    <View style={[styles.card, { borderLeftWidth: 6, borderLeftColor: task.color }]}>
      <Text style={styles.taskTitle}>{task.title}</Text>
      <Text style={styles.taskMeta}>{task.time || 'Sem horário'} · {task.status}</Text>
    </View>
  );
}
