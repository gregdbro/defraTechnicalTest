import PageFactory from '../support/pageFactory';
import { pageFixture } from '../support/pageFixture';
import { getByTestId } from '../support/helper';

const userDetails = JSON.parse(JSON.stringify(require('../data/userDetails.json')))

export class CheckoutStepOnePage {
    get elFirstNameInputField() { return getByTestId(pageFixture.page, 'firstName') }
    get elLastNameInputField() { return getByTestId(pageFixture.page, 'lastName') }
    get elPostCodeInputField() { return getByTestId(pageFixture.page, 'postalCode') }
    get elContinueButton() { return getByTestId(pageFixture.page, 'continue') }

    async fillFirstNameInputField() {
        await PageFactory.commonPage.fillInputField(this.elFirstNameInputField, userDetails.firstName);
    }

    async fillLastNameInputField() {
        await PageFactory.commonPage.fillInputField(this.elLastNameInputField, userDetails.lastName);
    }

    async fillPostCodeInputField() {
        await PageFactory.commonPage.fillInputField(this.elPostCodeInputField, userDetails.postCode);
    }

    async clickContinueButton() {
        await PageFactory.commonPage.basicClickAction(this.elContinueButton);
    }
}

module.exports = { CheckoutStepOnePage };
