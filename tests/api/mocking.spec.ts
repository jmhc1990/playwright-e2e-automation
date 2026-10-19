import { test, expect } from '@playwright/test';

test.describe('Pruebas de Interceptación de Red y Mocking (Network Interception)', () => {
  test('Debe interceptar un GET y devolver un payload modificado (Mocking Response)', async ({
    page,
  }) => {
    // 1. Interceptamos la llamada a la API antes de realizar la navegación
    await page.route('https://jsonplaceholder.typicode.com/posts/1', async (route) => {
      // Devolvemos una respuesta falsa (mocked) con status 200 y JSON personalizado
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          userId: 1,
          id: 1,
          title: 'Título Inyectado por Playwright Mock',
          body: 'Este contenido no viene del servidor, ha sido simulado por page.route().',
        }),
      });
    });

    // 2. Realizamos la petición desde el navegador o mediante fetch de la página
    const response = await page.evaluate(async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      return await res.json();
    });

    // 3. Verificamos que el cliente recibió los datos interceptados
    expect(response.title).toBe('Título Inyectado por Playwright Mock');
    expect(response.body).toContain('simulado por page.route()');
  });

  test('Debe simular un error 500 del servidor (Resiliencia de cliente)', async ({ page }) => {
    // Interceptamos cualquier intento de creación (POST) y forzamos un fallo de servidor
    await page.route('https://jsonplaceholder.typicode.com/posts', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Internal Server Error (Simulated)' }),
        });
      } else {
        await route.continue();
      }
    });

    // Ejecutamos la llamada desde la página
    const status = await page.evaluate(async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Test Post' }),
      });
      return res.status;
    });

    // Validamos que el cliente recibe la respuesta 500 simulada
    expect(status).toBe(500);
  });

  test('Debe abortar peticiones no esenciales para acelerar la carga de tests', async ({
    page,
  }) => {
    // Bloqueamos la carga de imágenes o recursos pesados durante la navegación
    await page.route('**/*.{png,jpg,jpeg,svg}', (route) => route.abort());

    await page.goto('https://www.saucedemo.com/');

    // La página carga, pero los recursos de imagen han sido abortados en red
    await expect(page.locator('#login-button')).toBeVisible();
  });
});
