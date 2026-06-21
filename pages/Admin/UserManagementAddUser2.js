import { expect } from "@playwright/test";

class UserManagementUserPage {
  // constructor to initialize elements 
  constructor(page) {
    this.page = page;

    // Form Field Locators
    this.userRoleDropdown = this.page.locator('.oxd-input-group', { hasText: 'User Role' })
                                    .locator('.oxd-select-wrapper');
    
    this.employeeNameInput = page.getByPlaceholder('Type for hints...');
    this.statusDropdown = page.locator('.oxd-input-group', { hasText: 'Status' }).locator('.oxd-select-wrapper');
    this.usernameInput =  page.locator('xpath=//label[text()="Username"]/../following-sibling::div//input');
    this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password' });
 
    this.dynamicDropdownDiv = page.getByRole('option');
    this.matchingOption = (employeename)=>page.getByRole('option').filter({hasText: employeename}).first();
    this.InvalidError = page.getByText('Invalid');

    // Form Action Buttons
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });  
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }



  // function to enter username 
  async enterUserName(username) {
    try {
       if (!username?.trim()) {
    return;
  }
      await this.usernameInput.fill(username);
    } catch (error) {
      throw error;
    }
  }



  // function to select UserRole
  async selectUserRole(userRole) {

     if (!userRole?.trim()) {
    return;
  }
    console.log('userRole ?',userRole);
    await this.userRoleDropdown.click();
    const optionToSelect = this.page.getByRole('listbox').getByRole('option', { name: userRole, exact: false });
    await optionToSelect.click();
  }


  // function to Enter Employee Name 
  async enterEmployeeNameandVerfiy(employeename) {

    
       if (!employeename?.trim()) {
    return;
  }



            console.log('emp name:',employeename)
    await this.employeeNameInput.fill(employeename); 
             await this.page.waitForTimeout(3000);


        try {
      const result = await Promise.race([
  this.matchingOption(employeename)
    .waitFor({ state: 'visible', timeout: 5000 })
    .then(() => ({
      type: 'option',
      element: this.matchingOption(employeename)
    })),

  this.dynamicDropdownDiv
    .waitFor({ state: 'visible', timeout: 5000 })
    .then(async () => {
      const text =
        await this.dynamicDropdownDiv.innerText();

      if (
        text.includes('Searching') ||
        text.includes('No Records Found')
      ) {
        return {
          type: 'noRecords',
          message: text
        };
      }
    }),

  this.InvalidError
    .waitFor({ state: 'visible', timeout: 5000 })
    .then(() => ({ type: 'error' }))
]);
      // CORRECTION: Brackets and control flow un-nested/realigned so all branches are reachable
      if (result?.type === 'option') {

         await this.page.waitForTimeout(3000);

        await result.element.click();
        return {
          success: true,
          employeeName: employeename
        };
      }

      if (result?.type === 'noRecords') {
                 await this.page.waitForTimeout(3000);

        return {
          success: false,
          actualResult: 'Employee does not exist'
        };
      }

      if (result?.type === 'error') {
                 await this.page.waitForTimeout(3000);


        return {
          success: false,
          actualResult: 'Invalid Employee'
        };
      }

      return { success: false, actualResult: 'Unknown selection state' };

    } catch (error) {
      throw new Error(`Employee selection failed: ${error.message}`);
    }
  }



  // function to select Status 
  async selectStatus(statusValue) {

     if (!statusValue) {
    return;
  }

  
     console.log('status',statusValue);
     
    await this.statusDropdown.click();

    const optionToSelect = this.page.getByRole('listbox').getByRole('option', { name: statusValue, exact: false });
    await optionToSelect.click();
  }



  // function to reset the entered data 
  async clickResetButton() {
    await this.resetButton.click();
    const result = await this.verifyAllFieldsReset();
    return {
      success: result,
      actualResult: result ? 'All fields reset successfully' : 'Reset failed'
    };
  }



  //function to search data 
  async clickOnSearch() {
    await this.searchButton.click();
  }


// function to search for Systemusers
async searchForSystemUsers(data) {

  console.log(data);

  if (data.Username) {
    await this.enterUserName(data.Username);
  }

  await this.page.waitForTimeout(3000);

  if (data.UserRole) {
    await this.selectUserRole(data.UserRole);
  }

  if (data.Status) {
    await this.selectStatus(data.Status);
  }

  await this.page.waitForTimeout(3000);

  let empResult = { success: true };

  if (data.EmployeeName) {

    empResult =
      await this.enterEmployeeNameandVerfiy(
        data.EmployeeName
      );

    if (!empResult.success) {
      return empResult;
    }
  }

  await this.clickOnSearch();

  await this.page.waitForTimeout(3000);

  return await this.verifyResults(
    data.Username
  );
}  

  

  // function to verify search results 
  async verifyResults(username) {
    const noRecords = this.page.getByText('No Records Found').locator('span');
    if (await noRecords.isVisible()) {
      return {
        success: false,
        actualResult: 'No Records Found'
      };
    }

    const table = this.page.locator('.oxd-table-body');
    const containsUsername = await table.textContent();

    if (containsUsername && containsUsername.includes(username)) {
      return {
        success: true,
        actualResult: 'User Found'
      };
    }


    return {
      success: false,
      actualResult: 'Username not found in table'
    };
  }

  // function to add data
  async addSytemUser(data) {
    await this.addButton.click();
    await expect(this.page).toHaveURL(/.*saveSystemUser.*/); // CORRECTION: Replaced static string matching with a flexible regex path
    await expect(this.userRoleDropdown).toBeVisible({ timeout: 10000 });

    await this.selectUserRole(data["User Role"]);
    await this.enterUserName(data["Username"]);
    await this.enterEmployeeNameandVerfiy(data.EmployeeName);
    await this.enterPassword(data.Password);
    await this.enterConfirmPassword(data.ConfirmPassword);

             await this.page.waitForTimeout(3000);


    await this.saveButton.click();
                    
             await this.page.waitForTimeout(3000);


    const successToast = this.page.getByText('Successfully Saved');
    if (await successToast.isVisible()) {
      return {
        success: true,
        actualResult: 'Successfully Saved'
      };
    }

    return {
      success: false,
      actualResult: 'Save failed'
    };
  }

  

  // function to enter password 
  // CORRECTION: Now passes the actual string password down to the Playwright .fill() action
  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  // function to enter confirm password 
  async enterConfirmPassword(confirmPassword) {
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async clickCancelButton() {
    await this.cancelButton.click();
    const isCorrectPage = this.page.url().includes('viewSystemUsers');
    return {
      success: isCorrectPage,
      actualResult: isCorrectPage ? 'Navigated back successfully' : 'Navigation failed'
    };
  }

  // function to verify all fields are reset 
  async verifyAllFieldsReset() {
    let arr = [];
    arr.push(await this.usernameInput.inputValue());
    arr.push(await this.employeeNameInput.inputValue());
    arr.push(await this.userRoleDropdown.innerText());
    arr.push(await this.statusDropdown.innerText());

    // CORRECTION: Changed from instant-return on loop element 1 to a true iteration, added proper block scope variable "let"
    for (let value of arr) {
      let trimmedValue = value ? value.trim() : '';
      if (trimmedValue !== '' && trimmedValue !== '-- Select --') {
        return false;
      }
    }  
    return true;
  }
}

export default UserManagementUserPage 