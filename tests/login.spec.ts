import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
test.use({ launchOptions: { slowMo: 1000 } }); 

test('valid user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});

test('locked user sees an error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await expect(loginPage.error).toContainText('locked out');
});