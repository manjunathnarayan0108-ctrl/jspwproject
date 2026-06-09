    import { expect } from "@playwright/test";

    import { generateRandomNumber } from "../jstutil/Jsutils";



    export class PIMPage {



        constructor(page) {

            this.page = page;

            this.pimMenu = page.getByRole('link', {
                name: /^PIM$/
            });


            this.fileUpload = page.locator('input[type="file"]');


            this.addEmployeeBtn = page.getByRole('link', {
                name: /^Add Employee$/
            });



            // this.firstName = page.getByRole('textbox', {
            //     name: /^firstName$/
            // });

                
        this.empId = page.locator("//label[text()='Employee Id']/parent::div/following-sibling::div//input");


            this.firstName= page.locator('input[name="firstName"]');


            this.middleName = page.locator('input[name="middleName"]')



            this.lastName = page.locator('input[name="lastName"]');



        // this.createLoginDetailsCheckbox =page.locator("input[type='checkbox']");

                    this.createLoginDetailsCheckbox =page.locator("//span[@class='oxd-switch-input oxd-switch-input--active --label-right']");



        //  this.createLoginDetailscheckbox= page.getByRole('checkbox', {name:'Create Login Details'});


        //     this.createLoginDetailsToggle =
        // page.getByText('Create Login Details');

                this.successmessage =  page.locator('.oxd-toast-content');

    //label[text()='Employee Id']/parent::div/following-sibling::div//input

            this.username =
                page.locator(
                    "//label[text()='Username']/parent::div/following-sibling::div//input"
                );

                
                this.statusEnabledRadio= page.locator("//input[@type='radio' and @value='1']");

                this.statusDisabledRadio= page.locator("//input[@type='radio' and @value='2']");

            this.password =
                page.locator(
                    "//label[text()='Password']/parent::div/following-sibling::div//input"
                );


            this.confirmPassword =
                page.locator(
                    "//label[text()='Confirm Password']/parent::div/following-sibling::div//input"
                );


                this.errors =
        this.page.locator(
            '.oxd-input-field-error-message'
        );

            this.saveButton =
                page.getByRole('button', {
                    name: /^Save$/
                });
        }

        async navigateToAddEmployee() {

            await this.pimMenu.click();



            await this.page.waitForURL(/.*viewEmployeeList.*/)

            await this.addEmployeeBtn.click();

            await expect(this.firstName).toBeVisible({ timeout: 60000 });

        }


            
        async   createEmployee(data) {

                    console.log("Creating employee with data:", data);
                    
                    // Debugging line to verify the data being used
                if(data["FirstName"]) {

                    await this.firstName.fill(data["FirstName"]);
                }



                if(data["MiddleName"]) {

                    await this.middleName.fill(data["MiddleName"]);
                }


                if(data["LastName"]) {

                    await this.lastName.fill(data["LastName"]);
                }
                    
                if(!data["EmployeeId"]||data["EmployeeId"]) {

                    const currentId = await this.empId.inputValue();

                    console.log('currentId',currentId)

                    

                    const uniqueId = `${currentId}${generateRandomNumber()}`;

                        console.log('uniqu',uniqueId);
                        await this.empId.fill(uniqueId);

                    await this.empId.fill(uniqueId);

                } 

                    if(data["ToggleOn"]==="Yes") {
                                
                        console.log('inside the toggle on block');

                        await this.createLoginDetailsCheckbox.click();

                        
                        if(data["Username"]) {

                                const username= data["Username"];

                const uniqueUsername = `${username}${generateRandomNumber()}`;

                

                            await  this.username.fill(uniqueUsername);
                        }


                        if(data["Status"]==="Enabled") { 

                            await this.statusEnabledRadio.click();

                        } 
                        
                                if(data["Status"]==="Disabled")
                        
                        {

                            await this.statusDisabledRadio.click();
                        }



                if(data["Password"]) {


                    const password =  typeof data["Password"]==='object'? data["Password"].text:data["Password"];

                
                        console.log(data["Password"].text)
                    await this.password.fill(password);


                    
                    console.log('inside the password block')


                    console.log(await this.password.inputValue())

                                    // this.page.waitForTimeout(3000)

                }


                if(data["ConfirmPassword"]) {

                    console.log('inside the  confirm password');

                    console.log(data["ConfirmPassword"].text);

            const confirmPassword =  typeof data["ConfirmPassword"]==='object'? data["ConfirmPassword"].text:data["ConfirmPassword"];

                                await this.confirmPassword.fill(confirmPassword);


                    await  this.page.waitForTimeout(3000)

                }            
        }

                            
        if(data["Upload image"] &&  data["Upload image"].trim()!==""){

            await this.fileUpload.setInputFiles(data["Upload image"]);

        }


        

        
    }
async save() {
    let result = 'something went wrong';

    try {
        await this.saveButton.click();

        const successToast = this.successmessage;

        await Promise.any([
            successToast.waitFor({
                state: 'visible',
                timeout: 15000
            }),
            this.errors.first().waitFor({
                state: 'visible',
                timeout: 15000
            })
        ]).catch(() => {});

        if (
            await successToast.filter({ hasText: 'Successfully Saved' }).isVisible().catch(() => false)
        ) {
            result = (await successToast.textContent())?.trim();
            return result;
        }

        const errors = this.page.locator('.oxd-input-field-error-message');
        const errorCount = await errors.count();

        if (errorCount > 0) {
            result = await errors.allTextContents();
        }
    } catch (error) {
        console.error('Save operation failed:', error);
        result = error instanceof Error ? error.message : String(error);
    }

    return result;
}
    }