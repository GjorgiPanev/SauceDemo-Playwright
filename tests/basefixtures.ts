import {test as base} from '@playwright/test'
import { LogInPage } from '../tests/pages/log-in.page';
 
type MyFixtures = {
    logInPage:LogInPage
}
 
export const test = base.extend<MyFixtures>({
    logInPage: async ({page}, use)=>{
        await use(new LogInPage(page))
    }
})
 
export {expect} from '@playwright/test'