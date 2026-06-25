import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import { buildMonthMatrix, MONTHS, parseDate, todayString, WEEKDAYS } from '../utils/date';
import { getTasksForDate } from '../utils/recurrence';

export default function CalendarScreen({ styles, tasks, selectedDate, onSelectDate, onBack }) {
  const initial = parseDate(selectedDate);
  const [year, setYear] = useState(initial.getFullYear());
  const [month, setMonth] = useState(initial.getMonth());
  const cells = buildMonthMatrix(year, month);
  const today = todayString();

  function moveMonth(amount) {
    const date = new Date(year, month + amount, 1);
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <View style={styles.between}>
        <View>
          <Text testID="calendar-title" style={styles.title}>{MONTHS[month]} {year}</Text>
          <Text style={styles.subtitle}>Toque em um dia para ver, criar ou editar tarefas.</Text>
        </View>
        <AppButton label="Voltar" onPress={onBack} variant="secondary" styles={styles} testID="back-dashboard" />
      </View>
      <View style={[styles.wrapRow, { marginVertical: 14 }]}>
        <AppButton label="Mês anterior" onPress={() => moveMonth(-1)} variant="secondary" styles={styles} testID="previous-month" />
        <AppButton label="Próximo mês" onPress={() => moveMonth(1)} variant="secondary" styles={styles} testID="next-month" />
        <AppButton label="Ano anterior" onPress={() => setYear(year - 1)} variant="secondary" styles={styles} testID="previous-year" />
        <AppButton label="Próximo ano" onPress={() => setYear(year + 1)} variant="secondary" styles={styles} testID="next-year" />
      </View>
      <View style={styles.calendarGrid}>
        {WEEKDAYS.map((day) => (
          <View key={day} style={styles.weekdayCell}><Text style={styles.weekdayText}>{day}</Text></View>
        ))}
        {cells.map((date, index) => {
          const dayTasks = date ? getTasksForDate(tasks, date) : [];
          return (
            <Pressable
              key={`${date || 'empty'}-${index}`}
              testID={date ? `calendar-day-${date}` : undefined}
              onPress={() => date && onSelectDate(date)}
              style={[
                styles.dayCell,
                !date && styles.emptyDay,
                date === today && styles.todayCell,
                date === selectedDate && styles.selectedDay,
              ]}
            >
              {!!date && <Text style={styles.dayNumber}>{parseDate(date).getDate()}</Text>}
              <View style={styles.dots}>
                {dayTasks.slice(0, 5).map((task) => <View key={task.id} style={[styles.dot, { backgroundColor: task.color }]} />)}
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
