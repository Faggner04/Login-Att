import { STORAGE_KEYS } from '../storage/keys';
import { readJSON, removeItem, writeJSON } from '../storage/storage';
import { createSalt, hashPassword, sanitizeText } from '../utils/security';
import { addAuditEvent } from './auditService';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_WINDOW_MS = 15 * 60 * 1000;

export async function getUsers() {
  return readJSON(STORAGE_KEYS.users, []);
}

export async function registerUser(username, password) {
  const normalized = sanitizeText(username, 40);
  const users = await getUsers();
  if (!normalized || !password) throw new Error('Informe usuario e senha.');
  if (password.length < 6) throw new Error('A senha deve ter pelo menos 6 caracteres.');
  if (users.some((user) => user.username.toLowerCase() === normalized.toLowerCase())) {
    throw new Error('Este usuario ja existe.');
  }

  const salt = createSalt();
  const newUser = {
    id: Date.now().toString(),
    username: normalized,
    passwordHash: await hashPassword(password, salt),
    salt,
  };

  await writeJSON(STORAGE_KEYS.users, [...users, newUser]);
  await addAuditEvent('USER_REGISTERED', { username: normalized });
  return { id: newUser.id, username: newUser.username };
}

export async function loginUser(username, password) {
  const normalized = sanitizeText(username, 40);
  await ensureNotLocked(normalized);

  const users = await getUsers();
  const found = users.find((user) => user.username.toLowerCase() === normalized.toLowerCase());
  const validPassword = found ? await verifyUserPassword(found, password) : false;

  if (!found || !validPassword) {
    await registerFailedAttempt(normalized);
    await addAuditEvent('LOGIN_FAILED', { username: normalized });
    throw new Error('Usuario ou senha invalidos.');
  }

  await clearAttempts(normalized);
  await addAuditEvent('LOGIN_SUCCESS', { username: found.username });
  return { id: found.id, username: found.username };
}

export async function saveSession(user) {
  await writeJSON(STORAGE_KEYS.session, user);
}

export async function getSession() {
  return readJSON(STORAGE_KEYS.session, null);
}

export async function logout() {
  await removeItem(STORAGE_KEYS.session);
  await addAuditEvent('LOGOUT');
}

async function verifyUserPassword(user, password) {
  if (user.passwordHash && user.salt) {
    return user.passwordHash === await hashPassword(password, user.salt);
  }
  return user.password === password;
}

async function getAttempts() {
  return readJSON(STORAGE_KEYS.loginAttempts, {});
}

async function ensureNotLocked(username) {
  const attempts = await getAttempts();
  const record = attempts[username.toLowerCase()];
  if (!record) return;
  const recent = Date.now() - record.lastAttemptAt < LOCK_WINDOW_MS;
  if (recent && record.count >= MAX_LOGIN_ATTEMPTS) {
    throw new Error('Muitas tentativas invalidas. Aguarde alguns minutos.');
  }
}

async function registerFailedAttempt(username) {
  const key = username.toLowerCase();
  const attempts = await getAttempts();
  const current = attempts[key] || { count: 0, lastAttemptAt: 0 };
  const count = Date.now() - current.lastAttemptAt > LOCK_WINDOW_MS ? 1 : current.count + 1;
  await writeJSON(STORAGE_KEYS.loginAttempts, {
    ...attempts,
    [key]: { count, lastAttemptAt: Date.now() },
  });
}

async function clearAttempts(username) {
  const key = username.toLowerCase();
  const attempts = await getAttempts();
  if (attempts[key]) {
    delete attempts[key];
    await writeJSON(STORAGE_KEYS.loginAttempts, attempts);
  }
}
