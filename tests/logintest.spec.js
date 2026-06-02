import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";
import { getExcelData, writeExcelData } from "../excelutil/excelutils.js";
import { LoginPage } from "../pages/loginPage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.resolve(__dirname, "../datasheet.xlsx");

const testCases = await getExcelData(dataPath);

// 1. Changed 'one' to a safe, explicit string description
test.describe.serial('OrangeHRM Login Data Driven Tests', () => {

   test.describe.configure({
      retries: 1
   });


   // 2. Use the array index (i) as a fallback to guarantee unique titles
   testCases.forEach((data, i) => {
      const calculatedRow = data.rowNumber || (i + 2); // Fallback to index if rowNumber is missing

      test(`Login with ${data.username} - Row ${calculatedRow}`, async ({ page }) => {
         const loginPage = new LoginPage(page);

         await page.goto(
            'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
         );

         try {
            await loginPage.login(data.username, data.password);
            await expect(page).toHaveURL(/.*dashboard/);

            await writeExcelData(dataPath, calculatedRow, 'PASS');
            
         } catch (error) {
            await writeExcelData(dataPath, calculatedRow, 'FAIL');
            //throw error;
         }
      });

               
            


   });
});