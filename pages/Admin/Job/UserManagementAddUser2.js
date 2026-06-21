import { expect } from "@playwright/test";

class UserManagementUserPage {
  // constructor to initialize elements 
  constructor(page) {
    this.page = page;

    // Form Field Locators
    this.userRoleDropdown = page.locator('oxd-input-group', { hasText: 'User Role' }).getByRole('combobox');
    this.employeeNameInput = page.getByPlaceholder('Type for hints...');
    this.statusDropdown = page.locator('.oxd-input-group', { hasText: 'Status' }).getByRole('combobox');
    this.usernameInput = page.locator('form').getByRole('textbox').last(); 
    this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password' });
 
    this.dynamicDropdownDiv = page.getByRole('option');
    this.dynamicDropdownSpan = (name) => page.getByRole('option').locator('span', { hasText: name }).first();
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
      await this.usernameInput.fill(username);
    } catch (error) {
      throw error;
    }
  }

  // function to select UserRole
  async selectUserRole(userRole) {
    await this.userRoleDropdown.click();
    const optionToSelect = this.page.getByRole('listbox').getByRole('option', { name: userRole, exact: true });
    await optionToSelect.click();
  }

  // function to Enter Employee Name 
  async enterEmployeeNameandVerfiy(employeename) {
    await this.employeeNameInput.fill(employeename); 
    
    try {
      const result = await Promise.race([
        // condition 1: option appears 
        this.dynamicDropdownSpan(employeename).waitFor({ state: 'visible', timeout: 5000 })
          .then(() => ({ type: 'option', element: this.dynamicDropdownSpan(employeename) })),

        // condition 2: hint container variations
        this.dynamicDropdownDiv.waitFor({ state: 'visible', timeout: 5000 })
          .then(async () => {
            const text = await this.dynamicDropdownDiv.innerText();
            if (text === 'Searching' || text === 'No Records Found') {
              return { type: 'noRecords', message: text };
            }
          }),

        // condition 3: Invalid error message 
        this.InvalidError.waitFor({ state: 'visible', timeout: 5000 })
          .then(() => ({ type: 'error' }))
      ]);

      // CORRECTION: Brackets and control flow un-nested/realigned so all branches are reachable
      if (result?.type === 'option') {
        await result.element.click();
        return {
          success: true,
          employeeName: employeename
        };
      }

      if (result?.type === 'noRecords') {
        return {
          success: false,
          actualResult: 'Employee does not exist'
        };
      }

      if (result?.type === 'error') {
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
    await this.statusDropdown.click();
    const optionToSelect = this.page.getByRole('listbox').getByRole('option', { name: statusValue, exact: true });
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

  // function to search data 
  async clickOnSearch() {
    await this.searchButton.click();
  }

  // function to search for Systemusers 
  async searchForSystemUsers(data) {
    await this.enterUserName(data.Username);
    await this.selectUserRole(data.UserRole);
    await this.selectStatus(data.Status);

    const empResult = await this.enterEmployeeNameandVerfiy(data.EmployeeName);
    if (!empResult.success) {
      return empResult;
    }

    await this.clickOnSearch();
    return await this.verifyResults(data.Username);
  }

  // function to verify search results 
  async verifyResults(username) {
    const noRecords = this.page.getByText('No Records Found');
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

    await this.saveButton.click();

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

export { UserManagementUserPage };