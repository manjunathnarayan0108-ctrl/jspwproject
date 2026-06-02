import {test,expect} from "@playwright/test"



 test('default pop ', async ({page})=>{


     await page.goto('https://the-internet.herokuapp.com');

        await page.getByRole('link',{name:'JavaScript Alerts'}).click();
          
          await page.waitForTimeout(3000)

             await page.getByRole('button', {name:'Click for JS Alert'}).click();


             await page.waitForTimeout(3000)

 })