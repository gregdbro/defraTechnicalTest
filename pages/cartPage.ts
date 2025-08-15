import PageFactory from '../support/pageFactory';
import { pageFixture } from '../support/pageFixture';
import { getByTestId } from '../support/helper';

export class CartPage {
    get elItemQuantity() { return getByTestId(pageFixture.page, 'item-quantity') }
    get elInventoryItemName() { return getByTestId(pageFixture.page, 'inventory-item-name') }
    get elInventoryItemDescription() { return getByTestId(pageFixture.page, 'inventory-item-desc') }
    get elInventoryItemPrice() { return getByTestId(pageFixture.page, 'inventory-item-price') }
    get elCheckoutButton() { return getByTestId(pageFixture.page, 'checkout') }

    async expectProductDetailsOnCartPage(fieldName: string) {
        switch (fieldName) {
            case ('quantity'):
                await PageFactory.commonPage.expectProductDetailsOnPage(fieldName, this.elItemQuantity);
            break;
            case ('name'):
                await PageFactory.commonPage.expectProductDetailsOnPage(fieldName, this.elInventoryItemName);
            break;
            case ('description'):
                await PageFactory.commonPage.expectProductDetailsOnPage(fieldName, this.elInventoryItemDescription);
            break;
            case ('price'):
                await PageFactory.commonPage.expectProductDetailsOnPage(fieldName, this.elInventoryItemPrice);
            break;
            default:
                throw new Error("The input field name: " + fieldName + " is not a valid option.");
        }
    }

    async clickCheckoutButton() {
        await PageFactory.commonPage.basicClickAction(this.elCheckoutButton);
    }
}

module.exports = { CartPage };
