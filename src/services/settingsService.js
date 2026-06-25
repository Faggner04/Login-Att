import { STORAGE_KEYS } from '../storage/keys';
import { readJSON, writeJSON } from '../storage/storage';

export async function getSettings() {
  return readJSON(STORAGE_KEYS.settings, { theme: 'light' });
}

export async function saveSettings(settings) {
  await writeJSON(STORAGE_KEYS.settings, settings);
}
