
import Page from './page.js';
import Constants from './constants.js';

class OrderPage extends Page {

    async buyButton(itemName){
        return await $(`//a[contains(@class,'btn') and text()='Buy' and parent::*//preceding-sibling::h4[text()='${itemName}']]`);
    }
    
    async buyItem(itemName, qty){
        for (let i = 0; i < qty; i++) {
            await this.clickElement(await this.buyButton(itemName));
            console.log(`Added ${itemName} to cart`);
        }
        console.log(`Added a total of ${qty} ${itemName} to cart`);
    }
}
export default new OrderPage();