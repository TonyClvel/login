import { createSession, getSession, validateCredentials } from './login.js';

const form = document.querySelector('#login-form');
const message = document.querySelector('#form-message');

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
}

const activeSession = getSession();
if (activeSession) {
  showMessage(`Sesión activa: ${activeSession.name}. Puedes volver a entrar si lo necesitas.`, 'success');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const result = validateCredentials(data.get('email'), data.get('password'));

  if (!result.ok) {
    showMessage(result.message, 'error');
    return;
  }

  createSession(result.user);
  showMessage(`Bienvenido, ${result.user.name}. Sesión iniciada correctamente.`, 'success');
  form.reset();
});
