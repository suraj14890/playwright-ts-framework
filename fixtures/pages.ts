import { test as base } from '@playwright/test';            // rename Playwright's test to "base"
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

type MyFixtures = {                                         // list the fixtures we're adding, and their types
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  loggedIn: InventoryPage;
};

export const test = base.extend<MyFixtures>({               // a new "test" with our extra fixtures

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));                         // hand the test a ready LoginPage
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  loggedIn: async ({ page }, use) => {                      // setup → use → teardown
    const loginPage = new LoginPage(page);
    await loginPage.open();                                 // SETUP: before use()
    await loginPage.login('standard_user', 'secret_sauce');
    await use(new InventoryPage(page));                     // the test runs HERE
    console.log('Test finished — cleanup runs now');        // TEARDOWN: after use()
  },
});

export { expect } from '@playwright/test';