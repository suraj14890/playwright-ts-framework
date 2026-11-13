import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly title: Locator;
  readonly items: Locator;
  readonly cartBadge: Locator;

  constructor(private page: Page) {
    this.title = page.locator('.title');                      // the "Products" heading
    this.items = page.locator('.inventory_item');             // every product card
    this.cartBadge = page.locator('.shopping_cart_badge');    // the red number on the cart icon
  }

  async addToCart(productName: string): Promise<void> {
    await this.items
      .filter({ hasText: productName })                       // find the card containing this name
      .getByRole('button', { name: 'Add to cart' })           // the button inside that card
      .click();
  }

  async removeFromCart(productName: string): Promise<void> {
    await this.items
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }
}