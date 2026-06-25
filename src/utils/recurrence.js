import { addDays, diffDays, parseDate } from './date';

function sameDayOrAfter(date, start) {
  return parseDate(date) >= parseDate(start);
}

function sameDayOrBefore(date, end) {
  return parseDate(date) <= parseDate(end);
}

function matchRecurringStart(task, occurrenceStart) {
  const original = parseDate(task.startDate);
  const current = parseDate(occurrenceStart);
  if (!sameDayOrAfter(occurrenceStart, task.startDate)) return false;
  if (task.recurrence === 'daily') return true;
  if (task.recurrence === 'weekly') return original.getDay() === current.getDay();
  if (task.recurrence === 'monthly') return original.getDate() === current.getDate();
  if (task.recurrence === 'yearly') return original.getDate() === current.getDate() && original.getMonth() === current.getMonth();
  return false;
}

export function taskOccursOnDate(task, date) {
  const duration = Math.max(0, diffDays(task.startDate, task.endDate || task.startDate));
  if (task.recurrence === 'none') {
    return sameDayOrAfter(date, task.startDate) && sameDayOrBefore(date, task.endDate || task.startDate);
  }
  for (let offset = 0; offset <= duration; offset += 1) {
    if (matchRecurringStart(task, addDays(date, -offset))) return true;
  }
  return false;
}

export function getTasksForDate(tasks, date) {
  return tasks
    .filter((task) => taskOccursOnDate(task, date))
    .sort((a, b) => (a.time || '99:99').localeCompare(b.time || '99:99'));
}

export function countByStatus(tasks) {
  return tasks.reduce(
    (totals, task) => {
      totals[task.status === 'concluida' ? 'done' : 'pending'] += 1;
      return totals;
    },
    { pending: 0, done: 0 }
  );
}
