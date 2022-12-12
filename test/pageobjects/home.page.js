
import Page from './page.js';

class HomePage extends Page {
    async launchBrowser() {
        return super.open(`http://jupiter.cloud.planittesting.com`);
    }
}
export default new HomePage();

