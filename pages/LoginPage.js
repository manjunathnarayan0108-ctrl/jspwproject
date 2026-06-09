
 import { expect } from "@playwright/test";
 
export  class LoginPage{


     #usernameInput;

     #passwordInput;


     #loginButton;

      #page;

      constructor(page){
         
        // page is passed from the test runner 
        this.#page=page;

        //initialize the locators 

        this.#usernameInput=page.getByPlaceholder('Username');

        this.#passwordInput= page.getByPlaceholder('Password');

        this.#loginButton= page.getByRole('Button',{name:'Login'});

      }



      // getters and setters to set and return the selectors 


      get userNameSelector(){
        return this.#usernameInput;
      }


       get passwordSelector() {

        return this.#passwordInput;
       }


        get  loginButtonSelector() {
            return this.#loginButton
        }



     async  enterUserName(user) {

            await this.#usernameInput.fill(user)
        }

           

          async  enterPassword(password) {

            await  this.#passwordInput.fill(password);
            

                     
         }


           async clickLogin(){

             await this.#loginButton.click();

           }



           async  login(username,password){

            console.log(`username :${username} and password: ${password}`);

                 await  this.enterUserName(username);

                  await this.enterPassword(password);

                  await this.clickLogin();

//  await expect(
//         this.#page.getByRole('heading', { name: 'Dashboard' })
//     ).toBeVisible();

await this.#page.getByRole('heading', { name: 'Dashboard' }).waitFor({ state: 'visible', timeout: 30000 });


                // await this.#page.waitForTimeout(10000)
           }







}

 