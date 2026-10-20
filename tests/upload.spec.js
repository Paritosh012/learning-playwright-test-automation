const { test, expect } = require("@playwright/test");
const path = require("path");

test("Computer ki file upload karo", async ({ page }) => {
  await page.goto("/upload");

  const filepath = path.join(__dirname, "../test-data/sample.txt");
  await page.locator("#file-upload").setInputFiles(filepath);

  await page.locator("#file-submit").click();

  await expect(page.locator("h3")).toHaveText("File Uploaded!");
  await expect(page.locator("#uploaded-files")).toHaveText("sample.txt");
});

test("Bina asli file ke upload (memory se)", async ({ page }) => {
  await page.goto("/upload");

  await page.locator("#file-upload").setInputFiles({
    name: "notes.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("Ye file computer par hai hi nahi"),
  });

  await page.locator("#file-submit").click();

  await expect(page.locator("h3")).toHaveText("File Uploaded!");
  await expect(page.locator("#uploaded-files")).toHaveText("notes.txt");
});
