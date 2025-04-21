import { type Locator, type Page } from '@playwright/test';

export class LogInPage{
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly title: Locator;
    readonly hamburgerMenu:Locator;
    readonly logOut:Locator;

    constructor(page:Page){
        this.username = page.locator('#user-name');
        this.password = page.getByRole('textbox', {name: 'password'});
        this.loginButton = page.locator('#login-button');
        this.title = page.getByText('Swag Labs');
        this.hamburgerMenu = page.getByRole('button', { name: 'Open Menu' });
        this.logOut = page.locator('[data-test="logout-sidebar-link"]');
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

    async logInSauceDemo(username:string, password:string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async clickOnMenu(){
        await this.hamburgerMenu.click();
    }

    async clickOnLogOut(){
        await this.logOut.click();
    }
}