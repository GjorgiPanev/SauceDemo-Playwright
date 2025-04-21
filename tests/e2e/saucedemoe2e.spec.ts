import { test, expect} from '../basefixtures';
import * as fs from 'fs';
const data1 = JSON.parse(fs.readFileSync('../SauceDemo-Playwright/tests/fixtures/data/user.json',"utf-8"));

test.describe("Test Suite for Sauce Demo", () => {

    test.beforeEach(async ({page}) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test('Add item and verify the name is the same with the item in the cart', async({logInPage, homePage, cartPage})=>{
        await logInPage.logInSauceDemo(data1.username, data1.password);
        await expect(logInPage.title).toHaveText('Swag Labs');
        await homePage.clickOnAddToCart(0);
        const nameOfTheProduct = await homePage.productName.nth(0).textContent();
        await expect.soft(homePage.cartItemsNumber).toHaveCount(1);
        await homePage.clickOnCart();
        const numberOfItem = await homePage.numberOfItemsInTheCart.count();
        await expect.soft(numberOfItem).toEqual(1);
        await expect.soft(await homePage.productName.nth(0).textContent()).toContain(nameOfTheProduct);
        await cartPage.clickOnCheckoutBtn();
        await expect(cartPage.titleConfirm).toHaveText('Checkout: Your Information');
        await cartPage.enterFirstName("Gjorgi");
        await cartPage.enterLastName("Hello");
        await cartPage.enterZipCode("1000");
        await cartPage.clickOnContinueBtn();
        await expect(cartPage.titleOverview).toHaveText('Checkout: Overview');
        await expect.soft(await cartPage.productName.nth(0).textContent()).toContain(nameOfTheProduct);
        await cartPage.clickOnFinishBtn();
        await logInPage.clickOnMenu();
        await logInPage.clickOnLogOut();
        await expect(logInPage.title).toHaveText('Swag Labs');
    });

    test.afterEach(async ({page}) => {
        await page.close();
    });

});