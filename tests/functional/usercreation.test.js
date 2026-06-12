import { test, expect } from '@playwright/test';

 import { LoginPage } from '../../pages/LoginPage.js';

 import { PIMPage } from '../../pages/PIMPage.js';

  test.setTimeout(200000);



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

      
      const dataPath= path.resolve(__dirname,'../../datasheet.xlsx');

         console.log("Data Path:", dataPath); // Debugging line to verify the path to the Excel file
           

          const testCases = await getExcelData(dataPath,'userCreation');




 test.describe('user creation', ()=>{
        
      test.beforeEach('launch the browser and enter the url', async ({page})=>{
         await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

             const loginPage = new LoginPage(page);
            await loginPage.login('Admin', 'admin123');
      }  )
         

         for (const data of testCases) {

    if (data.ExecuteFlag !== 'Yes') {
        continue;
    }

    test(
        `Row ${data["S.No"]} - ${data.ScenarioType}`,
        async ({ page }) => {

            const pimPage = new PIMPage(page);

            let actualResult = '';
            let testCaseStatus = 'FAIL';

          try {

    await pimPage.navigateToAddEmployee();

    await pimPage.createEmployee(data);

    actualResult = await pimPage.save();



if (Array.isArray(actualResult)) {
    actualResult = actualResult.join(',');
}


    expect(actualResult).toContain(
        data["Expected Result"]
    );


    testCaseStatus = "PASS";

}
catch (error) {

    testCaseStatus = "FAIL";

    actualResult = error.message;

    throw error; // keeps Playwright test failed
}
finally {

    await writeExcelData(
        dataPath,
        'userCreation',
        data.rowNumber,
        actualResult,
        testCaseStatus
    );
}
        }
    );
}


          }





 );

