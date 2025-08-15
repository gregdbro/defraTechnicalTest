import { CartPage } from '../pages/cartPage';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';
import { CheckoutStepOnePage } from '../pages/checkoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/checkoutStepTwoPage';
import { CommonPage } from '../pages/commonPage';
import { InventoryPage } from '../pages/inventoryPage';
import { LoginPage } from '../pages/loginPage';

export default class PageFactory {
    static cartPage = new CartPage();
    static checkoutCompletePage = new CheckoutCompletePage();
    static checkoutStepOnePage = new CheckoutStepOnePage();
    static checkoutStepTwoPage = new CheckoutStepTwoPage();
    static commonPage = new CommonPage();
    static inventoryPage = new InventoryPage();
    static loginPage = new LoginPage();
}

module.exports = PageFactory;
