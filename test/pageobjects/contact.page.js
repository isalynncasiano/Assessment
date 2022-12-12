
import Page from './page.js';

class ContactPage extends Page {

    async inlineError(inputElementId){
        return await $(`//input[@id='${inputElementId}']//following-sibling::span']`);
    }

    async sumbitFeedback(){
        await this.clickElement(await this.button('Submit'));
    }

    async verifyInlineError(textboxName){
        let inlineError = await this.inlineError(textboxName)
        let expectedError = `${textboxName} is required.`
        await inlineError.waitForDisplayed();
        await expectedError(inlineError).toHaveText(expectedError);
        console.log(`In line error "${expectedError}" is displayed in ${textboxName} field.`)
    }

    async verifyRequiredFieldErrors(){
        await this.verifyInlineError("Forename");
        await this.verifyInlineError("Email");
        await this.verifyInlineError("Message");
    }

    async populateFields(feedbackContexts){
        await this.enterValue(await this.textbox('forname'), feedbackContexts.forename);
    }
}
export default new ContactPage();

