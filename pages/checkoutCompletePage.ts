import PageFactory from '../support/pageFactory';
import { pageFixture } from '../support/pageFixture';
import { getByTestId } from '../support/helper';

export class CheckoutCompletePage {
    get elTitle() { return getByTestId(pageFixture.page, 'title') }
    get elCompleteHeader() { return getByTestId(pageFixture.page, 'complete-header') }
    get elCompleteText() { return getByTestId(pageFixture.page, 'complete-text') }
    get elBackHomeButton() { return getByTestId(pageFixture.page, 'back-to-products') }

    async expectTitleToContainText() {
        await PageFactory.commonPage.expectElementToContainText(this.elTitle, 'Checkout: Complete!');
    }

    async expectCompleteHeaderToContainText() {
        await PageFactory.commonPage.expectElementToContainText(this.elCompleteHeader, 'Thank you for your order!');
    }

    async expectCompleteTextToContainText() {
        await PageFactory.commonPage.expectElementToContainText(this.elCompleteText, 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    }

    async clickBackHomeButton() {
        await PageFactory.commonPage.basicClickAction(this.elBackHomeButton);
    }
}

module.exports = { CheckoutCompletePage };
