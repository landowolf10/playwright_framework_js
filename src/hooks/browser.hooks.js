import { BeforeAll, AfterAll, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, firefox, webkit } from "@playwright/test";
import dotenv from "dotenv";
import { logger } from "../helpers/logger.js";
import fs from "fs";
import path from "path";
import * as allure from "allure-js-commons";

dotenv.config();
setDefaultTimeout(60 * 1000);

let browser;
let browserName;
const browsers = { chromium, firefox, webkit };

BeforeAll(async () => {
  // Crear carpeta de logs
  if (!fs.existsSync("reports/logs")) {
    fs.mkdirSync("reports/logs", { recursive: true });
  }

    if (!fs.existsSync("reports/videos")) {
        fs.mkdirSync("reports/videos", { recursive: true });
    }

  // Browser seleccionado por variable de entorno
  browserName = process.env.BROWSER || "chromium";

  const selectedBrowser = browsers[browserName];
  if (!selectedBrowser) {
    throw new Error(`Browser "${browserName}" not supported`);
  }

  // Lanzar navegador
  browser = await selectedBrowser.launch({
    headless: process.env.HEADLESS !== "false",
    slowMo: parseInt(process.env.SLOW_MO) || 0,
  });

  // Crear carpeta de resultados de Allure si no existe
  const allureResultsDir = path.join("reports", "allure-results");

  if (!fs.existsSync(allureResultsDir)) {
    fs.mkdirSync(allureResultsDir, { recursive: true });
  }
});

AfterAll(async () => {
  if (browser) await browser.close();
});

Before(async function (scenario) {
  logger.info(`Starting scenario: ${scenario.pickle.name}`);

  this.context = await browser.newContext({
    baseURL: process.env.BASE_URL || "https://www.saucedemo.com",
    ignoreHTTPSErrors: true,
    recordVideo: {
        dir: "reports/videos"
    }
  });
  this.page = await this.context.newPage();

  allure.label("browser", browserName);
});

After(async function (scenario) {

  const video = this.page.video();

  if (scenario.result?.status === "FAILED") {

    logger.error(`Scenario failed: ${scenario.pickle.name}`);

    const dir = "reports/screenshots";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, "image/png");

  }

  // cerrar el contexto para que Playwright termine de generar el video
  if (this.context) {
    await this.context.close();
  }

  // adjuntar video al reporte
  if (scenario.result?.status === "FAILED" && video) {

    const videoPath = await video.path();

    // esperar a que el archivo exista realmente
    let retries = 10;
    while (!fs.existsSync(videoPath) && retries > 0) {
      await new Promise(r => setTimeout(r, 200));
      retries--;
    }

    if (fs.existsSync(videoPath)) {
      const videoBuffer = fs.readFileSync(videoPath);
        this.attach(videoBuffer, "video/webm");
    }

  }

});