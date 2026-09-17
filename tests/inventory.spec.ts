import { test, expect } from './fixtures';

test.describe('Flujo de Catálogo - SauceDemo', () => {

  test.beforeEach(async ({ inventoryPage }) => {
    // Entra directamente con la sesión ya cargada por la fixture/setup
    await inventoryPage.goto();
    await inventoryPage.expectLoaded();
  });

  test('Debería agregar un producto al carrito correctamente', async ({ inventoryPage }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.expectCartCount('1');
  });
});