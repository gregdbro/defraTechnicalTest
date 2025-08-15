const { expect } = require('@playwright/test');
import { pageFixture } from '../support/pageFixture';
import { globals } from '../support/globals';
import { addCurrencyFormattedToTwoDecimals } from '../support/helper';

const products = JSON.parse(JSON.stringify(require('../data/products.json')))

export class CommonPage {
    async expectTheUrlIsCorrect(url: any) {
        await pageFixture.page.waitForURL(url);
        await expect(pageFixture.page).toHaveURL(url);
    }

    async expectElementIsVisible(element: any) {
        await element.waitFor();
        await expect(element).toBeVisible();
        await element.scrollIntoViewIfNeeded();
    }

    async basicClickAction(element: any) {
        await this.expectElementIsVisible(element);
        await element.click(element);
    }

    async fillInputField(element: any, text: any) {
        await this.expectElementIsVisible(element);
        await expect(element).toBeEditable();
        await element.clear();
        await element.fill(text);
    }

    async expectElementToHaveValue(element: any, value: any) {
        await expect(element).toHaveValue(value);
    };

    async expectElementToHaveText(element: any, text: any) {
        await expect(element).toHaveText(text);
    };

    async expectElementToContainText(element: any, text: any) {
        await expect(element).toContainText(text);
    };

    async expectInputFieldToHaveLength(element: any, text: any) {
        expect((await element).length).toBe(text);
    };

    async returnUserSelectedUsername(credentials: string) {
        let username;
        switch (credentials) {
            case('Standard'):
                username = `${process.env.STANDARD_USER}`;
            break;
            case('Locked Out'):
                username = `${process.env.LOCKED_OUT_USER}`;
            break;
            case('Problem'):
                username = `${process.env.PROBLEM_USER}`;
            break;
            case('Performance Glitch'):
                username = `${process.env.PERFORMANCE_GLITCH_USER}`;
            break;
            case('Error'):
                username = `${process.env.ERROR_USER}`;
            break;
            case('Visual'):
                username = `${process.env.VISUAL_USER}`;
            break;
            default:
                throw new Error("The Feature file mentions: " + credentials + " which is not valid.");
        }

        return username;
    }

    async returnUserSelectedPassword(credentials: string) {
        let password;
        switch (credentials) {
            case('Standard'):
                password = `${process.env.STANDARD_PASSWORD}`;
            break;
            case('Locked Out'):
                password = `${process.env.LOCKED_OUT_PASSWORD}`;
            break;
            case('Problem'):
                password = `${process.env.PROBLEM_PASSWORD}`;
            break;
            case('Performance Glitch'):
                password = `${process.env.PERFORMANCE_GLITCH_PASSWORD}`;
            break;
            case('Error'):
                password = `${process.env.ERROR_PASSWORD}`;
            break;
            case('Visual'):
                password = `${process.env.VISUAL_PASSWORD}`;
            break;
            default:
                throw new Error("The Feature file mentions: " + credentials + " which is not valid.");
        }

        return password;
    }

    async returnProductValue(fieldName: string) {
        const removeSpacesFromProduct = globals.product.replace(/\s+/g, '');
        const decaptialiseLeadingCharFromProduct =  removeSpacesFromProduct.charAt(0).toLowerCase() + removeSpacesFromProduct.slice(1);
        const productValue = products[decaptialiseLeadingCharFromProduct][fieldName];
        return productValue;
    }

    async expectProductDetailsOnPage(fieldName: string, element: any) {    
        const productValue = await this.returnProductValue(fieldName);

        switch (fieldName) {
            case ('quantity'):
            case ('name'):
            case ('description'):
            case ('price'):
                await this.expectElementToHaveText(element, productValue);
            break;
            default:
                throw new Error("The input field name: " + fieldName + " is not a valid option.");
        }
    }

    async expectPricesOnPage(fieldName: string, element: any) {
        const productValue = await this.returnProductValue(fieldName);
        
        switch (fieldName) {
            case ('price'):
            case ('tax'):
                await this.expectElementToContainText(element, productValue);
            break;
            case ('total'):
                const totalPrice = await this.calculateTotalPrice();
                await this.expectElementToContainText(element, totalPrice);
            break;
            default:
                throw new Error("The input field name: " + fieldName + " is not a valid option.");
        }
    }

    async calculateTotalPrice() {
        const priceValue = await this.returnProductValue('price');
        const taxValue = await this.returnProductValue('tax');

        const priceCurrency = priceValue.charAt(0);
        const taxCurrency = taxValue.charAt(0);
        let totalPrice;

        if (priceCurrency == taxCurrency) {
            totalPrice = addCurrencyFormattedToTwoDecimals(priceValue, taxValue, priceCurrency);
        } else if (priceCurrency != taxCurrency) {
            throw new Error("Error: there is a currency mismatch between the Price and Tax fields");
        }

        return totalPrice;
    }
}

module.exports = { CommonPage };
