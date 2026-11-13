import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;
  readonly error: Locator;

  constructor(private page: Page) {                 // receives the browser tab once
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginBtn = page.locator('#login-button');
    this.error = page.locator('[data-test="error"]');
  }

  async open(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(user: string, pass: string): Promise<void> {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }
}