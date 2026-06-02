import { test, expect } from '@playwright/test';

 import { LoginPage } from '../../pages/LoginPage.js';

 import { PIMPage } from '../../pages/PIMPage.js';



 test.describe('user creation', ()=>{
        
      test.beforeEach('launch the browser and enter the url', async ({page})=>{
         await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

             const loginPage = new LoginPage(page);
            await loginPage.login('Admin', 'admin123');
      }  )
         


              
         test('create user', async ({page})=>{

                
                   const pimPage = new PIMPage(page);

                   await pimPage.navigateToAddEmployee();

                    
 await pimPage.createEmployeeWithLoginDetails('John', 'steve', 'Doe', 'john.doe123aa', 'Password@123');

                await   page.waitForTimeout(5000);
         })

        






 })