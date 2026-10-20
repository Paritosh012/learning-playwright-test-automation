const { test } = require("@playwright/test");
const fs = require("fs");

const AUTH_FILE = "playwright/.auth/user.json";

test("Cleanup", async () => {
  fs.rmSync(AUTH_FILE, { force: true });
  console.log("CLEANUP: user.json delete kar di");
});
