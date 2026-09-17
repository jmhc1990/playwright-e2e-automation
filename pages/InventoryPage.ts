import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly titleHeader: Locator;
  readonly firstAddButton: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    // Título principal de la página de productos
    this.titleHeader = page.locator('.title');
    // Botón para añadir el primer producto (Sauce Labs Backpack)
    this.firstAddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    // Indicador numérico del carrito
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
  }

  // Verifica que estamos dentro del inventario
  async expectLoaded() {
    await expect(this.titleHeader).toHaveText('Products');
  }

  // Agrega el primer producto
  async addFirstItemToCart() {
    await this.firstAddButton.click();
  }

  // Valida el contador de productos del carrito
  async expectCartCount(expectedCount: string) {
    await expect(this.shoppingCartBadge).toHaveText(expectedCount);
  }
}