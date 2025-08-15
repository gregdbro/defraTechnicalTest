import PageFactory from '../support/pageFactory';
import { pageFixture } from '../support/pageFixture';
import { getByTestId } from '../support/helper';

export class InventoryPage {
    get elAddBackpackToCartButton() { return getByTestId(pageFixture.page, 'add-to-cart-sauce-labs-backpack') }
    get elAddBikeLightToCartButton() { return getByTestId(pageFixture.page, 'add-to-cart-sauce-labs-bike-light') }
    get elAddBoltTShirtToCartButton() { return getByTestId(pageFixture.page, 'add-to-cart-sauce-labs-bolt-t-shirt') }
    get elAddFleeceToCartButton() { return getByTestId(pageFixture.page, 'add-to-cart-sauce-labs-fleece-jacket') }
    get elAddOnesieToCartButton() { return getByTestId(pageFixture.page, 'add-to-cart-sauce-labs-onesie') }
    get elAddRedTShirtToCartButton() { return getByTestId(pageFixture.page, 'add-to-cart-test.allthethings()-t-shirt-(red)') }
    get elShoppingCartBadge() { return getByTestId(pageFixture.page, 'shopping-cart-badge') }
    get elShoppingCartLink() { return getByTestId(pageFixture.page, 'shopping-cart-link') }
    get elBurgerMenuButton() { return pageFixture.page.locator('#react-burger-menu-btn') }
    get elLogoutLink() { return getByTestId(pageFixture.page, 'logout-sidebar-link') }

    async clickAddBackpackToCartButton() {
        await PageFactory.commonPage.basicClickAction(this.elAddBackpackToCartButton);
    }

    async clickAddBikeLightToCartButton() {
        await PageFactory.commonPage.basicClickAction(this.elAddBikeLightToCartButton);
    }

    async clickAddBoltTShirtToCartButton() {
        await PageFactory.commonPage.basicClickAction(this.elAddBoltTShirtToCartButton);
    }

    async clickAddFleeceToCartButton() {
        await PageFactory.commonPage.basicClickAction(this.elAddFleeceToCartButton);
    }

    async clickAddOnesieToCartButton() {
        await PageFactory.commonPage.basicClickAction(this.elAddOnesieToCartButton);
    }

    async clickAddRedTShirtToCartButton() {
        await PageFactory.commonPage.basicClickAction(this.elAddRedTShirtToCartButton);
    }

    async expectTheProductCountToEqual() {
        await PageFactory.commonPage.expectElementToContainText(this.elShoppingCartBadge, "1");
    }

    async clickShoppingCartLink() {
        await PageFactory.commonPage.basicClickAction(this.elShoppingCartLink);
    }

    async clickBurgerMenuButton() {
        await PageFactory.commonPage.basicClickAction(this.elBurgerMenuButton);
    }

    async clickLogoutLink() {
        await PageFactory.commonPage.basicClickAction(this.elLogoutLink);
    }
}

module.exports = { InventoryPage };
