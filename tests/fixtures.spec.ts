import { test, expect } from '../fixtures/pages';           // our test, not Playwright's

test('locked user sees an error', async ({ loginPage }) => {   // just ask for loginPage
  await loginPage.open();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await expect(loginPage.error).toContainText('locked out');
});

test('logged-in user can add to cart', async ({ loggedIn }) => {   // already logged in!
  await loggedIn.addToCart('Sauce Labs Backpack');
  await expect(loggedIn.cartBadge).toHaveText('1');
});