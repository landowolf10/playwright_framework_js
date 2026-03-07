import { DashboardLocators } from "../locators/dashboard_locators.js";
import { BasePage } from "../helpers/BasePage.js";

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.dashboardLocators = new DashboardLocators();
    this.selectedItemPrices = [];
  }

  async sortWithDropDown(option) {
    await this.selectDropdownOption(this.dashboardLocators.sortDropDown, option);
  }

  async addProduct() {
    const addToCartButtons = await this.getAllElements(this.dashboardLocators.addToCartButton);
    const prices = await this.getAllPrices();

    for (let i = 0; i < prices.length; i++) {
      const currentPrice = prices[i];
      const addToCartButton = addToCartButtons[i];

      if (currentPrice !== undefined && addToCartButton !== undefined && currentPrice < 20) {
        await this.clickElement(addToCartButton);
        prices.splice(i, 1);
        this.selectedItemPrices.splice(i, 1);
        addToCartButtons.splice(i, 1);

        this.selectedItemPrices.push(currentPrice);

        break;
      }
    }

    console.log("Selected item prices: ", this.selectedItemPrices);
  }

  async getExpectedSubTotal() {
    return await this.getSubTotalSum();
  }

  async getAllPrices() {
    const elements = await this.getAllElements(this.dashboardLocators.productPrice);
    const prices = [];

    for (const element of elements) {
      const priceText = await this.getElementText(element);

      if (priceText) {
        const priceValue = parseFloat(priceText.replace("$", "").trim());

        if (!isNaN(priceValue)) {
          prices.push(priceValue);
        } else {
          console.warn("Could not parse price text:", priceText);
        }
      } else {
        console.warn("Price text is null for element:", element);
      }
    }

    return prices;
  }

  async getSubTotalSum() {
    let sum = 0;

    console.log("All prices: ", this.selectedItemPrices);

    for (const selectedItemPrice of this.selectedItemPrices)
      sum += selectedItemPrice;

    console.log("Sum: ", sum);

    return "Item total: $" + sum;
  }
}