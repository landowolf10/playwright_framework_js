import { After } from "@cucumber/cucumber";

//Creates a screenshot of failed tests and saves it 
// in a folder after each execution is completed.
After(async function (scenario) {
  if (scenario.result.status === "FAILED") {
    const screenshot = await this.page.screenshot({
      path: `reports/screenshots/${scenario.pickle.name}.png`,
      fullPage: true
    });

    this.attach(screenshot, "image/png");
  }
});