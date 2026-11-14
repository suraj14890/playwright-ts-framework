import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
test.use({ launchOptions: { slowMo: 1000 } }); 

test.beforeEach(async ({ page }) => {                         // runs before EVERY test in this file
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
});

test('products page shows 6 items', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await expect(inventory.title).toHaveText('Products');      // exact text check
  await expect(inventory.items).toHaveCount(6);              // count check
});

test('add and remove a product from the cart', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.addToCart('Sauce Labs Backpack');
  await expect(inventory.cartBadge).toHaveText('1');         // badge shows 1

  await inventory.removeFromCart('Sauce Labs Backpack');
  await expect(inventory.cartBadge).toBeHidden();            // badge disappears
});