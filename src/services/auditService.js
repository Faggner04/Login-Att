import { STORAGE_KEYS } from '../storage/keys';
import { readJSON, writeJSON } from '../storage/storage';

export async function addAuditEvent(type, details = {}) {
  const events = await readJSON(STORAGE_KEYS.auditEvents, []);
  const nextEvents = [
    ...events.slice(-49),
    {
      id: Date.now().toString(),
      type,
      details,
      createdAt: new Date().toISOString(),
    },
  ];
  await writeJSON(STORAGE_KEYS.auditEvents, nextEvents);
}
