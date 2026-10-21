// tests/codegen.spec.js
// Recorded with: npx playwright codegen -o tests/codegen.spec.js https://www.saucedemo.com/
// Cleaned up after recording: import -> require, assertions added, grouped in describe.
// NOTE: if codegen gave you different locators than these, trust codegen's — the site may have changed.
const { test, expect } = require('@playwright/test');

const SAUCE_URL = 'https://www.saucedemo.com/'; // absolute URL, so the herokuapp baseURL is ignored

test.describe('SauceDemo - codegen flow', () => {
  test('standard_user can buy a backpack', async ({ page }) => {
    await page.goto(SAUCE_URL);
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Test');
    await page.locator('[data-test="lastName"]').fill('User');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();

    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });

  test('locked_out_user sees an error', async ({ page }) => {
    await page.goto(SAUCE_URL);
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  });
});