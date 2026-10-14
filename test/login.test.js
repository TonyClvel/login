import test from 'node:test';
import assert from 'node:assert/strict';
import { createSession, getSession, validateCredentials } from '../src/login.js';

const storage = () => {
  const values = new Map();
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
};

test('acepta las credenciales de demostración', () => {
  assert.deepEqual(validateCredentials('demo@campus.edu', 'Aprende2026!'), { ok: true, user: { email: 'demo@campus.edu', name: 'Estudiante' } });
});
test('normaliza el correo antes de autenticar', () => {
  assert.equal(validateCredentials(' DEMO@CAMPUS.EDU ', 'Aprende2026!').ok, true);
});
test('rechaza campos obligatorios vacíos', () => {
  assert.deepEqual(validateCredentials('', ''), { ok: false, message: 'Completa tu correo y contraseña.' });
});
test('rechaza un correo con formato inválido', () => {
  assert.deepEqual(validateCredentials('no-es-correo', 'clave'), { ok: false, message: 'Escribe un correo válido.' });
});
test('guarda y recupera una sesión válida', () => {
  const memory = storage();
  const session = createSession({ email: 'demo@campus.edu', name: 'Estudiante' }, memory);
  assert.equal(getSession(memory).email, 'demo@campus.edu');
  assert.ok(session.startedAt);
});
