import { DashboardLocators } from "../locators/dashboard_locators.js";
import { BasePage } from "../helpers/BasePage.js";
import { logger } from "../helpers/logger.js";

//LoginPage extends BasePage to use functionalities.
export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.dashboardLocators = new DashboardLocators();
  }

  //Gets all the products of the main page
  //by using the getAllElements function from BasePage.
  async getAllProducts() {
    const products = [];
    const items = await this.getAllElements(this.dashboardLocators.allProducts);

    for (const item of items) {
      const name = await this.getElementText(
        item.locator(this.dashboardLocators.productName)
      );

      const priceText = await this.getElementText(
        item.locator(this.dashboardLocators.productPrice)
      );

      const price = parseFloat(priceText.replace("$", "").trim());

      products.push({
        name: name.trim(),
        price: price
      });
    }

    logger.info("All products:", products);

    return products;
  }

  async addRandomProductToCart() {
    const addToCartButtons = await this.getAllElements(this.dashboardLocators.allProducts);

    if (addToCartButtons.length === 0) {
      throw new Error("No 'Add to cart' buttons found");
    }

    const randomIndex = Math.floor(Math.random() * addToCartButtons.length);
    const item = addToCartButtons[randomIndex];

    const name = await this.getElementText(item.locator(this.dashboardLocators.productName));
    const priceText = await this.getElementText(item.locator(this.dashboardLocators.productPrice));
    const button = item.locator(this.dashboardLocators.addToCartButton);

    const price = parseFloat(priceText.replace("$", "").trim());

    await this.clickElement(button);

    console.log(`Added product: ${name} | price: ${price}`);

    return {
      name,
      price,
      button
    };
  }
}