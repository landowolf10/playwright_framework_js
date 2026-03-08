export class CheckoutLocators {
  constructor() {
    this.checkoutButton = "[data-test='checkout']";
    this.txtFirstName = "[data-test='first-name']";
    this.txtLastName = "[data-test='last-name']";
    this.txtZipCode = "[data-test='postal-code']";
    this.continueButton = "[data-test='continue']";
    this.subtotal = ".summary_subtotal_label";
    this.finishButton = "[data-test='finish']";
    this.orderTitle = ".complete-header";
    this.orderMessage = ".complete-text";
    this.backToHomeButton = "[data-test='back-to-products']";
  }
}