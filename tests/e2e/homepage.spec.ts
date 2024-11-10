import { test, expect} from '../basefixtures';
import * as fs from 'fs';
const data1 = JSON.parse(fs.readFileSync('../SauceDemo-Playwright/tests/fixtures/data/user.json',"utf-8"));

test.describe("Second Test Suite- test for Home page of Sauce Demo Page", () => {

    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    test('Check if there are products on the Home Page', async({logInPage, homePage})=>{
        await logInPage.logInSauceDemo(data1.username, data1.password);
        await expect(logInPage.title).toHaveText('Swag Labs');
        const products = await homePage.products.count();
        await expect(products).toBeGreaterThanOrEqual(1);
    });

    test('Add one item to the cart', async({logInPage, homePage})=>{
        await logInPage.logInSauceDemo(data1.username, data1.password);
        await expect(logInPage.title).toHaveText('Swag Labs');
        const products = await homePage.products.count();
        await expect(products).toBeGreaterThanOrEqual(1);
        await homePage.clickOnAddToCart(0);
        await expect(homePage.cartItemsNumber).toHaveCount(1);
    });

    test('Add two items to the cart', async({logInPage, homePage})=>{
        await logInPage.logInSauceDemo(data1.username, data1.password);
        await expect(logInPage.title).toHaveText('Swag Labs');
        await homePage.clickOnAddToCart(2);
        await homePage.clickOnAddToCart(0);
        await expect(homePage.cartItemsNumber).toHaveText('2');
    });

    test('Add item, remove it and verify it is removed', async({logInPage, homePage})=>{
        await logInPage.logInSauceDemo(data1.username, data1.password);
        await expect(logInPage.title).toHaveText('Swag Labs');
        await homePage.clickOnAddToCart(1);
        await expect(homePage.cartItemsNumber).toHaveCount(1);
        await homePage.clickOnRemove(0);
        await expect(homePage.cartItemsNumber).toHaveCount(0);
    });

    test('Add two items and remove it',{tag: '@smoke'}, async({logInPage, homePage})=>{
        await logInPage.logInSauceDemo(data1.username, data1.password);
        await expect(logInPage.title).toHaveText('Swag Labs');
        await homePage.clickOnAddToCart(1);
        await homePage.clickOnAddToCart(2);
        await expect(homePage.cartItemsNumber).toHaveText('2');
        await homePage.clickOnRemove(0);
        await homePage.clickOnRemove(0);
        await expect(homePage.cartItemsNumber).toHaveCount(0);
    });

    test('Add item and verify the name is the same with the item in the cart', async({logInPage, homePage})=>{
        await logInPage.logInSauceDemo(data1.username, data1.password);
        await expect(logInPage.title).toHaveText('Swag Labs');
        await homePage.clickOnAddToCart(0);
        const nameOfTheProduct = await homePage.productName.nth(0).textContent();
        await expect.soft(homePage.cartItemsNumber).toHaveCount(1);
        await homePage.clickOnCart();
        const numberOfItem = await homePage.numberOfItemsInTheCart.count();
        await expect.soft(numberOfItem).toEqual(1);
        await expect.soft(await homePage.productName.nth(0).textContent()).toContain(nameOfTheProduct);
    });

    test.afterEach(async ({page}) => {
        await page.close();
    });
    
});