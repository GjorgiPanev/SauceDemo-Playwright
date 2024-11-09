import { type Locator, type Page } from '@playwright/test';

export class LogInPage{
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly title: Locator;

    constructor(page:Page){
        this.username = page.locator('#user-name');
        this.password = page.getByRole('textbox', {name: 'password'});
        this.loginButton = page.locator('#login-button');
        this.title = page.getByText('Swag Labs');
    }

    async enterUserName(username: string){
        await this.username.fill(username);
    }

    async enterPassword(password: string){
        await this.password.fill(password);
    }

    async clickOnLogInButton(){
        await this.loginButton.click();
    }
}