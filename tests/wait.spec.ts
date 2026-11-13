import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('slow login still passes thanks to auto-waiting', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('performance_glitch_user', 'secret_sauce');  // login takes a few seconds

  // EXPLICIT WAIT: wait for a specific signal — the URL changing
  await page.waitForURL('**/inventory.html', { timeout: 15_000 });

  // WEB-FIRST ASSERTION: keeps retrying until true (default 5 seconds)
  await expect(page.locator('.title')).toHaveText('Products');
});

test('timeouts at different levels', async ({ page }) => {
  test.setTimeout(60_000);                       // this WHOLE test may take up to 60 s

  await page.goto('https://www.saucedemo.com', { timeout: 20_000 });     // this navigation: 20 s max
  await page.locator('#user-name').fill('standard_user', { timeout: 5_000 }); // this action: 5 s max
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await expect(page.locator('.inventory_item')).toHaveCount(6, { timeout: 10_000 }); // this check: 10 s max
});