
import Page from './page.js';
import Constants from './constants.js';


class ContactPage extends Page {


    get successMessage() {
        return $(`//div[contains(@class, 'alert')]`);
    }

    async inlineError(inputElementId) {
        return await $(`//*[@id='${inputElementId}']//following-sibling::span`);
    }

    async modalHeader(header) {
        return await $(`//div[@class='modal-header']/*[contains(text(), '${header}')]`);
    }

    async sumbitFeedback() {
        let modal = await this.modalHeader('Sending Feedback');
        await this.clickElement(await this.button(Constants.SUBMIT));
        await modal.waitForDisplayed({ reverse: true });
    }

    async verifyRequiredFieldErrors(isDisplayed = true) {
        await this.verifyInlineError(Constants.FORENAME, isDisplayed);
        await this.verifyInlineError(Constants.EMAIL, isDisplayed);
        await this.verifyInlineError(Constants.MESSAGE, isDisplayed);
    }

    async verifyInlineError(textboxName, isDisplayed) {
        let inlineError = await this.inlineError(textboxName.toLowerCase());
        let expectedError = `${textboxName} is required`;
        if (isDisplayed) {
            await inlineError.waitForDisplayed();
            await expect(inlineError).toHaveText(expectedError);
            console.log(`[PASSED] In line error "${expectedError}" is displayed in ${textboxName} field.`);
        }
        else {
            await expect(inlineError).not.toBeDisplayed();
            console.log(`[PASSED] In line error "${expectedError}" is NOT displayed in ${textboxName} field.`);
        }
    }

    async populateFields(feedbackContexts) {
        await this.enterValue(await this.textbox('forename'), feedbackContexts.forename);
        await this.enterValue(await this.textbox('surname'), feedbackContexts.surname);
        await this.enterValue(await this.textbox('email'), feedbackContexts.email);
        await this.enterValue(await this.textbox('telephone'), feedbackContexts.telephone);
        await this.enterValue(await this.textarea('message'), feedbackContexts.message);
    }

    async verifySubmitFeedbackSuccess(forename) {
        let expectedMessage = `Thanks ${forename}, we appreciate your feedback.`;
        await expect(await this.successMessage).toHaveTextContaining(expectedMessage);
        console.log(`[PASSED] ${expectedMessage} is displayed.`);
    }
}
export default new ContactPage();