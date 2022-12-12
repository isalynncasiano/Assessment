export default class Page {

    async button(buttonName) {
        return await $(`//a[contains(@class,'btn') and text()='${buttonName}']`);
    }

    async textbox(inputElementId) {
        return await $(`//input[@id='${inputElementId}']`);
    }

    async textarea(textareaElementId) {
        return await $(`//textarea[@id='${textareaElementId}']`);
    }

    async open(path) {
        try {
            await browser.maximizeWindow()
            console.log(`Launching ${path}`)
            return browser.url(path)
        } catch (error) {
            throw new Error(error);
        }
    }

    async clickElement(element) {
        try {
            await element.waitForClickable();
            await element.click();
            console.log('Element is clicked.');
        } catch (error) {
            throw new Error(error);
        }
    }

    async enterValue(element, value) {
        try {
            await element.waitForClickable();
            await element.setValue(value);
            console.log(`"${value}" is entered`);
        } catch (error) {
            throw new Error(error);
        }

    }
}