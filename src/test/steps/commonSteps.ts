const { When } = require('@cucumber/cucumber');
import PageFactory from '../../../support/pageFactory';
import { globals } from '../../../support/globals';

const pageAddress = JSON.parse(JSON.stringify(require('../../../data/pages.json')));

When ('the user clicks the {string} button', async (button: string) => {
    switch (button) {
        case ("burger menu"):
            await PageFactory.inventoryPage.clickBurgerMenuButton();
        break;
        case ("checkout"):
            await PageFactory.cartPage.expectProductDetailsOnCartPage('quantity');
            await PageFactory.cartPage.expectProductDetailsOnCartPage('name');
            await PageFactory.cartPage.expectProductDetailsOnCartPage('description');
            await PageFactory.cartPage.expectProductDetailsOnCartPage('price');
            await PageFactory.cartPage.clickCheckoutButton();
            await PageFactory.commonPage.expectTheUrlIsCorrect(globals.url + pageAddress.checkoutStepOne);
        break;
        case ("continue"):
            await PageFactory.checkoutStepOnePage.clickContinueButton();
            await PageFactory.commonPage.expectTheUrlIsCorrect(globals.url + pageAddress.checkoutStepTwo);
        break;
        case ("finish"):
            await PageFactory.checkoutStepTwoPage.expectProductDetailsOnCheckoutStepTwoPage('quantity');
            await PageFactory.checkoutStepTwoPage.expectProductDetailsOnCheckoutStepTwoPage('name');
            await PageFactory.checkoutStepTwoPage.expectProductDetailsOnCheckoutStepTwoPage('description');
            await PageFactory.checkoutStepTwoPage.expectProductDetailsOnCheckoutStepTwoPage('price');
            await PageFactory.checkoutStepTwoPage.expectPaymentInformation();
            await PageFactory.checkoutStepTwoPage.expectShippingInformation();
            const priceArr = ['price', 'tax', 'total']
            priceArr.forEach(price => {
                PageFactory.checkoutStepTwoPage.expectPricesOnCheckoutStepTwoPage(price);
            });
            //await PageFactory.checkoutStepTwoPage.expectPricesOnCheckoutStepTwoPage('price');
            //await PageFactory.checkoutStepTwoPage.expectPricesOnCheckoutStepTwoPage('tax');
            //await PageFactory.checkoutStepTwoPage.expectPricesOnCheckoutStepTwoPage('total');
            await PageFactory.checkoutStepTwoPage.clickFinishButton();
            await PageFactory.commonPage.expectTheUrlIsCorrect(globals.url + pageAddress.checkoutComplete);
        break;
        case ("back home"):
            await PageFactory.checkoutCompletePage.expectTitleToContainText();
            await PageFactory.checkoutCompletePage.expectCompleteHeaderToContainText();
            await PageFactory.checkoutCompletePage.expectCompleteTextToContainText();
            await PageFactory.checkoutCompletePage.clickBackHomeButton();
            await PageFactory.commonPage.expectTheUrlIsCorrect(globals.url + pageAddress.inventory);
        break;
        default:
                throw new Error("The button name: " + button + " is not a valid option.");
    }
});
