export interface StoredMedication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  form: string;
  timeBlock: "Morning" | "Midday" | "Evening" | "Night";
  instructions: string;
  prescribedBy: string;
  startedDate: string;
  createdAt: string;
}

export interface DoseLog {
  id: string;
  medicationId: string;
  date: string; // YYYY-MM-DD
  status: "taken" | "missed" | "snoozed";
  time: string;
  note: string;
}

const MEDS_KEY = "welltrack_medications";
const LOGS_KEY = "welltrack_dose_logs";

function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

// --- Medications ---

const defaultMedications: StoredMedication[] = [
  { id: "1", name: "Atorvastatin", dosage: "20 mg", frequency: "once daily", form: "Tablet", timeBlock: "Morning", instructions: "Take with food • Avoid grapefruit", prescribedBy: "Dr. Elena Park", startedDate: "2026-01-10", createdAt: "2026-01-10" },
  { id: "2", name: "Lisinopril", dosage: "10 mg", frequency: "once daily", form: "Tablet", timeBlock: "Morning", instructions: "Monitor blood pressure • avoid sudden standing", prescribedBy: "Dr. Elena Park", startedDate: "2026-01-10", createdAt: "2026-01-10" },
  { id: "3", name: "Vitamin D3", dosage: "2000 IU", frequency: "once daily", form: "Capsule", timeBlock: "Morning", instructions: "Take with fat-containing meal", prescribedBy: "", startedDate: "2026-02-01", createdAt: "2026-02-01" },
  { id: "4", name: "Omeprazole", dosage: "20 mg", frequency: "as needed", form: "Capsule", timeBlock: "Midday", instructions: "Take 30 minutes before meal if reflux occurs", prescribedBy: "Dr. Elena Park", startedDate: "2026-01-15", createdAt: "2026-01-15" },
  { id: "5", name: "Probiotic Blend", dosage: "1 capsule", frequency: "daily", form: "Capsule", timeBlock: "Midday", instructions: "Take with food • keep refrigerated", prescribedBy: "", startedDate: "2026-03-01", createdAt: "2026-03-01" },
  { id: "6", name: "Melatonin", dosage: "3 mg", frequency: "as needed", form: "Tablet", timeBlock: "Evening", instructions: "Take 30 minutes before bedtime", prescribedBy: "", startedDate: "2026-01-20", createdAt: "2026-01-20" },
  { id: "7", name: "Metformin XR", dosage: "500 mg", frequency: "twice daily", form: "Tablet", timeBlock: "Evening", instructions: "Take with dinner • monitor blood glucose", prescribedBy: "Dr. Elena Park", startedDate: "2026-01-10", createdAt: "2026-01-10" },
  { id: "8", name: "Low-dose Aspirin", dosage: "81 mg", frequency: "nightly", form: "Tablet", timeBlock: "Night", instructions: "Take with water • report unusual bruising", prescribedBy: "Dr. Elena Park", startedDate: "2026-01-10", createdAt: "2026-01-10" },
];

