import type { Page, Locator } from '@playwright/test';

export function getByTestId(page: Page, testId: string): Locator {
    return page.locator(`[data-test="${testId}"]`);
}

export function removeNotDigitsDecimalPointsOrMinus(stringValue: string) {
    return stringValue.replace(/[^0-9.-]+/g, '');
}

export function addCurrencyValues(a: string, b: string) {
  const inputA = parseFloat(removeNotDigitsDecimalPointsOrMinus(a));
  const inputB = parseFloat(removeNotDigitsDecimalPointsOrMinus(b));
  
  return inputA + inputB;
}

export function addCurrencyFormattedToTwoDecimals(a: string, b: string, currency: string): string {
  const sum = addCurrencyValues(a, b);
  return `${currency}${sum.toFixed(2)}`;
}
