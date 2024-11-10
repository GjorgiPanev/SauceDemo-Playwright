import {test as base} from '@playwright/test'
import { LogInPage } from '../tests/pages/log-in.page';
import { HomePage } from '../tests/pages/home.page';
 
type MyFixtures = {
    logInPage:LogInPage
    homePage:HomePage
}
 
export const test = base.extend<MyFixtures>({
    logInPage: async ({page}, use)=>{
        await use(new LogInPage(page))
    },
    homePage: async ({page}, use)=>{
        await use(new HomePage(page))
    }
})

export {expect} from '@playwright/test'