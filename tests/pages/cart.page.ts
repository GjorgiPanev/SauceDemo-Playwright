import { type Locator, type Page } from '@playwright/test';

export class CartPage{
    readonly checkoutBtn: Locator;
    readonly titleConfirm: Locator;
    readonly firstName: Locator;
    readonly lastName:Locator;
    readonly zipCode:Locator;
    readonly continueBtn:Locator;
    readonly finishBtn:Locator;
    readonly titleOverview:Locator;
    readonly productName: Locator;


    constructor(page:Page){
        this.checkoutBtn = page.locator('#checkout');
        this.titleConfirm = page.getByText('Checkout: Your Information');
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.zipCode = page.locator('#postal-code');
        this.continueBtn = page.locator('#continue');
        this.finishBtn = page.locator('#finish');
        this.titleOverview = page.getByText('Checkout: Overview');
        this.productName = page.locator('.inventory_item_name');

    }

    async clickOnCheckoutBtn(){
        await this.checkoutBtn.click();
    }

    async enterFirstName(firstname: string){
        await this.firstName.fill(firstname);
    }

    async enterLastName(lastname: string){
        await this.lastName.fill(lastname);
    }

    async enterZipCode(zipCode: string){
        await this.zipCode.fill(zipCode);
    }

    async clickOnContinueBtn(){
        await this.continueBtn.click();
    }

    async clickOnFinishBtn(){
        await this.finishBtn.click();
    }
}