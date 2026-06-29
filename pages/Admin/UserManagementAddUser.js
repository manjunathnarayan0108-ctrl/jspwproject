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
     this.addUserDropdown= 
    this.usernameInput =  page.locator('xpath=//label[text()="Username"]/../following-sibling::div//input');
    this.passwordInput = page.locator("//input[@type='password']").first();
    this.confirmPasswordInput = page.locator("//input[@type='password']").nth(1);
   // this.dynamicDropdownDiv = (name)=>page.getByRole('option').filter({hasText: name}).first();
    this.matchingOption = (employeename)=>page.getByRole('option',{name:`${employeename}`}).first();
    this.InvalidError = page.getByText('Invalid')

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
             
            console.log('inside selectUserRole',userRole);


     if (!userRole?.trim()) {
    return;
  }



    console.log('userRole ?',userRole);

     console.log('userRole',userRole);

    await this.userRoleDropdown.click();
            console.log('user role clicked')
    const optionToSelect = this.page.getByRole('listbox').getByRole('option', { name: userRole, exact: false });
             
          console.log(optionToSelect.textContent());



    await optionToSelect.click();
  }




  // function to Enter Employee Name 
  async enterEmployeeNameandVerfiy(employeename) {

           console.log('inside enterEmployeeNameandVerfiy',employeename);

    
       if (!employeename?.trim()) {
    return;
  }





            console.log('emp name:',employeename)

    await this.employeeNameInput.fill(employeename); 

   // await this.employeeNameInput.press('Tab');




        try {
         
          const option = this.matchingOption(employeename);


     const result = await Promise.any([

  option.waitFor({ state: 'visible', timeout: 10000 })
    .then(() => ({
      type: 'option',
      element: option
    }))
    .catch(() => Promise.reject()),

  this.InvalidError.waitFor({ state: 'visible', timeout: 10000 })
    .then(() => ({

      type: 'error',
    }))
    .catch(() => Promise.reject()),

  this.page.getByText('No Records Found')
    .waitFor({ state: 'visible', timeout: 10000 })
    .then(() => ({
            element:option,
      type: 'noRecords'
    }))
    .catch(() => Promise.reject())

]);



if (result.type === 'option') {

    await result.element.click();

    return {
        success: true,
        employeeName: employeename
    };
}

if (result.type === 'noRecords') {

    return {
        success: false,
        actualResult: 'No Records Found'
    };
}

if (result.type === 'error') {

    return {
        success: false,
        actualResult: 'Invalid Employee'
    };
  }


        } catch (error) {
            throw error;
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

     console.log('inside the click reset button');

      await this.page.waitForTimeout(4000);
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

  console.log('data:', data);

  if (data.Username) {
      console.log('username filled');
    await this.enterUserName(data.Username);
  }




 if (data.UserRole) {

      console.log("user role filled");
    await this.selectUserRole(data.UserRole);
  }

  if (data.Status) {

      console.log('status filled');
    await this.selectStatus(data.Status);
  }

  
//   const option = this.matchingOption(data.EmployeeName);

// await option.waitFor({ state: 'visible', timeout: 10000 });

// await option.click();


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



  //await this.clickOnSearch();

  await this.page.waitForTimeout(3000);

   
  if(empResult.success) {

  return await this.verifyResults(
    data.Username
  )

} else {

       return empResult;
}

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


   async invalidEmployee(data){

       console.log('data',data)

       await this.addButton.click();



       await expect(this.page).toHaveURL(/.*saveSystemUser.*/);

       await expect(this.userRoleDropdown).toBeVisible({timeout:10000})


       await this.selectUserRole(data.UserRole);
    await this.enterUserName(data["Username"]);
    await this.enterPassword(data.Password);

     await this.selectStatus(data.Status)


         await this.enterConfirmPassword(data.ConfirmPassword);

      const empResult =
    await this.enterEmployeeNameandVerfiy(
        data.EmployeeName
    );

if (!empResult.success) {

    await this.saveButton.click();

    const invalidMessage =
        await this.InvalidError.textContent();

    return {
        success:true,
        actualResult: invalidMessage?.trim()
    };
}



   }


  // function to add data
  async addSytemUser(data) {
    console.log('data',data)
    await this.addButton.click();
    await expect(this.page).toHaveURL(/.*saveSystemUser.*/); // CORRECTION: Replaced static string matching with a flexible regex path
    await expect(this.userRoleDropdown).toBeVisible({ timeout: 10000 });

    await this.selectUserRole(data.UserRole);
    await this.enterUserName(data["Username"]);
    await this.enterPassword(data.Password);

     await this.selectStatus(data.Status);



      //await this.page.waitForTimeout(5000);
     console.log('userstatus',data.UserStatus);

    await this.enterConfirmPassword(data.ConfirmPassword);

    await this.enterEmployeeNameandVerfiy(data.EmployeeName);

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





   async searchUserByRole({role,status}) {


    await this.selectUserRole(role);

     await this.clickOnSearch();

 const recordSummary = await this.page.locator('span',{hasText:"Records Found"})
         .first().textContent();

     let   recordCount= recordSummary.match(/\d+/g).map(Number);
                    
      console.log('recordCount:',recordCount[0]);

       await this.page.waitForTimeout(3000);



             if(recordCount[0] > 0) {
                return {
                    success: true,
                    actualResult: `Records Found`
                };
             } else {
                return {
                    success: false,
                    actualResult: 'No Records Found'
                };
             }
     
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