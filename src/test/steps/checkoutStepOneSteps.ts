const { When } = require('@cucumber/cucumber');
import PageFactory from '../../../support/pageFactory';

When ('the user inserts valid information', async () => {
    await PageFactory.checkoutStepOnePage.fillFirstNameInputField();
    await PageFactory.checkoutStepOnePage.fillLastNameInputField();
    await PageFactory.checkoutStepOnePage.fillPostCodeInputField();
});
