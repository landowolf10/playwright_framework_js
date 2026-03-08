import { After } from "@cucumber/cucumber";
import fs from "fs";
import path from "path";

After(async function (scenario) {
  if (scenario.result.status === "FAILED") {
    const screenshot = await this.page.screenshot({
      path: `reports/screenshots/${scenario.pickle.name}.png`,
      fullPage: true
    });

    this.attach(screenshot, "image/png");
  }
});