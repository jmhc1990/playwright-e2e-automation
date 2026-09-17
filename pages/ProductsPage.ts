import { Page, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productTitle = '.title';
  readonly addToCartBackpack = '#add-to-cart-sauce-labs-backpack';
  readonly cartIcon = '.shopping_cart_link';
  readonly cartBadge = '.shopping_cart_badge';

  constructor(page: Page) {
    this.page = page;
  }

  async verifyIsOnProductsPage() {
    await expect(this.page.locator(this.productTitle)).toHaveText('Products');
  }

  async addBackpackToCart() {
    await this.page.locator(this.addToCartBackpack).click();
    await expect(this.page.locator(this.cartBadge)).toHaveText('1');
  }

  async goToCart() {
    await this.page.locator(this.cartIcon).click();
  }
}