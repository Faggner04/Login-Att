import { STORAGE_KEYS } from '../storage/keys';
import { readJSON, writeJSON } from '../storage/storage';
import { sanitizeText } from '../utils/security';
import { addAuditEvent } from './auditService';

export async function getAllTasks() {
  return readJSON(STORAGE_KEYS.tasks, []);
}

export async function getTasksByUser(userId) {
  const tasks = await getAllTasks();
  return tasks.filter((task) => task.userId === userId);
}

export async function createTask(userId, task) {
  const tasks = await getAllTasks();
  const newTask = normalizeTask({
    ...task,
    id: Date.now().toString(),
    userId,
    status: task.status || 'pendente',
  });
  await writeJSON(STORAGE_KEYS.tasks, [...tasks, newTask]);
  await addAuditEvent('TASK_CREATED', { taskId: newTask.id, userId });
  return newTask;
}

export async function updateTask(userId, updatedTask) {
  const tasks = await getAllTasks();
  const safeTask = normalizeTask({ ...updatedTask, userId });
  await writeJSON(
    STORAGE_KEYS.tasks,
    tasks.map((task) => (task.userId === userId && task.id === updatedTask.id ? { ...task, ...safeTask } : task))
  );
  await addAuditEvent('TASK_UPDATED', { taskId: updatedTask.id, userId });
}

export async function deleteTask(userId, taskId) {
  const tasks = await getAllTasks();
  await writeJSON(STORAGE_KEYS.tasks, tasks.filter((task) => !(task.userId === userId && task.id === taskId)));
  await addAuditEvent('TASK_DELETED', { taskId, userId });
}

function normalizeTask(task) {
  return {
    id: task.id,
    userId: task.userId,
    title: sanitizeText(task.title, 80),
    description: sanitizeText(task.description, 240),
    time: sanitizeText(task.time, 5),
    color: task.color || '#2563eb',
    startDate: task.startDate,
    endDate: task.endDate || task.startDate,
    recurrence: task.recurrence || 'none',
    status: task.status || 'pendente',
  };
}
