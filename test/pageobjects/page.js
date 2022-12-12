export default class Page {

    async button(buttonName) {
        return await $(`//a[contains(@class,'btn') and text()='${buttonName}']`);
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
            await element.click();
            console.log('Element is clicked.');
        } catch (error) {
            throw new Error(error);
        }
    }

    async enterValue(element, value) {
        await element.setValue(value);
        console.log(`${value} is entered`);
    }
}