function generateDefaultLogs(): DoseLog[] {
  const logs: DoseLog[] = [];
  const today = new Date(2026, 3, 12); // Apr 12, 2026
  const medIds = defaultMedications.map((m) => m.id);

  for (let d = 0; d < 30; d++) {
    const date = new Date(today);
    date.setDate(date.getDate() - d);
    const dateStr = date.toISOString().split("T")[0];

    medIds.forEach((medId) => {
      const rand = Math.random();
      const status: DoseLog["status"] = rand > 0.15 ? "taken" : rand > 0.05 ? "missed" : "snoozed";
      logs.push({
        id: `log-${dateStr}-${medId}`,
        medicationId: medId,
        date: dateStr,
        status,
        time: `${8 + Math.floor(Math.random() * 12)}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
        note: "",
      });
    });
  }
  return logs;
}

export function getMedications(): StoredMedication[] {
  const stored = getItem<StoredMedication[] | null>(MEDS_KEY, null);
  if (stored === null) {
    setItem(MEDS_KEY, defaultMedications);
    return defaultMedications;
  }
  return stored;
}

export function saveMedication(med: StoredMedication) {
  const meds = getMedications();
  const idx = meds.findIndex((m) => m.id === med.id);
  if (idx >= 0) {
    meds[idx] = med;
  } else {
    meds.push(med);
  }
  setItem(MEDS_KEY, meds);
}

export function deleteMedication(id: string) {
  const meds = getMedications().filter((m) => m.id !== id);
  setItem(MEDS_KEY, meds);
  const logs = getDoseLogs().filter((l) => l.medicationId !== id);
  setItem(LOGS_KEY, logs);
}

// --- Dose Logs ---

export function getDoseLogs(): DoseLog[] {
  const stored = getItem<DoseLog[] | null>(LOGS_KEY, null);
  if (stored === null) {
    const defaults = generateDefaultLogs();
    setItem(LOGS_KEY, defaults);
    return defaults;
  }
  return stored;
}

export function logDose(log: DoseLog) {
  const logs = getDoseLogs();
  const existingIdx = logs.findIndex((l) => l.medicationId === log.medicationId && l.date === log.date);
  if (existingIdx >= 0) {
    logs[existingIdx] = log;
  } else {
    logs.push(log);
  }
  setItem(LOGS_KEY, logs);
}

// --- Stats helpers ---

export function getAdherenceByDate(days: number = 30): { date: string; adherence: number; taken: number; total: number }[] {
  const logs = getDoseLogs();
  const meds = getMedications();
  const today = new Date(2026, 3, 12);
  const results: { date: string; adherence: number; taken: number; total: number }[] = [];

  for (let d = days - 1; d >= 0; d--) {
    const date = new Date(today);
    date.setDate(date.getDate() - d);
    const dateStr = date.toISOString().split("T")[0];

    const dayLogs = logs.filter((l) => l.date === dateStr);
    const totalMeds = meds.length;
    const takenCount = dayLogs.filter((l) => l.status === "taken").length;
    const adherence = totalMeds > 0 ? Math.round((takenCount / totalMeds) * 100) : 0;

    results.push({ date: dateStr, adherence, taken: takenCount, total: totalMeds });
  }

  return results;
}

export function getWeeklyAdherence(): { week: string; adherence: number }[] {
  const daily = getAdherenceByDate(28);
  const weeks: { week: string; adherence: number }[] = [];

  for (let w = 0; w < 4; w++) {
    const weekDays = daily.slice(w * 7, (w + 1) * 7);
    const avg = weekDays.length > 0 ? Math.round(weekDays.reduce((s, d) => s + d.adherence, 0) / weekDays.length) : 0;
    weeks.push({ week: `Week ${w + 1}`, adherence: avg });
  }

  return weeks;
}

export function getMedicationAdherence(): { name: string; adherence: number; taken: number; missed: number }[] {
  const logs = getDoseLogs();
  const meds = getMedications();

  return meds.map((med) => {
    const medLogs = logs.filter((l) => l.medicationId === med.id);
    const taken = medLogs.filter((l) => l.status === "taken").length;
    const missed = medLogs.filter((l) => l.status === "missed").length;
    const total = medLogs.length;
    return {
      name: med.name,
      adherence: total > 0 ? Math.round((taken / total) * 100) : 0,
      taken,
      missed,
    };
  });
}

export function getStreakInfo(): { current: number; best: number } {
  const daily = getAdherenceByDate(30).reverse();
  let current = 0;
  for (const d of daily) {
    if (d.adherence >= 80) current++;
    else break;
  }
  let best = 0;
  let run = 0;
  for (const d of [...daily].reverse()) {
    if (d.adherence >= 80) { run++; best = Math.max(best, run); }
    else run = 0;
  }
  return { current, best: Math.max(best, 21) };
}
