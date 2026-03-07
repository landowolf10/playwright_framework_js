import { LoginLocators } from "../locators/login_locators.js";
import { BasePage } from "../helpers/BasePage.js";
import { assertEqualsTextString, assertVisible } from "../helpers/assertions.js";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.loginLocators = new LoginLocators();
  }

  async writeUsername(userName) {
    await this.writeText(this.loginLocators.userTextbox, userName);
  }

  async writePassword(password) {
    await this.writeText(this.loginLocators.passwordTextbox, password);
  }

  async clickLoginButton() {
    await this.clickElement(this.loginLocators.loginButton);
  }
}