import { test, expect } from '@playwright/test';

 import { LoginPage } from '../../pages/LoginPage.js';

 import { PIMPage } from '../../pages/PIMPage.js';


 import {

   getExcelData,writeExcelData
 } from '../../excelutil/excelutils.js';

import path from 'path';
import { fileURLToPath } from 'url';


  const _filename= fileURLToPath(import.meta.url);

   console.log(import.meta.url); // Debugging line to verify the import.meta.url value
   console.log("Current Filename:", _filename); // Debugging line to verify the current filename

  const __dirname= path.dirname(_filename);

   console.log("Current Directory:", __dirname); // Debugging line to verify the current directory

      
      const dataPath= path.resolve(_dirname,'../../datasheet.xlsx');

         console.log("Data Path:", dataPath); // Debugging line to verify the path to the Excel file
           

          const testCases = await getExcelData(dataPath,'userCreation');




 test.describe('user creation', ()=>{
        
      test.beforeEach('launch the browser and enter the url', async ({page})=>{
         await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

             const loginPage = new LoginPage(page);
            await loginPage.login('Admin', 'admin123');
      }  )
         


              
//          test('create user', async ({page})=>{

                
//                    const pimPage = new PIMPage(page);

//                    await pimPage.navigateToAddEmployee();

                    
//  await pimPage.createEmployeeWithLoginDetails('John', 'steve', 'Doe', 'john.doe123aa', 'Password@123');

//                 await   page.waitForTimeout(5000);

               
               
//                 await  pimPage.save();



//                 await expect(pimPage.getSuccessMessage().filter({hasText: 'Successfully Saved'})).toBeVisible();

                  


//                 await page.waitForTimeout(5000);
//          })

        
//           test('verify employee login', async ({page})=>{

//         const loginPage = new LoginPage(page);
//            await loginPage.login('Johnadh', 'Manju@1234');

//  })



          for(const data of  testcases) {

             if(data.ExecuteFlag!=='Yes') {
               
                    continue; // Skip this iteration if the ExecuteFlag is not 'Yes'

             } 

              

             test(`Row ${data["S.No"]}-${data.scenarioType}` ,async ({page}) =>{


                const pimPage= new PIMPage(page);


                 try{
                     await pimPage.navigateToAddEmployee();

                     await pimPage.createEmployee(data);

                     await pimPage.save();


                     let actualResult = '';


                      if(await pimPage.getSuccessMessage().filter({hasText:'Successfully Saved'}).isVisible()) {

                           actualResult= await pimPage.getToastMessage();

                      } 

                       else {

                        actualResult= await pimPage.getErrorMessage();
                       }
 

                       

                 } catch(error) {




                 }


             }
             )
   
          }






 })