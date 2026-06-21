class AdminUserManagementPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // System Users Filter Locators
    this.usernameInput = page.locator('form').getByRole('textbox').first();
    this.employeeNameInput = page.getByPlaceholder('Type for hints...');

    // User Role Dropdown
    this.userRoleDropdown = page.locator('form').locator('.oxd-select-text').first();

    // Status Dropdown
    this.statusDropdown = page.locator('form').locator('.oxd-select-text').nth(1);

    // Buttons
    this.searchButton = page.getByRole('button', { name: ' Search ' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.addButton = page.getByRole('button', { name: 'Add' });

    // Records Count Label
    this.recordsCountLabel = page.locator('.orangehrm-horizontal-padding > span');

    // Grid Rows
    this.tableRows = page.locator('.oxd-table-card');
  }


  /**
   * Scans the grid table for a row containing the specific username
   */
  async getRowValue(username) {
    const row = this.tableRows.filter({ hasText: username }).first();

    if ((await row.count()) === 0) {
      return '';
    }

    return await row.innerText();
  }


  /**
   * Generic Filter Method
   */
  async filterUsers({ username, userRole, employeeName, status }) {
    if (employeeName) {
      const employeeResult = await this.fillEmployeeName(employeeName);
      if (!employeeResult.success) {
        return employeeResult;
      }
    }

    if (username) await this.fillUsername(username);
    if (userRole) await this.selectUserRole(userRole);
    if (status) await this.selectStatus(status);

    const searchResult = await this.clickSearch(username);

    return {
      success: searchResult,
      actualResult: searchResult ? 'User Found' : 'No Records Found'
    };
  }

  /**
   * Excel Driven Data Entry Method
   */
  /**
   * Excel Driven Data Entry Method
   */


  async fillSystemUserData(data) {
    // If Employee Name is provided, fill it. Failures will throw errors automatically.
    if (data.EmployeeName) {
      await this.fillEmployeeName(data.EmployeeName);

             await  this.page.waitForTimeout(4000);
    }

    if (data.Username) await this.fillUsername(data.Username);
    if (data.UserRole) await this.selectUserRole(data.UserRole);
    if (data.Status) await this.selectStatus(data.Status);

    // Execute Search and return boolean outcome
    const isUserFound = await this.clickSearch(data.Username);


     await  this.page.waitForTimeout(5000)

    if (!isUserFound) {
      throw new Error(`Search failed: No matching system user records found for Username: "${data.Username || 'N/A'}"`);
    }

    return true;
  }

  
  /**
   * Enter Username
   */
  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  /**
   * Select User Role
   */
  async selectUserRole(role) {
    await this.userRoleDropdown.click();
    await this.page.getByRole('option', { name: role, exact: true }).click();
  }

  

  /**
   * Validate Employee Name using OrangeHRM autocomplete
   */
 /**
   * Validate Employee Name using OrangeHRM autocomplete
   * Throws an error if the employee is not found or if the selection fails.
   */
//   async fillEmployeeName(name) {
//     try {
//       // Clear and fill the input field
//       await this.employeeNameInput.fill('');
//       await this.employeeNameInput.fill(name);

//       const optionDropdown = this.page.locator('[role="option"]');
//       const noRecordsFound = this.page.getByText('No Records Found', { exact: true });

//       // Handle the race condition safely by waiting for one of the states to appear
//       await Promise.race([
//         optionDropdown.first().waitFor({ state: 'visible' }),
//         noRecordsFound.waitFor({ state: 'visible' })
//       ]);


//       // If "No Records Found" is visible, immediately fail the test with a clear reason
//       if (await noRecordsFound.isVisible()) {
//         throw new Error(`Employee autocomplete failed: "${name}" does not exist in the system.`);
//       }

//       // If the dropdown option is visible, select it
//       if (await optionDropdown.first().isVisible()) {
//         await optionDropdown.first().click();
//         return; // Success! Simply proceed with the test execution
//       }



//       // Fallback if neither element settled correctly
//       throw new Error(`Employee autocomplete timed out or became unresponsive for: "${name}".`);

//     } catch (error) {
//       // Log the exact issue for debugging and bubble it up to fail the Playwright test immediately
//       console.error(`[Error in fillEmployeeName]: ${error.message}`);
//       throw error;
//     }

//   }

/**
   * Validate Employee Name using OrangeHRM autocomplete dropdown
   */
  async fillEmployeeName(name) {
    // Fill the autocomplete input box
    await this.employeeNameInput.fill(name);

    const optionDropdown = this.page.locator('[role="option"]');
    const noRecordsFound = this.page.getByText('No Records Found', { exact: true });

    // Wait until either a valid dropdown option appears or "No Records Found" pops up
    await Promise.race([
      optionDropdown.first().waitFor({ state: 'visible' }).catch(() => {}),
      noRecordsFound.waitFor({ state: 'visible' }).catch(() => {})
    ]);

    // Scenario A: "No Records Found" is displayed -> Terminate immediately
    if (await noRecordsFound.isVisible()) {
      throw new Error(`Employee autocomplete failed: "${name}" does not exist in the dropdown suggestions.`);
    }

    // Scenario B: Employee match is found -> Click it and proceed
    if (await optionDropdown.first().isVisible()) {

      await   this.page.waitForTimeout(5000)
      await optionDropdown.first().click();
      return; // Successfully selected, continue test execution
    }

    // Scenario C: Dropdown never loaded anything
    throw new Error(`Employee autocomplete timed out or failed to load suggestions for: "${name}".`);
  }

  

  /**
   * Select Status
   */
  async selectStatus(status) {
    await this.statusDropdown.click();
    await this.page.getByRole('option', { name: status, exact: true }).click();
  }

  /**
   * Click Search and Verify Results
   */
//   async clickSearch(employeename) {
//     await this.searchButton.click();
//     await this.recordsCountLabel.waitFor({ state: 'visible' });

//     const rawText = await this.recordsCountLabel.innerText();
//     const match = rawText.match(/\d+/);
//     const count = match ? parseInt(match[0], 10) : 0;

//     if (count === 0) {
//       return false;
//     }

//     if (!employeename) {
//       return true;
//     }

//     const rowText = await this.getRowValue(username);
//     return rowText.includes(username);
//   }

/**
   * Click Search and Verify Grid Results
   * Throws an error if no system records are found matching the filters.
   */


//   async clickSearch(username) {
//     // 1. Execute the search action now that the autocomplete has selected the employee
//    // await this.searchButton.click();

//     // 2. Wait for the record count label to settle and read the value
//     await this.recordsCountLabel.waitFor({ state: 'visible' });
//     const rawText = await this.recordsCountLabel.innerText();
    
//     const match = rawText.match(/\d+/);
//     const count = match ? parseInt(match[0], 10) : 0;

//     // 3. Fallback check: If the grid count is 0, fail the test instantly
//     if (count === 0) {
//       throw new Error(
//         `Search failed: The criteria submitted returned 0 grid records for Username: "${username || 'N/A'}".`
//       );
//     }

//     // 4. Verification: Verify the actual grid text matches the targeted username
//     if (username) {
//       const rowText = await this.getRowValue(username);
//       if (!rowText.includes(username)) {
//         throw new Error(
//           `Integrity failure: Grid records exist, but none contained the expected Username text: "${username}".`
//         );
//       }
//     }

//     return true; // Everything passed gracefully
//   }

/**
   * Click Search and Verify Final Table Grid Results
   */
  async clickSearch(username) {

     this.page.waitForTimeout(5000);

    // 1. Click the main search button now that the employee has been selected
    await this.searchButton.click();

    // 2. Wait for the final grid record count label to update
    await this.recordsCountLabel.waitFor({ state: 'visible' });
    const rawText = await this.recordsCountLabel.innerText();
    
    const match = rawText.match(/\d+/);
    const count = match ? parseInt(match[0], 10) : 0;

    // 3. If the final search results grid is empty, throw an error
    if (count === 0) {
      throw new Error(`Search failed: The criteria submitted returned 0 grid records for Username: "${username || 'N/A'}".`);
    }

    // 4. Double check that the username exists in the results table rows
    if (username) {
      const rowText = await this.getRowValue(username);
      if (!rowText.includes(username)) {
        throw new Error(`Integrity failure: Grid records exist, but none contained the expected Username: "${username}".`);
      }
    }

    return true;
  }


  /**
   * Click Reset
   */
  async clickResetFilter() {
    await this.resetButton.click();
  }

  /**
   * Click Add User
   */
  async clickAddUser() {
    await this.addButton.click();
  }
}

export default AdminUserManagementPage;