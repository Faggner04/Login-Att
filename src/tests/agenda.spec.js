const { test, expect } = require('@playwright/test');
const path = require('path');

const PASSWORD = '123456';

function todayId() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function tomorrowId() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function uniqueUser(prefix) {
  return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

async function resetApp(page) {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
}

async function screenshot(page, testInfo, fileName) {
  await page.screenshot({
    path: path.join(process.cwd(), 'evidencias', fileName),
    fullPage: true,
  });
}

async function registerUser(page, username, password = PASSWORD) {
  await page.getByTestId('go-register').click();
  await page.getByTestId('register-username').fill(username);
  await page.getByTestId('register-password').fill(password);
  await page.getByTestId('register-submit').click();
  await expect(page.getByTestId('dashboard-title')).toContainText(username);
}

async function logout(page) {
  await page.getByTestId('logout').click();
  await expect(page.getByTestId('login-submit')).toBeVisible();
}

async function createUserAndOpenToday(page, username = uniqueUser('aluno')) {
  await resetApp(page);
  await registerUser(page, username);
  await page.getByTestId('open-today').click();
  await expect(page.getByTestId('day-title')).toBeVisible();
  return username;
}

async function createTask(page, title, options = {}) {
  const date = options.date || todayId();
  await page.getByTestId('new-task').click();
  await page.getByTestId('task-title').fill(title);
  await page.getByTestId('task-description').fill(options.description || 'Descricao do teste automatizado');
  await page.getByTestId('task-time').fill(options.time || '09:30');
  await page.getByTestId('task-start-date').fill(date);
  await page.getByTestId('task-end-date').fill(options.endDate || date);
  if (options.color) await page.getByTestId(`color-${options.color}`).click();
  if (options.recurrence) await page.getByTestId(`recurrence-${options.recurrence}`).click();
  await page.getByTestId('save-task').click();
  await expect(page.getByText(title)).toBeVisible();
}

test('01 - cadastro de usuario', async ({ page }, testInfo) => {
  await resetApp(page);
  const username = uniqueUser('cadastro');
  await registerUser(page, username);
  await screenshot(page, testInfo, '01-cadastro-usuario.png');
});

test('02 - login valido', async ({ page }, testInfo) => {
  await resetApp(page);
  const username = uniqueUser('loginok');
  await registerUser(page, username);
  await logout(page);
  await page.getByTestId('login-username').fill(username);
  await page.getByTestId('login-password').fill(PASSWORD);
  await page.getByTestId('login-submit').click();
  await expect(page.getByTestId('dashboard-title')).toContainText(username);
  await screenshot(page, testInfo, '02-login-valido.png');
});

test('03 - login invalido', async ({ page }, testInfo) => {
  await resetApp(page);
  await page.getByTestId('login-username').fill('usuario-inexistente');
  await page.getByTestId('login-password').fill('senha-errada');
  await page.getByTestId('login-submit').click();
  await expect(page.getByText('Usuario ou senha invalidos.')).toBeVisible();
  await screenshot(page, testInfo, '03-login-invalido.png');
});

test('04 - logout', async ({ page }, testInfo) => {
  await resetApp(page);
  await registerUser(page, uniqueUser('logout'));
  await logout(page);
  await screenshot(page, testInfo, '04-logout.png');
});

test('05 - criar tarefa', async ({ page }, testInfo) => {
  await createUserAndOpenToday(page);
  await createTask(page, 'Tarefa criada');
  await screenshot(page, testInfo, '05-criar-tarefa.png');
});

test('06 - editar tarefa', async ({ page }, testInfo) => {
  await createUserAndOpenToday(page);
  await createTask(page, 'Tarefa antes da edicao');
  await page.getByText('Editar').click();
  await page.getByTestId('task-title').fill('Tarefa editada');
  await page.getByTestId('save-task').click();
  await expect(page.getByText('Tarefa editada')).toBeVisible();
  await screenshot(page, testInfo, '06-editar-tarefa.png');
});

test('07 - excluir tarefa', async ({ page }, testInfo) => {
  await createUserAndOpenToday(page);
  await createTask(page, 'Tarefa para excluir');
  await page.locator('[data-testid^="delete-"]').first().click();
  await expect(page.getByText('Tarefa para excluir')).toHaveCount(0);
  await screenshot(page, testInfo, '07-excluir-tarefa.png');
});

test('08 - concluir tarefa', async ({ page }, testInfo) => {
  await createUserAndOpenToday(page);
  await createTask(page, 'Tarefa para concluir');
  await page.locator('[data-testid^="toggle-"]').first().click();
  await expect(page.getByText('Pendente')).toBeVisible();
  await screenshot(page, testInfo, '08-concluir-tarefa.png');
});

test('09 - criar tarefa recorrente', async ({ page }, testInfo) => {
  await createUserAndOpenToday(page);
  await createTask(page, 'Tarefa semanal recorrente', { recurrence: 'weekly', color: 'Roxo' });
  await expect(page.getByText('Recorrência: semanal')).toBeVisible();
  await screenshot(page, testInfo, '09-tarefa-recorrente.png');
});

test('10 - persistencia dos dados apos reiniciar', async ({ page }, testInfo) => {
  const username = await createUserAndOpenToday(page);
  await createTask(page, 'Tarefa persistente', { date: todayId(), endDate: tomorrowId() });
  await page.reload();
  await expect(page.getByTestId('dashboard-title')).toContainText(username);
  await page.getByTestId('open-today').click();
  await expect(page.getByText('Tarefa persistente')).toBeVisible();
  await screenshot(page, testInfo, '10-persistencia-dados.png');
});
