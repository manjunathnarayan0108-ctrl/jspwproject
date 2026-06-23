// import { test, expect } from "@playwright/test";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs/promises"; // Natively handle file reading/writing asynchronously
// import { LoginPage } from "../pages/loginPage.js";

// import { writeJsonResult } from "../jasonutil/jasonutil.js";


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const dataPath = path.resolve(__dirname, "../datasheet.json");

// // 1. Read and parse the JSON file synchronously during the collection phase
// const rawData = await fs.readFile(dataPath, "utf-8");
// const testCases = JSON.parse(rawData.replace(/^\uFEFF/, ''));



// test.describe.serial('OrangeHRM Login Data Driven Tests via JSON', () => {

//    test.describe.configure({
//       retries: 1
//    });

//   for (const data of testCases) {
   
//    test(`Login with ${data.username} - ID ${data.id}`, async ({ page }) => {
//       const loginPage = new LoginPage(page);

//       await page.goto(
//          'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
//       );

//       try {
//          await loginPage.login(data.username, data.password);

//          // Dynamic Assertions based on your test data requirements
//          if (data.expectedResult === "PASS") {
//             // If the data says PASS, we MUST reach the dashboard
//             await expect(page).toHaveURL(/.*dashboard/);
//          } else {
//             // If the data says FAIL, we MUST stay on the login page
//             await expect(page).toHaveURL(/.*login/);
            
//             // Optional: Assert that the error message alert is visible on the screen
//             const errorAlert = page.locator('.oxd-alert-content-text');
//             await expect(errorAlert).toBeVisible();
//          }

//          // If the code reaches here, the application behaved EXACTLY as expected!
//          await writeJsonResult(data.id, 'PASS');

//       } catch (error) {
//          // If an assertion fails (e.g. invalid user got to dashboard, or valid user didn't), mark it as FAIL
//          await writeJsonResult(data.id, 'FAIL');
//          throw error; 
//       }
//    });
// }
// });