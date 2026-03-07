import { BasePage } from "../helpers/BasePage.js";
import { ENV } from "../config/env.config.js";
import { LoginLocators } from "../locators/login_locators.js";
import { DashboardLocators } from "../locators/dashboard_locators.js";
import { assertVisible, assertEqualsTextString  } from "../helpers/assertions.js";

export class CommonPage extends BasePage {
  constructor(page) {
    super(page);
    this.loginLocators = new LoginLocators();
    this.dashboardLocators = new DashboardLocators(page);
  }

  async navigateToSauceLab() {
    try {
      await this.page.goto(ENV.baseURL);

      const title = await this.page.title();

      if (!title.toLowerCase().includes("swag")) {
        throw new Error(`Unexpected page title: ${title}`);
      }

    } catch (error) {
      throw new Error(
        `Navigation to SauceLab failed. URL: ${ENV.baseURL}. Error: ${error.message}`
      );
    }
  }

  async login(userName, password) {
    await this.writeText(this.loginLocators.userTextbox, userName);
    await this.writeText(this.loginLocators.passwordTextbox, password);
    await this.clickElement(this.loginLocators.loginButton);
  }

  async assertLoginSuccess() {
  try {

    await assertVisible(this.page, this.dashboardLocators.cartIcon, "Cart Icon");

  } catch (error) {

    throw new Error(
      `Login success verification failed. User was not redirected to the dashboard. ${error.message}`
    );

  }
}
  async assertLoginFailed() {
    const errorMessageText = await this.getErrorMessageText();

    await assertVisible(this.page, this.loginLocators.loginButton, "Login button");
    await assertVisible(this.page, this.loginLocators.errorMessage, "Error message");

    if (errorMessageText !== "Epic sadface: Sorry, this user has been locked out.") {
        throw new Error(
          `Unexpected error message.
      Expected: "Epic sadface: Sorry, this user has been locked out."
      Actual: "${errorMessageText}"`
        );
      }
  }
  
  async getErrorMessageText() {
    const errorMessage = await this.getElementText(this.loginLocators.errorMessage);
    return errorMessage ?? "Error message not found.";
  }

  async goToCart() {
    await this.clickElement(this.dashboardLocators.cartIcon);
  }
}