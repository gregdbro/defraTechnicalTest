Feature: basic checkout test

Background:
    Given the user navigates to the Sauce Demos Swag Labs website
    When the user inserts "Standard" credentials
    Then the user should be logged in successfully

    @defraTestSuite @checkout
    Scenario: successful checkout
    When the user adds the "Sauce Labs Backpack" product to cart
    And the user navigates to the cart
    And the user clicks the "checkout" button
    And the user inserts valid information
    And the user clicks the "continue" button
    And the user clicks the "finish" button
    Then the user clicks the "back home" button
