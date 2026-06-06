
import {test,expect} from '@playwright/test';


import { LoginPage } from '../../pages/LoginPage.js';


// import { PIMpage } from '../../pages/PIMpage.js';



 test.describe('Employee Login', ()=>{


     test.beforeEach('launch the browser and enter the url', async ({page})=>{


        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

           
     })


      test('verify employee login', async ({page})=>{

        const loginPage = new LoginPage(page);
           await loginPage.login('Johnadh', 'Manju@1234');

 })


 
 });