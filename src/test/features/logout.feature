Feature: basic logout test

Background:
    Given the user navigates to the Sauce Demos Swag Labs website
    When the user inserts "Standard" credentials
    Then the user should be logged in successfully

    @defraTestSuite @logout
    Scenario: user logs out of Swag Labs
    When the user clicks the "burger menu" button
    And the user clicks the logout link
    Then the user should be successfully logged out
