import { CartLocators } from "../locators/cart_locators.js";
import { BasePage } from "../helpers/BasePage.js";

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartLocators = new CartLocators(page);
  }

  async assertRemoveButtonEnabled() {
    await this.waitForEnabled(
      this.cartLocators.removeButton
    );
  }
}