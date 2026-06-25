import AsyncStorage from '@react-native-async-storage/async-storage';

export async function readJSON(key, fallback) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn(`Falha ao ler ${key}`, error);
    return fallback;
  }
}

export async function writeJSON(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function removeItem(key) {
  await AsyncStorage.removeItem(key);
}
