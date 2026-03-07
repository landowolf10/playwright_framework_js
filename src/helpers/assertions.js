import { expect } from "@playwright/test";
import { TIMEOUTS } from "../config/constants.js";

export async function assertVisible(page, locator, name, timeout = TIMEOUTS.short) {
  try {
    const element =
      typeof locator === "string"
        ? page.locator(locator)
        : locator;

    await expect(element, `${name} should be visible`).toBeVisible({ timeout });

  } catch (error) {

    throw new Error(
      `Visibility assertion failed for "${name}". Locator: ${locator}. Error: ${error.message}`
    );
  }
}

export async function assertEqualsTextString(actual, expected, name) {
  expect(actual, `${name} should equal text: ${expected}`).toEqual(expected);
}

export async function assertHasText(element, expected, name) {
  await expect(element, `${name} should contain text: ${expected}`).toHaveText(expected);
}