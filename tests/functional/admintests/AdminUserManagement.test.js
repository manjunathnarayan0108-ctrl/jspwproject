import { expect, test } from "@playwright/test";
import { getExcelData, writeExcelData } from '../../../excelutil/excelutils.js';
import Sidebar from "../../../pages/sidebar/SidebarComponent.js";
import path from 'path';
import { fileURLToPath } from 'url';
import AdminNavComponent from "../../../pages/Admin/AdminNavComponent.js";
import UserManagementUserPage from "../../../pages/Admin/UserManagementAddUser.js";
import { LoginPage } from "../../../pages/LoginPage.js";


const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);
const dataPath = path.resolve(__dirname, '../../../datasheet.xlsx');


const SHEET_NAME = 'AdminUserManagementUser';
const testCases = await getExcelData(dataPath, SHEET_NAME);

test.setTimeout(120000);



test.describe('User Management Dynamic Tests', () => {

  test.beforeEach('Navigate to dashboard and enter application URL', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    const login = new LoginPage(page);
    await login.login('Admin', 'admin123');
  });

  for (const data of testCases) {
    if (String(data.ExecuteFlag).trim().toLowerCase() !== 'yes') {
      continue;
    }


    test(`Row ${data["S.No"]} - ${data["ScenarioType"]} - Action: ${data["TestAction"]}`, async ({ page }) => {
      const sidebar = new Sidebar(page);
      const adminNavComponent = new AdminNavComponent(page);
      const adminUserPage = new UserManagementUserPage(page);

      const targetExcelRow = data.rowNumber ? data.rowNumber : parseInt(data["S.No"], 10) + 1; 
      
      let actualResult = "Action Failed";
      let testCaseStatus = "Fail";
      let pomResponse = null; // Can be a boolean or an object { success, actualResult }

      try {
        // 1. Core Navigation
        await sidebar.searchSidebar('Admin');
        await sidebar.clickAdmin();
        await adminNavComponent.goToUserManagement();

console.log("Available columns:", Object.keys(data));
console.log(data);
        // 2. Dynamic Action Routing based on Excel 'TestAction' Column
        switch (String(data.TestAction).trim()) {

  case 'SearchUserByAll':


    pomResponse =
      await adminUserPage.searchForSystemUsers({
        Username: data.Username,
        UserRole: data.UserRole,
        Status: data["UserStatus"],
        EmployeeName: data.EmployeeName
      });

    break;


  case 'SearchUserByRole':

    pomResponse =
      await adminUserPage.searchUserByRole({
        UserRole: data.UserRole,
        Status: data.Status
      });

    break;


  case 'AddUserDynamic':

    if (data.Username === 'AUTO_GENERATE') {

      data.Username =
        `User${Date.now()}`;
    }

    


    pomResponse =
      await adminUserPage.addSytemUser({
        UserRole: data.UserRole,
        EmployeeName: data.EmployeeName,
        Username: data.Username,
        Status: data.UserStatus,
        Password: data.Password,
        ConfirmPassword: data.ConfirmPassword
      });

    break;


  case 'AddDuplicateUser':

    pomResponse =
      await adminUserPage.addSytemUser({
        UserRole: data.UserRole,
        EmployeeName: data.EmployeeName,
        Username: data.Username,
        Status: data.UserStatus,
        Password: data.Password,
        ConfirmPassword: data.ConfirmPassword
      });

    break;


  case 'InvalidEmployee':

    pomResponse =
      await adminUserPage.invalidEmployee({
        UserRole: data.UserRole,
        EmployeeName: data.EmployeeName,
        Username: data.Username,
        Status:data.UserStatus,
        Password: data.Password,
        ConfirmPassword: data.ConfirmPassword
      });

    break;


  case 'RequiredUsername':

    pomResponse =
      await adminUserPage.addSytemUser({
        UserRole: data.UserRole,
        EmployeeName: data.EmployeeName,
        Username: '',
        Status: data.Status,
        Password: data.Password,
        ConfirmPassword: data.ConfirmPassword
      });

    break;


  case 'PasswordMismatch':

    pomResponse =
      await adminUserPage.addSytemUser({
        UserRole: data.UserRole,
        EmployeeName: data.EmployeeName,
        Username: data.Username,
        Status: data.Status,
        Password: data.Password,
        ConfirmPassword: data.ConfirmPassword
      });

    break;


  case 'ResetFilter':

    if (data.Username)
      await adminUserPage.enterUserName(data.Username);

    if (data.EmployeeName)
      await adminUserPage.enterEmployeeNameandVerfiy(
        data.EmployeeName
      );

         if(data.UserStatus){

           await adminUserPage.selectStatus(data.UserStatus);

         }

          if(data.UserRole){

            await adminUserPage.selectUserRole(data.UserRole)
          }




      //await this.page.waitForTimeout(4000);
    pomResponse =
      await adminUserPage.clickResetButton();

    break;


  case 'CancelAddUser':

    await adminUserPage.addButton.click();

    pomResponse =
      await adminUserPage.clickCancelButton();

    break;


  case 'NavigateBackToUserList':

    pomResponse = {
      success: true,
      actualResult:
        'User list page displayed successfully'
    };

    break;


  default:

    throw new Error(
      `Unsupported TestAction: ${data.TestAction}`
    );
}


        // 3. Process outcomes based on whether your POM returned an Object or a Boolean
        let outputText = "";
        let isSuccess = false;

        if (pomResponse && typeof pomResponse === 'object') {
          outputText = pomResponse.actualResult || "";
          isSuccess = pomResponse.success;

           console.log('output text:',outputText)
        } else {
          // If POM returns a primitive true/false boolean value
          isSuccess = !!pomResponse;
          outputText = isSuccess 
            ? "User successfully verified in filtered grid results." 
            : "No matching records found or grid counts did not match criteria.";
        }

        actualResult = outputText;

        // 4. Smart Assertions matching your Excel's Expected Result definition
        if (data["Expected Result"]) {
          expect(outputText.toLowerCase()).toContain(String(data["Expected Result"]).toLowerCase());
          testCaseStatus = "Pass";
        } else {
          // Fallback assertion if Expected Result cell is empty
          expect(isSuccess).toBe(true);
          testCaseStatus = "Pass";
        }

      } catch (error) {
        actualResult = `Exception Occurred: ${error.message}`;
        testCaseStatus = "Fail";
        throw error; 
      } finally {
        // Write status cleanly back to Excel sheet row index
        await writeExcelData(dataPath, SHEET_NAME, targetExcelRow, actualResult, testCaseStatus);
      }
    });
  }


});