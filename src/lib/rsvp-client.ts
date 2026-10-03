/* RSVP transport: posts to a Google Apps Script web app that appends a row to
   the couple's Google Sheet. The script URL lives in `.env.local` as
   NEXT_PUBLIC_RSVP_ENDPOINT (see scripts/rsvp-apps-script.gs for the sheet side).

   Every submission is recorded (the sheet is a hint, not a headcount). A random
   per-device id rides along so repeat/changed answers from one phone can be
   collapsed in the sheet — it never blocks the guest. */
import { localStorageAvailable } from '@/utils/storage-available';

const ENDPOINT = (process.env.NEXT_PUBLIC_RSVP_ENDPOINT ?? '').trim();
const DEVICE_KEY = 'wedding.rsvp.device';
const LAST_KEY = 'wedding.rsvp.last';

export type RsvpAnswer = 'yes' | 'maybe';
export interface RsvpRecord { name: string; attendance: RsvpAnswer; at: string }

const hasStorage = () => typeof window !== 'undefined' && localStorageAvailable();

export const getDeviceId = (): string => {
  if (!hasStorage()) return 'no-storage';
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = typeof crypto?.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
};

export const getLastRsvp = (): RsvpRecord | null => {
  if (!hasStorage()) return null;
  try {
    const raw = localStorage.getItem(LAST_KEY);
    return raw ? (JSON.parse(raw) as RsvpRecord) : null;
  } catch {
    return null;
  }
};

const rememberRsvp = (record: RsvpRecord) => {
  if (hasStorage()) localStorage.setItem(LAST_KEY, JSON.stringify(record));
};

export const isRsvpConfigured = () => ENDPOINT !== '';

/** Resolves true when the row was accepted; false on any failure. */
export const submitRsvp = async (input: { name: string; attendance: RsvpAnswer; lang: string }): Promise<boolean> => {
  const record: RsvpRecord = { name: input.name.trim(), attendance: input.attendance, at: new Date().toISOString() };
  const payload = {
    ...record,
    lang: input.lang,
    deviceId: getDeviceId(),
    previous: getLastRsvp()?.attendance ?? '',
    page: typeof location !== 'undefined' ? location.href : '',
    ua: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  };

  if (!isRsvpConfigured()) {
    // No sheet wired up yet: keep the guest's experience intact, remember locally.
    rememberRsvp(record);
    return true;
  }

  try {
    // text/plain keeps this a CORS "simple request" (no preflight), which is
    // what Apps Script web apps can answer after their redirect.
    const res = await fetch(ENDPOINT, { method: 'POST', mode: 'cors', redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) });
    if (!res.ok) return false;
    rememberRsvp(record);
    return true;
  } catch {
    return false;
  }
};
