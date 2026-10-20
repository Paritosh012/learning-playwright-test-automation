const { test, expect } = require("@playwright/test");

let testNumber = 0;

test.beforeAll(async () => {
  console.log("beforeAll: file shuru hui (sirf ek baar)");
});

test.beforeEach(async ({ page }) => {
  testNumber++;
  console.log("beforeEach: test " + testNumber + " se pehle secure page khola");
  await page.goto("/secure");
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(
    "afterEach: '" + testInfo.title + "' khatam, result = " + testInfo.status,
  );

  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({
      path: "test-results/hooks-failed-" + testNumber + ".png",
    });
    console.log("afterEach: test fail hua, screenshot save kiya");
  }
});

test.afterAll(async () => {
  console.log("afterAll: file khatam, total tests chale = " + testNumber);
});

test("Secure page ka heading", async ({ page }) => {
  await expect(page.locator("h2")).toContainText("Secure");
});

test("Logout button dikh raha hai", async ({ page }) => {
  console.log("TEST 2 chal raha hai");
  await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
});

test("Logout karne par login page aata hai", async ({ page }) => {
  console.log("TEST 3 chal raha hai");

  await page.getByRole("link", { name: "Logout" }).click();
  await expect(page).toHaveURL(/login/);
  await expect(page.locator("#flash")).toContainText("You logged out");
});
