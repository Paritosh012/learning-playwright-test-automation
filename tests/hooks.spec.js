const { test, expect } = require("@playwright/test");

let api;

test.beforeAll(async ({ playwright }) => {
  api = await playwright.request.newContext();
  const res = await api.get("https://the-internet.herokuapp.com/");
  expect(res.ok()).toBeTruthy();
  console.log("beforeAll: site chal rahi hai");
});

test.beforeEach(async ({ page }) => {
  await page.goto("/secure");
  console.log("beforeEach: secure page khola");
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === "failed") {
    await testInfo.attach("fail-url", { body: page.url() });
  }
  console.log("afterEach: " + testInfo.title + " → " + testInfo.status);
});

test.afterAll(async () => {
  await api.dispose();
  console.log("afterAll: safai ho gayi");
});

test("Secure page ka heading", async ({ page }) => {
  await expect(page.locator("h2")).toContainText("Secure Area");
});

test("Logout button dikh raha hai", async ({ page }) => {
  await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
});

test("Logout karne par login page aata hai", async ({ page }) => {
  await page.getByRole("link", { name: "Logout" }).click();
  await expect(page).toHaveURL("/login");
});
