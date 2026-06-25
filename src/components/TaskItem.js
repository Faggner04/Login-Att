import React from 'react';
import { Pressable, Text, View } from 'react-native';
import AppButton from './AppButton';
import { formatDate } from '../utils/date';

export default function TaskItem({ task, styles, onEdit, onDelete, onToggle }) {
  return (
    <View testID={`task-${task.id}`} style={[styles.card, { borderLeftWidth: 6, borderLeftColor: task.color }]}>
      <View style={styles.between}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.taskTitle, task.status === 'concluida' && { textDecorationLine: 'line-through' }]}>{task.title}</Text>
          <Text style={styles.taskMeta}>
            {task.time ? `${task.time} · ` : ''}
            {formatDate(task.startDate)}
            {task.endDate !== task.startDate ? ` até ${formatDate(task.endDate)}` : ''}
          </Text>
        </View>
        <Pressable testID={`toggle-${task.id}`} onPress={() => onToggle(task)} style={styles.ghostButton}>
          <Text style={styles.ghostText}>{task.status === 'concluida' ? 'Pendente' : 'Concluir'}</Text>
        </Pressable>
      </View>
      {!!task.description && <Text style={styles.subtitle}>{task.description}</Text>}
      <Text style={styles.smallText}>Recorrência: {recurrenceLabel(task.recurrence)}</Text>
      <View style={styles.wrapRow}>
        <AppButton label="Editar" onPress={() => onEdit(task)} variant="secondary" styles={styles} testID={`edit-${task.id}`} />
        <Pressable testID={`delete-${task.id}`} onPress={() => onDelete(task.id)} style={styles.ghostButton}>
          <Text style={styles.dangerText}>Excluir</Text>
        </Pressable>
      </View>
    </View>
  );
}

function recurrenceLabel(value) {
  return { none: 'não repetir', daily: 'diária', weekly: 'semanal', monthly: 'mensal', yearly: 'anual' }[value || 'none'];
}
