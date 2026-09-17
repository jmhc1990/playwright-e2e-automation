import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Flujo de Catálogo - SauceDemo', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    // Precondición: Estar autenticado en la plataforma
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectLoaded();
  });

  test('Debería agregar un producto al carrito correctamente', async () => {
    // 1. Añadir el primer producto
    await inventoryPage.addFirstItemToCart();

    // 2. Validar que el badge del carrito cambie a '1'
    await inventoryPage.expectCartCount('1');
  });
});