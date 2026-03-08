Feature: Checkout functionality

  Scenario Outline: Checkout
    Given I navigate to SauceLab
    When I enter "<userType>" credentials
    And I click the login button
    Then the login result should be "<result>"
    And all products should be displayed with valid name and price
    When I add a random product to the cart
    Then finish checkout and validation

  Examples:
    | userType  | result  |
    | standard  | success |