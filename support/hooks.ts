const { AfterAll, After, Before, BeforeAll, Status } = require('@cucumber/cucumber');
import { Browser, BrowserContext, chromium } from '@playwright/test';
import { pageFixture } from './pageFixture';
import { getEnvironment } from '../env/env';
import { globals } from '../support/globals';

let browser: Browser;
let browserContext: BrowserContext;

BeforeAll({ timeout: 60 * globals.second }, async () => {
    getEnvironment();
    globals.url = `${process.env.BASE_URL}`;

    if (process.platform.includes('win')) {
        globals.headlessBool = false;
    } else {
        globals.headlessBool = true;
    }

    browser = await chromium.launch({ 
        headless: globals.headlessBool,
        args: ['--start-maximized']
    });
})

Before(async () => {
    browserContext = await browser.newContext({ viewport: null });
    pageFixture.page = await browserContext.newPage();
});

After(async function ({ pickle, result }: any) {
    if (result.status == Status.FAILED) {
        await pageFixture.page.screenshot({
            path: `./test-result/screenshots/${pickle.name}.png`,
            type: 'png',
            fullPage: true
        });

        console.error(`Scenario failed: ${pickle.name} with exception message: ${result.exception.message}`);
    }

    await pageFixture.page.close();
    await browserContext.close();
});

AfterAll(async () => {
    await browser.close();
});

export { pageFixture };
