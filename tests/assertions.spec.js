const { test, expect } = require("@playwright/test");

test("Login page assertion", async ({ page }) => {
  await page.goto("/login");

  //   Page Assertions
  await expect(page).toHaveURL(/login/);
  await expect(page).toHaveTitle("The Internet");

  //   Element Assertions
  await expect(page.locator("h2")).toHaveText("Login Page");
  await expect(page.locator("h4")).toContainText("tomsmith");
  await expect(page.getByLabel("Username")).toBeVisible();
  await expect(page.getByLabel("Username")).toBeEmpty();
  await expect(page.getByRole("button", { name: "login" })).toBeEnabled();
  await expect(page.locator("#flash")).not.toBeVisible();

  // Value assertions
  expect(2 + 2).toBe(4);
  expect(["a", "b"]).toContain("a");
  expect({ x: 1 }).toEqual({ x: 1 });
});

test("Soft Assertions", async ({ page }) => {
  await page.goto("/login");
  await expect.soft(page.locator("h2")).toHaveText("Galat 1");
  await expect.soft(page.locator("h4")).toHaveText("Galat 2");
  console.log("soft ke baad bhi ye chala");
});
