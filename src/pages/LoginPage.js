import { LoginLocators } from "../locators/login_locators.js";
import { BasePage } from "../helpers/BasePage.js";

//LoginPage extends BasePage to use functionalities.
export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.loginLocators = new LoginLocators();
  }

  //Sends text to an element using the Playwright 
  //fill function (wrapped in BasePage by writeText
  //function to handle it better).
  async writeUsername(userName) {
    await this.writeText(this.loginLocators.userTextbox, userName);
  }

  async writePassword(password) {
    await this.writeText(this.loginLocators.passwordTextbox, password);
  }

  //Clicks an element using the Playwright click 
  //function (wrapped in BasePage by clickElement
  //function to handle it better).
  async clickLoginButton() {
    await this.clickElement(this.loginLocators.loginButton);
  }
}