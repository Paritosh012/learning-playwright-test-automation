const fs = require("fs");

class MyReporter {
  constructor() {
    // test.id -> { test, result }  (sirf AAKHRI attempt yaad rakhte hain)
    this.results = new Map();
  }

  onBegin(config, suite) {
    console.log("🚀 Tests shuru: total " + suite.allTests().length + " tests");
  }

  onTestEnd(test, result) {
    // Retries hone par ye har attempt ke liye chalta hai.
    // Map same test.id ko overwrite karta hai, to ek test ek hi baar gina jayega.
    this.results.set(test.id, { test, result });
  }

  onEnd(result) {
    const count = { expected: 0, unexpected: 0, flaky: 0, skipped: 0 };
    const lines = [];

    for (const { test, result: last } of this.results.values()) {
      // outcome() saare attempts dekh kar final faisla deta hai:
      // expected = pass, unexpected = fail, flaky = pehle fail phir retry mein pass
      const outcome = test.outcome();
      count[outcome]++;

      // titlePath mein project (browser) ka naam bhi aata hai,
      // to chromium/firefox/webkit wale same test alag dikhenge
      const name = test.titlePath().filter(Boolean).join(" › ");
      lines.push(name + " → " + outcome + " (" + last.duration + "ms, attempt " + (last.retry + 1) + ")");
    }

    const summary =
      "===== MERI TEST REPORT =====\n" +
      lines.join("\n") +
      "\n----------------------------\n" +
      "Passed: " + count.expected + "\n" +
      "Failed: " + count.unexpected + "\n" +
      "Flaky: " + count.flaky + "\n" +
      "Skipped: " + count.skipped + "\n" +
      "Final: " + result.status + "\n";

    fs.writeFileSync("my-report.txt", summary);
    console.log("🏁 Report save ho gayi: my-report.txt");
  }
}

module.exports = MyReporter;