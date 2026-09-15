import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Autenticación - SauceDemo', () => {

  test('Debería iniciar sesión correctamente con credenciales válidas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Debería mostrar error con credenciales incorrectas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('usuario_falso', 'contraseña_mala');

    await loginPage.expectErrorVisible();
  });

});