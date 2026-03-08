import { CheckoutLocators } from "../locators/checkout_locators.js";
import { BasePage } from "../helpers/BasePage.js";
import { assertHasText } from "../helpers/assertions.js";

export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.checkoutLocators = new CheckoutLocators(page);
  }

  async proceedWithCheckout(firstName, lastName, zipCode) {
    await this.clickElement(this.checkoutLocators.checkoutButton);
    await this.writeText(this.checkoutLocators.txtFirstName, firstName);
    await this.writeText(this.checkoutLocators.txtLastName, lastName);
    await this.writeText(this.checkoutLocators.txtZipCode, zipCode);
    await this.clickElement(this.checkoutLocators.continueButton);
  }

  async getCurrentSubTotal() {
    const currentSubtotal = await this.getElementText(this.checkoutLocators.subtotal);

    if (currentSubtotal !== null) {
      return currentSubtotal;
    } else {
      throw new Error("Subtotal value is null.");
    }
  }

  async finishCheckout() {
    await this.clickElement(this.checkoutLocators.finishButton);
  }

  async clickBackHomeButton() {
    await this.clickElement(this.checkoutLocators.backToHomeButton);
  }

  async validateCheckout() {
    await assertHasText(this.checkoutLocators.orderTitle, "Thank you for your order!", "Title");
    await assertHasText(
      this.checkoutLocators.orderMessage,
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
      "Message"
    );
  }
}