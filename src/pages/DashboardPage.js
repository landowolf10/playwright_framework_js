import { DashboardLocators } from "../locators/dashboard_locators.js";
import { BasePage } from "../helpers/BasePage.js";

//DashboardPage extends BasePage to use functionalities.
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
      ); //Gets each element text(name) from the list of product.

      const priceText = await this.getElementText(
        item.locator(this.dashboardLocators.productPrice)
      ); //Gets each element text(price) from the list of product.

      const price = parseFloat(priceText.replace("$", "").trim());

      products.push({
        name: name.trim(),
        price: price
      }); //Creates a list with all product names an its prices.
    }

    return products;
  }

  //Adds randomly a product to the cart.
  async addRandomProductToCart() {
    const addToCartButtons = await this.getAllElements(this.dashboardLocators.allProducts);

    if (addToCartButtons.length === 0) {
      throw new Error("No 'Add to cart' buttons found");
    }

    const randomIndex = Math.floor(Math.random() * addToCartButtons.length);
    const item = addToCartButtons[randomIndex];

    const name = await this.getElementText(item.locator(this.dashboardLocators.productName)); //Gets the name of the selected product.
    const priceText = await this.getElementText(item.locator(this.dashboardLocators.productPrice)); //Gets the price of the selected product.
    const button = item.locator(this.dashboardLocators.addToCartButton); //Gets the Add to cart button of the selected product.

    const price = parseFloat(priceText.replace("$", "").trim());

    await this.clickElement(button);

    return {
      name,
      price,
      button
    }; //returns the name, price and button of the
       //selected product to handle in steps.
  }
}