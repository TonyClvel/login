# Login básico

Abre `index.html` en un navegador. Credenciales de demostración:

- Correo: `demo@campus.edu`
- Contraseña: `Aprende2026!`

Ejecuta las cinco pruebas con `npm test` (Node.js 18 o posterior).

## Control de cambios con GitHub Actions

El workflow `.github/workflows/agent-only.yml` solo considera autorizado al actor configurado en la variable del repositorio `OPENCODE_GITHUB_ACTOR` (por defecto, `opencode[bot]`). Cualquier ejecución iniciada por otra cuenta falla antes de ejecutar las pruebas.

Para que un `push` manual quede realmente impedido —un workflow solo puede marcar un `push` como fallido después de que llegó— configura además una ruleset o protección para `main` en GitHub:

1. Exige pull requests antes de actualizar `main`.
2. Exige el check **Solo cambios de OpenCode**.
3. Desactiva los bypasses de administradores si también deben quedar sujetos a la regla.

El bot de OpenCode debe crear la pull request o usar su propio token/app; si una persona sube cambios utilizando su token, GitHub la identifica como autora y el check falla. No guardes tokens de OpenCode en el repositorio: usa un GitHub App o un secret de Actions.
