import { expect } from "@playwright/test";
import { findSourceMap } from "node:module";

export class PIMPage {



    constructor(page) {

        this.page = page;

        this.pimMenu = page.getByRole('link', {
            name: /^PIM$/
        });



        this.addEmployeeBtn = page.getByRole('link', {
            name: /^Add Employee$/
        });



        // this.firstName = page.getByRole('textbox', {
        //     name: /^firstName$/
        // });


        this.firstName= page.locator('input[name="firstName"]');


        this.middleName = page.locator('input[name="middleName"]')



        this.lastName = page.locator('input[name="lastName"]');



       // this.createLoginDetailsCheckbox =page.locator("input[type='checkbox']");

                this.createLoginDetailsCheckbox =page.locator("//span[@class='oxd-switch-input oxd-switch-input--active --label-right']");



      //  this.createLoginDetailscheckbox= page.getByRole('checkbox', {name:'Create Login Details'});


    //     this.createLoginDetailsToggle =
    // page.getByText('Create Login Details');

            this.successmessage =  page.locator('.oxd-toast-content');



        this.username =
            page.locator(
                "//label[text()='Username']/parent::div/following-sibling::div//input"
            );


        this.password =
            page.locator(
                "//label[text()='Password']/parent::div/following-sibling::div//input"
            );

        this.confirmPassword =
            page.locator(
                "//label[text()='Confirm Password']/parent::div/following-sibling::div//input"
            );

        this.saveButton =
            page.getByRole('button', {
                name: /^Save$/
            });
    }

    async navigateToAddEmployee() {

        await this.pimMenu.click();

               // await expect(this.addEmployeeBtn).toBeVisible({timeout:40000});

//await this.page.waitForLoadState('networkidle', { timeout: 60000 });


        await this.page.waitForURL(/.*viewEmployeeList.*/)

        await this.addEmployeeBtn.click();

        await expect(this.firstName).toBeVisible({ timeout: 60000 });


       




    }

    async createEmployee(
        firstName,
        middleName,
        lastName
    ) {

        await this.firstName.fill(firstName);

        await this.middleName.fill(middleName);

        await this.lastName.fill(lastName);
    }


    async createEmployeeWithLoginDetails(
        firstName,
        middleName,
        lastName,
        username,
        password
    )
    
    {


         console.log(`firstname: ${firstName}  middlename :${middleName} lastname:${lastName} username:${username} password:${password}`)
        await this.createEmployee(
            firstName,
            middleName,
            lastName
        );

            // await this.page.waitForSelector('.oxd-form-loader', { state: 'hidden' });

       // await expect(this.page.locator('.oxd-form-loader')).toBeHidden({ timeout: 15000 });
  //   await this.page.waitForSelector('.oxd-form-loader', { state: 'detached', timeout: 60000 });

//         const loader = this.page.locator('.oxd-form-loader');
// console.log('loader count:', await loader.count());
// if (await loader.count() > 0) {
//   console.log('visible:', await loader.isVisible());
//   console.log(await loader.evaluate(e => getComputedStyle(e).cssText));
// }


// await this.page.waitForFunction(() => {
//   const span = document.querySelector('.oxd-switch-input');
//   return !span || window.getComputedStyle(span).pointerEvents === 'none';
// }, { timeout: 60000 });
// await this.createLoginDetailsCheckbox.check({ timeout: 60000 });



            //await expect(this.createLoginDetailsCheckbox).toBeVisible();

await this.createLoginDetailsCheckbox.click();




        await this.username.fill(username);

        await this.password.fill(password);

        await this.confirmPassword.fill(password);
    }



    async save() {

        await this.saveButton.click();

         console.log('Save button clicked');
    }


      getSuccessMessage(){

         return this.successmessage;
     }
}