import { type Locator, type Page } from '@playwright/test';


export class HomePage{
    readonly products:Locator;
    readonly addToCart:Locator;
    readonly cart:Locator;
    readonly search:Locator;
    readonly cartItemsNumber:Locator;
    readonly removeItem:Locator;
    readonly productName:Locator;
    readonly numberOfItemsInTheCart:Locator;

    constructor(page:Page){
        this.products = page.locator('.inventory_item');
        this.addToCart = page.getByText('Add to cart');
        this.cart = page.locator('#shopping_cart_container');
        this.search = page.locator('[data-test=\"product-sort-container\"]');
        this.cartItemsNumber = page.locator('.shopping_cart_badge');
        this.removeItem = page.getByText('Remove');
        this.productName = page.locator('.inventory_item_name');
        this.numberOfItemsInTheCart = page.locator('.cart_item');
    }

    async clickOnAddToCart(index:number){
        await this.addToCart.nth(index).click();
    }

    async clickOnCart(){
        await this.cart.click();
    }

    async clickOnRemove(index:number){
        await this.removeItem.nth(index).click();
    }
}