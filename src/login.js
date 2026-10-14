export const DEMO_USER = Object.freeze({
  email: 'demo@campus.edu',
  password: 'Aprende2026!',
  name: 'Estudiante'
});

export function validateCredentials(email, password) {
  const normalizedEmail = String(email ?? '').trim().toLowerCase();

  if (!normalizedEmail || !password) {
    return { ok: false, message: 'Completa tu correo y contraseña.' };
  }
  if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
    return { ok: false, message: 'Escribe un correo válido.' };
  }
  if (normalizedEmail !== DEMO_USER.email || password !== DEMO_USER.password) {
    return { ok: false, message: 'Correo o contraseña incorrectos.' };
  }
  return { ok: true, user: { email: DEMO_USER.email, name: DEMO_USER.name } };
}

export function createSession(user, storage = localStorage) {
  const session = { ...user, startedAt: new Date().toISOString() };
  storage.setItem('aula-ia-session', JSON.stringify(session));
  return session;
}

export function getSession(storage = localStorage) {
  try {
    const value = storage.getItem('aula-ia-session');
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}
