import { test as setup, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Definir rutas absolutas para evitar fallos de directorio
const authDir = path.join(__dirname, '../playwright/.auth');
const authFile = path.join(authDir, 'user.json');

setup('autenticar usuario globalmente', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Validar que el login fue exitoso antes de guardar estado
  await expect(page.locator('.title')).toHaveText('Products');

  // Crear directorio .auth en disco si no existe
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Guardar cookies y localStorage
  await page.context().storageState({ path: authFile });
});