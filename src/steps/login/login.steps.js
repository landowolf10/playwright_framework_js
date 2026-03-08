import { Given, When, Then } from "@cucumber/cucumber";
import { users } from "../../config/test-data.js";

Given("I navigate to SauceLab", async function () {
    await this.commonPage.navigateToSauceLab();
});

When("I enter {string} credentials", async function (userType) {
    try {
        const user = users[userType];

        if (!user) {
            throw new Error(`User type "${userType}" not defined in test data`);
        }

        await this.loginPage.writeUsername(user.username);
        await this.loginPage.writePassword(user.password);
    } catch (error) {
        throw new Error(
            `Failed to enter credentials for "${userType}". ${error.message}`
        );
    }
});

Then("I click the login button", async function () {
    await this.loginPage.clickLoginButton();
});

Then("the login result should be {string}", async function (result) {
    if (result === "success") {
        await this.commonPage.assertLoginSuccess();
    } else {
        await this.commonPage.assertLoginFailed();
    }
});