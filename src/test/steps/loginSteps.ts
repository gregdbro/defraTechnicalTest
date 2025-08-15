const { Given, When, Then } = require('@cucumber/cucumber');
import PageFactory from '../../../support/pageFactory';
import { globals } from '../../../support/globals';

Given ('the user navigates to the Sauce Demos Swag Labs website', { timeout: 60 * globals.second }, async () => {
    await PageFactory.loginPage.navigateToURL();
});

When ('the user inserts {string} credentials', async (credentials: string) => {
    await PageFactory.loginPage.fillUsernameInputField(credentials);
    await PageFactory.loginPage.fillPasswordInputField(credentials);
    await PageFactory.loginPage.clickLoginButton();
});

Then ('the user should be successfully logged out', async () => {
    await PageFactory.commonPage.expectTheUrlIsCorrect(globals.url);
});

Then ('the user should receive the error message {string}', async (errorMessage: string) => {
    await PageFactory.loginPage.expectErrorMessageOutput(errorMessage);
});
