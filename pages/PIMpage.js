import { expect } from "@playwright/test";


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


          
     async   createEmployee(data) {

            if(data["FirstName"]) {

                await this.firstName.fill(data["FirstName"]);
            }


            if(data["MiddleName"]) {

                await this.middleName.fill(data["MiddleName"]);
            }


             if(data["LastName"]) {

                await this.lastName.fill(data["LastName"]);
             }
                  

                   if(data["Toggle On"]==="Yes") {
                            

                    await this.createLoginDetailsCheckbox.click();

                     
                    if(data["Username"]) {

                        await  this.username.fill(data["Username"]);
                    }


             if(data["Password"]) {

                await this.password.fill(data["Password"]);
             }


             if(data["ConfirmPassword"]) {

                await this.confirmPassword.fill(data["ConfirmPassword"]);
             }            
     }

                         
       if(data["Upload image"] &&  data["Upload image"].trim()!==""){

        await this.fileUpload.setInputFiles(data["Upload image"]);

       }


     

    
}

   async save() {


    await this.saveButton.click();


        }


        // async  getToastMessage() {


        //     return (

        //         await this.successmessage.textContent()
        //     )?.trim ();
        // }


         async getActualResult() {

             
            if(await this.successmessage.filter({hasText:'Successfully Saved'}).isVisible()) {
                
                return await this.toastMessage.textContent();

         }    


         

            const errors =this.page.locator('.oxd-input-field-error-message');

           
             
             if(await errors.count()>0) {


                return await errors.first().allTextContents();
             }
 

              
         
            }

}   
