// ====== storage helpers ======
export function makeId(prefix='id'){
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function qs(name){
  return new URLSearchParams(window.location.search).get(name);
}

export function patientScopedKey(baseKey, patientId){
  return `${baseKey}__${patientId}`;
}

// ====== patients (basic) ======
const PATIENTS_KEY = 'patients_v1';

export function loadPatients(){
  const raw = localStorage.getItem(PATIENTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function savePatients(patients){
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
}

export function upsertPatientBasic(patient){
  const patients = loadPatients();
  const idx = patients.findIndex(p => p.id === patient.id);
  if (idx >= 0) patients[idx] = patient;
  else patients.push(patient);
  savePatients(patients);
}

export function getPatientById(patientId){
  return loadPatients().find(p => p.id === patientId) || null;
}

// ====== per-patient extras ======
export function loadPatientExtras(patientId){
  const key = patientScopedKey('patient_extras_v1', patientId);
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : {};
}

export function savePatientExtras(patientId, extras){
  const key = patientScopedKey('patient_extras_v1', patientId);
  localStorage.setItem(key, JSON.stringify(extras));
}

// ====== stones & photos (per patient) ======
export function loadStones(patientId){
  const key = patientScopedKey('temp_stones_v1', patientId);
  const raw = localStorage.getItem(key);
  const stones = raw ? JSON.parse(raw) : [];
  // ensure id
  let changed = false;
  stones.forEach(s => { if (!s.id) { s.id = makeId('st'); changed = true; } });
  if (changed) localStorage.setItem(key, JSON.stringify(stones));
  return stones;
}

export function saveStones(patientId, stones){
  const key = patientScopedKey('temp_stones_v1', patientId);
  localStorage.setItem(key, JSON.stringify(stones));
}

export function loadStonePhotos(patientId){
  const key = patientScopedKey('temp_stone_photos_v1', patientId);
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : {};
}

export function saveStonePhotos(patientId, photosObj){
  const key = patientScopedKey('temp_stone_photos_v1', patientId);
  localStorage.setItem(key, JSON.stringify(photosObj));
}

export function loadCollapsedGroups(patientId){
  const key = patientScopedKey('collapsed_groups_v1', patientId);
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : {};
}

export function saveCollapsedGroups(patientId, obj){
  const key = patientScopedKey('collapsed_groups_v1', patientId);
  localStorage.setItem(key, JSON.stringify(obj));
}
