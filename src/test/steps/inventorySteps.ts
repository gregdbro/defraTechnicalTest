const { Then, When } = require('@cucumber/cucumber');
import PageFactory from '../../../support/pageFactory';
import { globals } from '../../../support/globals';

const pageAddress = JSON.parse(JSON.stringify(require('../../../data/pages.json')));
const products = JSON.parse(JSON.stringify(require('../../../data/products.json')));

Then ('the user should be logged in successfully', { timeout: 20 * globals.second }, async () => {
    await PageFactory.commonPage.expectTheUrlIsCorrect(globals.url + pageAddress.inventory);
});

When ('the user adds the {string} product to cart', async (product: string) => {
    switch (product) {
        case (products.sauceLabsBackpack.name):
            await PageFactory.inventoryPage.clickAddBackpackToCartButton();
        break;
        case (products.sauceLabsBikeLight.name):
            await PageFactory.inventoryPage.clickAddBikeLightToCartButton();
        break;
        case (products.sauceLabsBoltTShirt.name):
            await PageFactory.inventoryPage.clickAddBoltTShirtToCartButton();
        break;
        case (products.sauceLabsFleeceJacket.name):
            await PageFactory.inventoryPage.clickAddFleeceToCartButton();
        break;
        case (products.sauceLabsOnesie.name):
            await PageFactory.inventoryPage.clickAddOnesieToCartButton();
        break;
        case (products.sauceLabsRedTShirt.name):
            await PageFactory.inventoryPage.clickAddRedTShirtToCartButton();
        break;
        default:
            throw new Error("The product: " + product + " does not exist on the Swag Labs Products page.");
    }

    globals.product = product;

    await PageFactory.inventoryPage.expectTheProductCountToEqual();
});

When ('the user navigates to the cart', async () => {
    await PageFactory.inventoryPage.clickShoppingCartLink();
    await PageFactory.commonPage.expectTheUrlIsCorrect(globals.url + pageAddress.cart);
});

When ('the user clicks the logout link', async () => {
    await PageFactory.inventoryPage.clickLogoutLink();
});
