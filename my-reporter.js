const fs = require("fs");

class MyReporter {
  constructor() {
    this.passed = 0;
    this.failed = 0;
    this.skipped = 0;
    this.lines = [];
  }

  onBegin(config, suite) {
    console.log("🚀 Tests shuru: total " + suite.allTests().length + " tests");
  }

  onTestEnd(test, result) {
    if (result.status === "passed") this.passed++;
    else if (result.status === "skipped") this.skipped++;
    else this.failed++;

    this.lines.push(test.title + " → " + result.status + " (" + result.duration + "ms)");
  }

  onEnd(result) {
    const summary =
      "===== MERI TEST REPORT =====\n" +
      this.lines.join("\n") +
      "\n----------------------------\n" +
      "Passed: " + this.passed + "\n" +
      "Failed: " + this.failed + "\n" +
      "Skipped: " + this.skipped + "\n" +
      "Final: " + result.status + "\n";

    fs.writeFileSync("my-report.txt", summary);
    console.log("🏁 Report save ho gayi: my-report.txt");
  }
}

module.exports = MyReporter;