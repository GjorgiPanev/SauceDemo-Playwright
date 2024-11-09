import { test, expect} from '../basefixtures';
import * as fs from 'fs';
const data = JSON.parse(fs.readFileSync('../SauceDemo-Playwright/tests/fixtures/data/user.json',"utf-8"));

test.describe("First Test Suite for log in tests for Sauce Demo Page", () => {

    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    test('Log in Sauce demo page with valid username and password', async({logInPage})=>{
        await logInPage.enterUserName(data.username);
        await logInPage.enterPassword(data.password);
        await logInPage.clickOnLogInButton();
        await expect(logInPage.title).toHaveText('Swag Labs');
    });

    test.afterEach(async ({page}) => {
        await page.close();
    });
})