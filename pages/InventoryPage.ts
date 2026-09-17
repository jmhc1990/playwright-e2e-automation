import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly firstAddToCartBtn: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.firstAddToCartBtn = page.locator('.inventory_item button').first();
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async expectLoaded() {
    await expect(this.title).toHaveText('Products');
  }

  async addFirstItemToCart() {
    await this.firstAddToCartBtn.click();
  }

  async expectCartCount(expectedCount: string) {
    await expect(this.shoppingCartBadge).toHaveText(expectedCount);
  }
}