import PageFactory from '../support/pageFactory';
import { pageFixture } from '../support/pageFixture';
import { getByTestId } from '../support/helper';
import { globals } from '../support/globals';

export class LoginPage {
    get elUsernameInputField() { return getByTestId(pageFixture.page, 'username') }
    get elPasswordInputField() { return getByTestId(pageFixture.page, 'password') }
    get elLoginButton() { return getByTestId(pageFixture.page, 'login-button') }
    get elErrorMessageOutput() { return getByTestId(pageFixture.page, 'error') }

    async navigateToURL() {
        await pageFixture.page.goto(globals.url);
        await PageFactory.commonPage.expectTheUrlIsCorrect(globals.url);
    }

    async fillUsernameInputField(credentials: string) {
        const username = await PageFactory.commonPage.returnUserSelectedUsername(credentials);
        await PageFactory.commonPage.fillInputField(this.elUsernameInputField, username);
        await PageFactory.commonPage.expectElementToHaveValue(this.elUsernameInputField, username);
    }

    async fillPasswordInputField(credentials: string) {
        const password = await PageFactory.commonPage.returnUserSelectedPassword(credentials);
        await PageFactory.commonPage.fillInputField(this.elPasswordInputField, password);
        
        const inputValue = await this.elPasswordInputField.inputValue();
        const passwordLength = password.length;
        
        await PageFactory.commonPage.expectInputFieldToHaveLength(inputValue, passwordLength);
    }

    async clickLoginButton() {
        await PageFactory.commonPage.basicClickAction(this.elLoginButton);
    }

    async expectErrorMessageOutput(errorMessage: string) {
        await PageFactory.commonPage.expectElementToHaveText(this.elErrorMessageOutput, errorMessage);
    }
}

module.exports = { LoginPage };
