
import Page from './page.js';
import Constants from './constants.js';

class CartPage extends Page {

    get cartTableHeaders() {
        return $(`//table[contains(@class, 'cart-items')]//thead`);
    }

    get cartTableRows() {
        return $(`//table[contains(@class, 'cart-items')]//tbody`);
    }

    get total() {
        return $(`//*[contains(@class,'total') and contains(text(), 'Total')]`);
    }

    async cartTableCell(col, row) {
        return await $(`//table[contains(@class, 'cart-items')]//tbody//tr[${row}]//td[${col}]`);
    }

    async verifySubtotals(orderContext) {
        for (const order in orderContext) {
            await this.#verifySubtotal(orderContext[order].itemName, orderContext[order].qty, orderContext[order].price);
        }
    }

    async verifyPrices(orderContext) {
        for (const order in orderContext) {
            await this.#verifyPrice(orderContext[order].itemName, orderContext[order].price);
        }
    }

    async verifyTotal(orderContext) {
        let expectedTotal = null;
        let actualTotal = await this.total.getText();
        for (let i = 0; i < orderContext.length; i++) {
            expectedTotal = expectedTotal + await this.#calculateSubtotal(orderContext[i].qty, orderContext[i].price);
        }

        await expect(parseFloat(actualTotal.replace('Total: ', ''))).toEqual(expectedTotal);
        console.log(`[PASSED] Total is displayed correctly. ${actualTotal}`);

    }

    async #verifySubtotal(itemName, qty, price) {
        let actualSubtotal = await this.getSubtotal(itemName);
        await expect(parseFloat(actualSubtotal.replace('$', ''))).toEqual(await this.#calculateSubtotal(qty, price));
        console.log(`[PASSED] Subtotal for ${itemName} is correct. Subtotal: ${actualSubtotal}`);
    }

    async #verifyPrice(itemName, expectedPrice) {
        let itemColumn = await this.#getTableColumnIndex('Item');
        let itemRow = await this.#getTableRowIndex(itemColumn, itemName);
        let cell = await this.#getTableCell('Price', itemRow);
        await expect(await cell).toHaveTextContaining(expectedPrice);
        console.log(`[PASSED] ${itemName} price is displayed correctly. Price: ${expectedPrice}`)
    }



    async #calculateSubtotal(qty, price) {
        return qty * parseFloat(price);
    }

    async #calculateTotal(qty, price) {
        return qty * parseFloat(price);
    }

    async getSubtotal(itemName) {
        let itemColumn = await this.#getTableColumnIndex('Item');
        let itemRow = await this.#getTableRowIndex(itemColumn, itemName);
        let cell = await this.#getTableCell('Subtotal', itemRow);
        return await cell.getText();
    }

    async #getTableCell(header, itemRow) {
        let priceColumn = await this.#getTableColumnIndex(header);
        let cell = await this.cartTableCell(priceColumn, itemRow);
        return cell;
    }

    async #getTableColumnIndex(headerName) {
        await this.cartTableHeaders.waitForDisplayed();
        let columns = await this.cartTableHeaders.$$('th');
        for (let i = 0; i < columns.length; i++) {
            if (await columns[i].getText() === headerName) {
                console.log(`${headerName} column found at index [${i + 1}]`);
                return i + 1;
            }
        }
    }

    async #getTableRowIndex(col, rowValue) {
        let rows = await this.cartTableRows.$$('tr');
        for (let i = 0; i < rows.length; i++) {
            let cell = await this.cartTableCell(col, i + 1);
            if (await cell.getText() === rowValue) {
                console.log(`${rowValue} row found at index [${i + 1}]`);
                return i + 1;
            }
        }
    }
}
export default new CartPage();