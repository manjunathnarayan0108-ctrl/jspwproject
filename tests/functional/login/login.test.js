import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";
import { getExcelData, writeExcelData } from "../../../excelutil/excelutils.js";
import { LoginPage } from "../../../pages/LoginPage.js";
import { type } from "os";

  test.setTimeout(1300000);



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

 console.log("Current Directory:", __dirname); // Debugging line to verify the current directory
const dataPath = path.resolve(__dirname, "../../../datasheet.xlsx");


 console.log("Data Path:", dataPath); // Debugging line to verify the path to the Excel file

const testCases = await getExcelData(dataPath,'login');

console.log("isArray =", Array.isArray(testCases));
        console.log('typeof',typeof testCases);



// 1. Changed 'one' to a safe, explicit string description
test.describe('OrangeHRM Login Data Driven Tests', () => {

   // test.describe.configure({
   //    retries: 1
   // });

   // 2. Use the array index (i) as a fallback to guarantee unique titles
   testCases.forEach((data, i) => {

      console.log('data',data)
      const calculatedRow = data.rowNumber || (i + 2); // Fallback to index if rowNumber is missing

      test(`Login with ${data.Username} - Row ${calculatedRow}`, async ({ page }) => {
         const loginPage = new LoginPage(page);

         await page.goto(
            'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
         );


         /*

         export async function writeExcelData(
    filePath,
    sheetName,
    rowNumber,
    actualResult,
    testCaseResult
) {


         */
         if (data["Expected Result"] === "PASS") {

    await loginPage.login(
        data.Username,
        data.Password
    );

    await expect(page).toHaveURL(/.*dashboard/);

    await writeExcelData(
        dataPath,
        'login',
        calculatedRow,
        'Login Successful',
        'PASS'
    );

} else {

    await loginPage.login(
        data.Username,
        data.Password
    );

    const errorMessage =
        await page.locator('.oxd-alert-content-text')
            .textContent();

    await expect(
        page.locator('.oxd-alert-content-text')
    ).toContainText('Invalid credentials');

    await writeExcelData(
        dataPath,
        'login',
        calculatedRow,
        errorMessage,
        'PASS'
    );
}
      });
   });
});