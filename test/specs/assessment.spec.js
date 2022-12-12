import HomePage from '../pageobjects/home.page.js'
import Navigation from '../pageobjects/navigation.js'
import ContactPage from '../pageobjects/contact.page.js';

describe('Isa Lynn Casiano - Planit Technical Assessment', () => {
    before(async () => {
        await HomePage.launchBrowser();
    });
    it('Test Case 1', async () => {
        await Navigation.navigateToMenu("nav-contact");
        await ContactPage.sumbitFeedback();
        await ContactPage.verifyRequiredFieldErrors();
    });
})

