import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import TaskItem from '../components/TaskItem';
import { formatDate } from '../utils/date';

export default function DayTasksScreen({ styles, date, tasks, onBack, onCreate, onEdit, onDelete, onToggle }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <View style={styles.between}>
        <View>
          <Text testID="day-title" style={styles.title}>{formatDate(date)}</Text>
          <Text style={styles.subtitle}>{tasks.length} tarefa(s) neste dia.</Text>
        </View>
        <AppButton label="Voltar" onPress={onBack} variant="secondary" styles={styles} testID="back-calendar" />
      </View>
      <View style={{ marginVertical: 14 }}>
        <AppButton label="Nova tarefa" onPress={onCreate} styles={styles} testID="new-task" />
      </View>
      {tasks.length === 0 ? (
        <View style={styles.card}><Text style={styles.subtitle}>Nenhuma tarefa cadastrada para este dia.</Text></View>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} styles={styles} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />)
      )}
    </ScrollView>
  );
}
