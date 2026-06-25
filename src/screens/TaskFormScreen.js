import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import AppButton from '../components/AppButton';
import { TASK_COLORS } from '../styles/theme';
import { isValidDate, isValidTime } from '../utils/security';

const RECURRENCES = [
  { label: 'Nao repetir', value: 'none' },
  { label: 'Diariamente', value: 'daily' },
  { label: 'Semanalmente', value: 'weekly' },
  { label: 'Mensalmente', value: 'monthly' },
  { label: 'Anualmente', value: 'yearly' },
];

export default function TaskFormScreen({ styles, task, defaultDate, onCancel, onSave }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [time, setTime] = useState(task?.time || '');
  const [startDate, setStartDate] = useState(task?.startDate || defaultDate);
  const [endDate, setEndDate] = useState(task?.endDate || defaultDate);
  const [color, setColor] = useState(task?.color || TASK_COLORS[0].value);
  const [recurrence, setRecurrence] = useState(task?.recurrence || 'none');
  const [error, setError] = useState('');

  function submit() {
    if (!title.trim()) {
      setError('Informe o titulo da tarefa.');
      return;
    }
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      setError('Informe datas validas no formato AAAA-MM-DD.');
      return;
    }
    if (!isValidTime(time)) {
      setError('Informe um horario valido no formato HH:MM.');
      return;
    }
    if (endDate < startDate) {
      setError('A data final deve ser igual ou posterior a data inicial.');
      return;
    }
    onSave({ title, description, time, startDate, endDate, color, recurrence, status: task?.status || 'pendente' });
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>{task ? 'Editar tarefa' : 'Criar tarefa'}</Text>
        <Text style={styles.subtitle}>Use datas no formato AAAA-MM-DD e horario no formato HH:MM.</Text>
      </View>
      <TextInput testID="task-title" style={styles.input} placeholder="Titulo" value={title} onChangeText={setTitle} />
      <TextInput testID="task-description" style={[styles.input, styles.textArea, { marginTop: 10 }]} placeholder="Descricao" value={description} onChangeText={setDescription} multiline />
      <TextInput testID="task-time" style={[styles.input, { marginTop: 10 }]} placeholder="Horario (HH:MM)" value={time} onChangeText={setTime} />
      <View style={styles.wrapRow}>
        <TextInput testID="task-start-date" style={[styles.input, { marginTop: 10, flexGrow: 1 }]} placeholder="Data inicial" value={startDate} onChangeText={setStartDate} />
        <TextInput testID="task-end-date" style={[styles.input, { marginTop: 10, flexGrow: 1 }]} placeholder="Data final" value={endDate} onChangeText={setEndDate} />
      </View>
      <Text style={[styles.taskTitle, { marginTop: 16 }]}>Cor</Text>
      <View style={styles.wrapRow}>
        {TASK_COLORS.map((item) => (
          <Pressable
            key={item.value}
            testID={`color-${item.label}`}
            onPress={() => setColor(item.value)}
            style={[styles.colorSwatch, { backgroundColor: item.value }, color === item.value && styles.colorSwatchSelected]}
          />
        ))}
      </View>
      <Text style={[styles.taskTitle, { marginTop: 16 }]}>Recorrencia</Text>
      <View style={styles.wrapRow}>
        {RECURRENCES.map((item) => (
          <Pressable key={item.value} testID={`recurrence-${item.value}`} onPress={() => setRecurrence(item.value)} style={[styles.ghostButton, recurrence === item.value && { backgroundColor: color }]}>
            <Text style={[styles.ghostText, recurrence === item.value && { color: '#ffffff' }]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
      {!!error && <Text style={[styles.error, { marginTop: 10 }]}>{error}</Text>}
      <View style={[styles.wrapRow, { marginTop: 18 }]}>
        <AppButton label="Salvar" onPress={submit} styles={styles} testID="save-task" />
        <AppButton label="Cancelar" onPress={onCancel} variant="secondary" styles={styles} testID="cancel-task" />
      </View>
    </ScrollView>
  );
}
