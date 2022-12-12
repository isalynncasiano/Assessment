
import Page from './page.js';

class Navigation extends Page {

    async navigationMenu(menu) {
        return await $(`//ul[contains(@class, "nav")]//li[@id="${menu}"]//a`);
    }

    async navigateToMenu(menu) {
        let navMenu = await this.navigationMenu(menu);
        await navMenu.waitForClickable();
        await this.clickElement(navMenu);
        console.log(`Navigated to ${menu}`);
    }

    async verifyPageIsNavigated(page) {
        await expect(browser).toHaveUrlContaining(page);
        console.log(`Navigated to ${page} page.`);
    }

}
export default new Navigation();