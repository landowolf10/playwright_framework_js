import { LoginPage } from "./LoginPage.js";
import { CommonPage } from "./CommonPage.js";
import { DashboardPage } from "./DashboardPage.js";
import { CheckoutPage } from "./CheckoutPage.js";
import { CartPage } from "./CartPage.js";

export class PageObjectManager {
    constructor(page) {
        this.page = page;

        this._loginPage = null;
        this._commonPage = null;
        this._dashboardPage = null;
        this._checkoutPage = null;
        this._cartPage = null;
    }

    getLoginPage() {
        if (!this._loginPage) {
            this._loginPage = new LoginPage(this.page);
        }

        return this._loginPage;
    }

    getCommonPage() {
        if (!this._commonPage) {
            this._commonPage = new CommonPage(this.page);
        }

        return this._commonPage;
    }

    getDashBoardPage() {
        if (!this._dashboardPage) {
            this._dashboardPage = new DashboardPage(this.page);
        }

        return this._dashboardPage;
    }

    getCartPage() {
        if (!this._cartPage) {
            this._cartPage = new CartPage(this.page);
        }

        return this._cartPage;
    }

    getCheckoutPage() {
        if (!this._checkoutPage) {
            this._checkoutPage = new CheckoutPage(this.page);
        }

        return this._checkoutPage;
    }
}