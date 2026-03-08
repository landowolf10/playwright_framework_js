import { Then } from "@cucumber/cucumber";

Then("finish cart validation", async function () {
    await this.commonPage.goToCart();
    await this.cartPage.assertButtonsAreEnabled();
    await this.cartPage.clickRemoveButton();
    await this.cartPage.verifyElementsRemoved();
});

