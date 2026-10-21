const {   test, expect } = require("@playwright/test");

test("Login", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Username").fill("tomsmith");
  await page.getByLabel("Password").fill("SuperSecretPassword!");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("/secure");
  await expect(page.locator("#flash")).toContainText(
    "You logged into a secure area!",
  );
});

test("Wrong password error", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Username").fill("tomsmith");
  await page.getByLabel("Password").fill("wrong pass");
  await page.getByRole("button", { name: "login" }).click();

  await expect(page.locator("#flash")).toContainText(
    "Your password is invalid!",
  );
});
