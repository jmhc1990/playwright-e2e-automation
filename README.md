# Playwright E2E Automation Framework

Framework de automatización de calidad con Playwright y TypeScript, enfocado en pruebas end-to-end de interfaz, validación de APIs REST, simulación de red y ejecución reproducible en CI.

[![Playwright](https://img.shields.io/badge/Playwright-E2E%20%26%20API-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20test%20code-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI-2088FF?logo=githubactions&logoColor=white)](https://github.com/jmhc1990/playwright-e2e-automation/actions)
[![ESLint](https://img.shields.io/badge/ESLint-Linting-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-Formatting-F7B93E?logo=prettier&logoColor=white)](https://prettier.io/)

## Resumen

El proyecto verifica flujos de compra sobre [SauceDemo](https://www.saucedemo.com/), prueba endpoints REST públicos de JSONPlaceholder e incluye escenarios de interceptación de red. Está organizado con Page Object Model, fixtures de Playwright y un proyecto de setup para reutilizar el estado autenticado en los tests de UI.

## Arquitectura y prácticas

- **Page Object Model:** las clases de `pages/` encapsulan localizadores y acciones de Login, Inventario, Productos y Checkout, separando la interacción de las verificaciones de los tests.
- **Fixtures personalizadas:** `tests/fixtures.ts` extiende `test` y proporciona instancias de páginas como dependencias tipadas a cada caso.
- **Autenticación compartida:** `tests/auth.setup.ts` inicia sesión y guarda el estado en `playwright/.auth/user.json`. El proyecto `chromium` depende del proyecto `setup` y carga ese estado para evitar repetir el login en cada flujo protegido.
- **Evidencia de fallos:** Playwright conserva trazas y vídeos en caso de fallo y captura screenshots cuando un test falla. El reporte HTML se genera con apertura automática desactivada.
- **Calidad continua:** ESLint y Prettier verifican el código; ESLint reconoce los helpers de aserción `expect...` de los Page Objects. Husky ejecuta `lint-staged` antes de cada commit sobre archivos TypeScript preparados.

## Cobertura

### Interfaz (E2E)

Los tests de SauceDemo cubren autenticación con credenciales válidas e inválidas, acceso al inventario, adición de productos al carrito y el proceso de checkout hasta la confirmación del pedido.

### API REST

`tests/api/posts.api.spec.ts` usa el fixture nativo `request` de Playwright para validar `GET`, `POST`, `PUT` y `DELETE` en `https://jsonplaceholder.typicode.com`. Incluye comprobaciones de estado HTTP, respuestas, contrato básico y recurso inexistente. JSONPlaceholder simula las operaciones de escritura; los cambios no se persisten.

### Interceptación y mocking de red

`tests/api/mocking.spec.ts` utiliza `page.route()` para interceptar un `GET` e inyectar un payload personalizado, simular un error HTTP 500 para un `POST` y abortar recursos de imagen durante la navegación. Estos escenarios permiten comprobar comportamiento y resiliencia sin depender de respuestas reales para cada caso.

## CI/CD y artefactos

El workflow `.github/workflows/playwright.yml` instala dependencias y navegadores en GitHub Actions y ejecuta la suite en cada `push` o `pull_request` dirigido a `main` o `master`. Al terminar, incluso si fallan los tests, carga el artefacto `playwright-report` con:

- `playwright-report/`: reporte HTML.
- `test-results/`: trazas `trace.zip`, capturas y vídeos retenidos según la configuración de Playwright.

Los artefactos tienen una retención de 30 días y se pueden descargar desde la ejecución correspondiente en la pestaña **Actions** del repositorio.

## Estructura del repositorio

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml       # Pipeline CI y carga de artefactos
├── .husky/
│   └── pre-commit               # Ejecuta lint-staged
├── pages/
│   ├── CheckoutPage.ts
│   ├── InventoryPage.ts
│   ├── LoginPage.ts
│   └── ProductsPage.ts          # Page Objects
├── playwright/
│   └── .auth/                   # Estado de sesión generado (ignorado por Git)
├── tests/
│   ├── api/
│   │   ├── mocking.spec.ts      # Network interception y mocking
│   │   └── posts.api.spec.ts    # Pruebas REST con request
│   ├── auth.setup.ts            # Login global y storageState
│   ├── checkout.spec.ts
│   ├── fixtures.ts              # Fixtures de Page Objects
│   ├── inventory.spec.ts
│   └── login.spec.ts
├── playwright.config.ts
├── eslint.config.mjs
├── .prettierrc
├── .prettierignore
├── package.json
└── package-lock.json
```

## Requisitos e instalación

Se recomienda Node.js LTS. Desde la raíz del repositorio:

```bash
npm ci
npx playwright install --with-deps
```

En Windows también se puede instalar solo Chromium con `npx playwright install chromium`.

## Comandos

| Comando                      | Uso                                                                         |
| ---------------------------- | --------------------------------------------------------------------------- |
| `npm test`                   | Ejecutar toda la suite Playwright.                                          |
| `npm run test:api`           | Ejecutar los tests ubicados en `tests/api`.                                 |
| `npm run test:all`           | Ejecutar ESLint, comprobar formato y luego correr toda la suite Playwright. |
| `npm run lint`               | Analizar los archivos TypeScript con ESLint.                                |
| `npm run lint:fix`           | Aplicar correcciones automáticas de ESLint.                                 |
| `npm run format`             | Formatear los archivos TypeScript con Prettier.                             |
| `npm run format:check`       | Comprobar el formato sin modificar archivos.                                |
| `npx playwright show-report` | Abrir localmente el último reporte HTML generado.                           |

## Tecnologías

- Playwright Test para automatización de navegador, API y network mocking.
- TypeScript para tests y Page Objects tipados.
- ESLint con reglas de TypeScript y Playwright.
- Prettier para formato consistente.
- Husky y lint-staged para validación pre-commit.
- GitHub Actions para CI y publicación de artefactos.
