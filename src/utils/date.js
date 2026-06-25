const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export { WEEKDAYS, MONTHS };

export function todayString() {
  return toDateString(new Date());
}

export function toDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatDate(value) {
  const date = parseDate(value);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function addDays(value, amount) {
  const date = parseDate(value);
  date.setDate(date.getDate() + amount);
  return toDateString(date);
}

export function diffDays(start, end) {
  return Math.round((parseDate(end) - parseDate(start)) / 86400000);
}

export function buildMonthMatrix(year, monthIndex) {
  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay.getDay(); i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(toDateString(new Date(year, monthIndex, day)));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
