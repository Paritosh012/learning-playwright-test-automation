const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0,
  workers: undefined,
  timeout: 30000,
  expect: { timeout: 5000 },

  reporter: [["list"], ["html", { open: "never" }], ["./my-reporter.js"]],

  use: {
    baseURL: "https://the-internet.herokuapp.com",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-re try",
  },

  projects: [
    {
      name: "setup",
      testMatch: /auth\.setup\.js/,
      teardown: "cleanup",
    },
    {
      name: "cleanup",
      testMatch: /global\.teardown\.js/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],
});
