Feature: basic login test

Background:
    Given the user navigates to the Sauce Demos Swag Labs website

    @defraTestSuite @login
    Scenario Outline: attempt to login with the locked out user
        When the user inserts "<credentials>" credentials
        Then the user should receive the error message "<errorMessage>"

    Examples:
        |credentials    |errorMessage                                           |
        |Locked Out     |Epic sadface: Sorry, this user has been locked out.    |
