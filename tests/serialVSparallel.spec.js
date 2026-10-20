const { test } = require("@playwright/test");

test.describe.configure({ mode: "serial" });

test("Test 1", async ({ page }) => {
  await page.goto("/login");
  await page.waitForTimeout(3000);
});

test("Test 2", async ({ page }) => {
  await page.goto("/upload");
  await page.waitForTimeout(3000);
});

test("Test 3", async ({ page }) => {
  await page.goto("/checkboxes");
  await page.waitForTimeout(3000);
});
