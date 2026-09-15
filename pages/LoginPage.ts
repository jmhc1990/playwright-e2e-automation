import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(user: string, pass: string) {
    await this.page.fill('#user-name', user);
    await this.page.fill('#password', pass);
    await this.page.click('#login-button');
  }

  async expectErrorVisible() {
    const errorMessage = this.page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
  }
}