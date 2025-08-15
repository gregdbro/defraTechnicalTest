import PageFactory from '../support/pageFactory';
import { pageFixture } from '../support/pageFixture';
import { getByTestId } from '../support/helper';

const checkoutOverview = JSON.parse(JSON.stringify(require('../data/checkoutOverview.json')))

export class CheckoutStepTwoPage {
    get elItemQuantity() { return getByTestId(pageFixture.page, 'item-quantity') }
    get elInventoryItemName() { return getByTestId(pageFixture.page, 'inventory-item-name') }
    get elInventoryItemDescription() { return getByTestId(pageFixture.page, 'inventory-item-desc') }
    get elInventoryItemPrice() { return getByTestId(pageFixture.page, 'inventory-item-price') }
    get elPaymentInfoValue() { return getByTestId(pageFixture.page, 'payment-info-value') }
    get elShippingInfoValue() { return getByTestId(pageFixture.page, 'shipping-info-value') }
    get elSubtotalLabel() { return getByTestId(pageFixture.page, 'subtotal-label') }
    get elTaxLabel() { return getByTestId(pageFixture.page, 'tax-label') }
    get elTotalLabel() { return getByTestId(pageFixture.page, 'total-label') }
    get elFinishButton() { return getByTestId(pageFixture.page, 'finish') }

    async expectProductDetailsOnCheckoutStepTwoPage(fieldName: string) {
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

    async expectPaymentInformation() {
        await PageFactory.commonPage.expectElementToHaveText(this.elPaymentInfoValue, checkoutOverview.paymentInformation);
    }

    async expectShippingInformation() {
        await PageFactory.commonPage.expectElementToHaveText(this.elShippingInfoValue, checkoutOverview.shippingInformation);
    }

    async expectPricesOnCheckoutStepTwoPage(fieldName: string) {
        switch (fieldName) {
            case ('price'):
                await PageFactory.commonPage.expectPricesOnPage(fieldName, this.elSubtotalLabel);
            break;
            case ('tax'):
                await PageFactory.commonPage.expectPricesOnPage(fieldName, this.elTaxLabel);
            break;
            case ('total'):
                await PageFactory.commonPage.expectPricesOnPage(fieldName, this.elTotalLabel);
            break;
            default:
                throw new Error("The input field name: " + fieldName + " is not a valid option.");
        }
    }

    async clickFinishButton() {
        await PageFactory.commonPage.basicClickAction(this.elFinishButton);
    }
}

module.exports = { CheckoutStepTwoPage };
