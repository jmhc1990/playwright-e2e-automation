import { test, expect } from './fixtures';

test.describe('Flujo de Catálogo - SauceDemo', () => {

  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectLoaded();
  });

  test('Debería agregar un producto al carrito correctamente', async ({ inventoryPage }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.expectCartCount('1');
  });
});