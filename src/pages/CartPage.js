import { CartLocators } from "../locators/cart_locators.js";
import { BasePage } from "../helpers/BasePage.js";

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartLocators = new CartLocators(page);
  }

  async assertButtonsAreEnabled() {
    await this.waitForVisible(
      this.cartLocators.itemDescription
    );
    await this.waitForVisible(
      this.cartLocators.quantity
    );
    await this.waitForEnabled(
      this.cartLocators.removeButton
    );
    await this.waitForEnabled(
      this.cartLocators.checkoutButton
    );
    await this.waitForEnabled(
      this.cartLocators.continueButton
    );
  }

  async clickRemoveButton() {
    await this.clickElement(this.cartLocators.removeButton);
  }

  async verifyElementsRemoved() {
    await this.waitForHidden(this.cartLocators.quantity);
  }
}