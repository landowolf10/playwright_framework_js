import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

When("finish checkout and validation", async function () {
    await this.commonPage.goToCart();
    await this.checkoutPage.assertRemoveButtonEnabled();
    //await this.checkoutPage.proceedWithCheckout();

    /*expect(product.name, "Product name should exist").toBeTruthy();
    expect(product.price, "Product price should be valid").toBeGreaterThan(0);
    await expect(product.button).toContainText("Remove");*/
});

