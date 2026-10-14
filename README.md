# Login básico

Abre `index.html` en un navegador. Credenciales de demostración:

- Correo: `demo@campus.edu`
- Contraseña: `Aprende2026!`

Ejecuta las cinco pruebas con `npm test` (Node.js 18 o posterior).

## Control de cambios con GitHub Actions y OpenCode

Instala primero la integración oficial de OpenCode en el repositorio con `opencode github install`, o instala la GitHub App **opencode-agent** y su workflow siguiendo su documentación. OpenCode ejecuta sus tareas dentro de Actions y crea una rama y PR; no es correcto validar `github.actor`, porque ese valor puede ser la persona que escribió el comentario `/opencode`.

El workflow `.github/workflows/agent-only.yml` valida en cambio el autor de la PR (`github.event.pull_request.user.login`). Tras la primera PR creada por la app, copia el valor mostrado como autora (normalmente `opencode-agent[bot]`) a la variable de repositorio `OPENCODE_GITHUB_ACTOR`. Cualquier PR de otra identidad falla antes de las pruebas.

Para que el control sea efectivo —una validación YAML no puede distinguir de forma criptográfica cada edición si una persona también puede escribir en la misma rama— configura estas rulesets o protecciones en GitHub:

1. Exige pull requests antes de actualizar `main`.
2. Exige el check **Solo cambios de OpenCode**.
3. Identifica el patrón de rama que crea OpenCode en esa primera PR y crea una regla para ese patrón que limite los pushes a la GitHub App de OpenCode. Nadie más debe poder enviar commits a esas ramas.
4. Desactiva los bypasses de administradores si también deben quedar sujetos a la regla.

Esto permite rechazar PRs manuales y PRs con ramas no autorizadas. No guardes tokens de OpenCode en el repositorio: usa la GitHub App o un secret de Actions.
