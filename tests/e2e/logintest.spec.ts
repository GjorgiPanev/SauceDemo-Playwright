import { test, expect} from '../basefixtures';
import * as fs from 'fs';
const data = JSON.parse(fs.readFileSync('../SauceDemo-Playwright/tests/fixtures/data/users.json',"utf-8"));
const data1 = JSON.parse(fs.readFileSync('../SauceDemo-Playwright/tests/fixtures/data/user.json',"utf-8"));

test.describe("First Test Suite for log in tests for Sauce Demo Page", () => {

    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    test('Log in Sauce demo page with valid username and password', async({logInPage})=>{
        await logInPage.enterUserName(data1.username);
        await logInPage.enterPassword(data1.password);
        await logInPage.clickOnLogInButton();
        await expect(logInPage.title).toHaveText('Swag Labs');
    });

    data.forEach((user)=>{
        test(`test ${user.username}`, async({page, logInPage})=>{
            //await page.goto('/');
            await logInPage.enterUserName(user.username);
            await logInPage.enterPassword(user.password);
            await logInPage.clickOnLogInButton();
        });
    });

    test.afterEach(async ({page}) => {
        await page.close();
    });
});



