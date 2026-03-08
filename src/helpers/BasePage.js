import { expect } from "@playwright/test";
import { TIMEOUTS } from "../config/constants.js";
import { logger } from "../helpers/logger.js";

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  getLocator(locator) {
    if (typeof locator === "string") {
      return this.page.locator(locator);
    }

    return locator;
  }

  async waitForVisible(locator, timeout = TIMEOUTS.short) {
    const element = this.getLocator(locator);

    logger.info(`Waiting for element visible: ${locator}`);

    await element.waitFor({
      state: "visible",
      timeout
    });
  }

  async waitForHidden(locator, timeout = TIMEOUTS.short) {
    const element = this.getLocator(locator);

    logger.info(`Waiting for element hidden: ${locator}`);

    await element.waitFor({
      state: "hidden",
      timeout
    });

  }

  async waitForEnabled(locator, timeout = TIMEOUTS.short) {

    const element = this.getLocator(locator);

    logger.info(`Waiting for element enabled: ${locator}`);

    await expect(element).toBeEnabled({ timeout });

  }

  async getAllElements(locator, timeout = TIMEOUTS.short) {
    const element = this.getLocator(locator);

    await element.first().waitFor({
      state: "visible",
      timeout
    });

    return await element.all();
  }

  async getElement(locator, timeout = TIMEOUTS.short) {
    const element = this.getLocator(locator);

    await element.first().waitFor({
      state: "visible",
      timeout
    });

    return await element;
  }

  async writeText(locator, text, timeout = TIMEOUTS.short) {

    const element = this.getLocator(locator);

    logger.info(`Writing text into element: ${locator}`);

    await element.waitFor({
      state: "visible",
      timeout
    });

    await element.fill(text);

  }

  async clickElement(locator, timeout = TIMEOUTS.short) {

    const element = this.getLocator(locator);

    logger.info(`Clicking element: ${locator}`);

    await element.waitFor({
      state: "visible",
      timeout
    });

    await element.click();

  }

  async getElementText(locator, timeout = TIMEOUTS.short) {
    const element = this.getLocator(locator);

    await element.waitFor({
      state: "visible",
      timeout
    });

    const text = await element.textContent();

    logger.info(`Element text: ${text}`);

    return text ?? "";
  }

  async selectDropdownOption(locator, option, timeout = TIMEOUTS.short) {

    const element = this.getLocator(locator);

    logger.info(`Selecting dropdown option: ${option}`);

    await element.waitFor({
      state: "visible",
      timeout
    });

    await element.selectOption(option);

  }

  async scrollToElement(locator) {

    const element = this.getLocator(locator);

    logger.info(`Scrolling to element: ${locator}`);

    await element.scrollIntoViewIfNeeded();

  }

  async waitForPageLoad(state = "load") {

    logger.info(`Waiting for page load: ${state}`);

    await this.page.waitForLoadState(state);

  }

  async takeScreenshot(name) {

    logger.info(`Taking screenshot: ${name}`);

    await this.page.screenshot({
      path: `reports/screenshots/${name}.png`
    });

  }

}