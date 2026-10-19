import { test, expect } from './fixtures';

test.describe('Flujo de Checkout - SauceDemo', () => {

  test.beforeEach(async ({ inventoryPage }) => {
    // Entra directamente con la sesión ya cargada por la fixture/setup
    await inventoryPage.goto();
    await inventoryPage.expectLoaded();
  });

  test('Debería completar una compra de principio a fin', async ({ inventoryPage, checkoutPage }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.expectCartCount('1');

    await checkoutPage.openCart();
    await checkoutPage.expectItemsInCart(1);
    await checkoutPage.startCheckout();
    await checkoutPage.fillShippingInfo('José María', 'Holgado', '29001');
    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderComplete();
  });
});