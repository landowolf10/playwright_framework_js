import { CartLocators } from "../locators/cart_locators.js";
import { BasePage } from "../helpers/BasePage.js";

//CartPage extends BasePage to use functionalities.
export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartLocators = new CartLocators(page);
  }

  //Function to validate if elements are visible
  //and buttons are enabled.
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

  //Clicks the remove button of the product
  //added to the cart.
  async clickRemoveButton() {
    await this.clickElement(this.cartLocators.removeButton);
  }

  //Verify product was removed from cart.
  async verifyElementsRemoved() {
    await this.waitForHidden(this.cartLocators.quantity);
  }
}