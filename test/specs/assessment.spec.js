import Constants from '../pageobjects/constants.js';
import ContactPage from '../pageobjects/contact.page.js';
import HomePage from '../pageobjects/home.page.js';
import Navigation from '../pageobjects/navigation.js';
import OrderpPage from '../pageobjects/order.page.js';

describe('Isa Lynn Casiano - Planit Technical Assessment', () => {
    before(async () => {
        await HomePage.launchBrowser();
    });

    afterEach(async () => {
        await Navigation.navigateToMenu(Constants.NAV_HOME);
    });

    it('Test Case 1', async () => {

        let feedbackContexts = {
            forename: 'Isa Lynn',
            surname: '',
            email: 'isalynn.casiano@example.com',
            telephone: '0212345678',
            message: 'This is test message'
        }

        await Navigation.navigateToMenu(Constants.NAV_CONTACT);
        await ContactPage.sumbitFeedback();
        await ContactPage.verifyRequiredFieldErrors();
        await ContactPage.populateFields(feedbackContexts);
        await ContactPage.sumbitFeedback();
        await ContactPage.verifyRequiredFieldErrors(false);

    });

    it('Test Case 2', async () => {

        let feedbackContexts = {
            forename: 'Isa Lynn',
            surname: '',
            email: 'isalynn.casiano@example.com',
            telephone: '0212345678',
            message: 'This is test message'
        }

        let attempts = 5;
        for (let index = 0; index < attempts; index++) {
            console.log(`Attempt: ${index + 1}`)
            await Navigation.navigateToMenu(Constants.NAV_CONTACT);
            await ContactPage.populateFields(feedbackContexts);
            await ContactPage.sumbitFeedback();
            await ContactPage.verifySubmitFeedbackSuccess(feedbackContexts.forename);
            await Navigation.navigateToMenu(Constants.NAV_HOME);
        }
    });

    it('Test Case 3', async () => {

        let orderContext = [
            { itemName: 'Stuffed Frog', qty: '2' },
            { itemName: 'Fluffy Bunny', qty: '5' },
            { itemName: 'Valentine Bear', qty: '3' }
        ]

        await Navigation.navigateToMenu(Constants.NAV_SHOP);
        await OrderpPage.buyItem('Stuffed Frog', 2);
        await OrderpPage.buyItem('Fluffy Bunny', 5);
        await OrderpPage.buyItem('Valentine Bear', 3);
    });
})
