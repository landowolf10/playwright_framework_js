export class DashboardLocators {
  constructor() {
    // Static locators
    this.productPrice = "//div[@class='inventory_item_price']";
    this.sortDropDown = "//select[@data-test='product-sort-container']";
    this.cartIcon = "//a[@class='shopping_cart_link']";

    // Example button locator
    this.addToCartButton = "//button[normalize-space()='Add to cart']";
  }

  // Dynamic locator example
  productPriceByProductName(productName) {
    return `//div[@class='inventory_item'][.//div[text()='${productName}']]//div[@class='inventory_item_price']`;
  }

  addToCartButtonByProductName(productName) {
    return `//div[@class='inventory_item'][.//div[text()='${productName}']]//button[contains(text(),'Add to cart')]`;
  }

}