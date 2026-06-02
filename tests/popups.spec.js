
import {test,expect} from "@playwright/test";

// page.on attaches to that page object 



    test.describe.serial('tests to handle popups and diaglogs' , ()=>{


         
        test.beforeEach('tests to handle pop up using page.once', async ({page})=>{


             
           await  page.goto('https://the-internet.herokuapp.com')

         await page.getByRole('link',{name:'JavaScript Alerts'}).click();
          


        })


        // test('click on the js alerts', async ({page})=>{
  


        //    await expect(page).toHaveURL(/.*javascript_alerts/);


        // } )


        
         test('click on the js alert ' , async ({page})=>{
            

            //  page.on("dialog",async (dialog)=>{


            //      console.log(dialog.message());

            //         await dialog.accept();

            //  })



              await page.waitForTimeout(3000)

             await page.getByRole('button', {name:'Click for JS Confirm'}).click();
                
                   
            await page.reload();


                
             await page.waitForLoadState();


                        await page.getByRole('button', {name:'Click for JS Confirm'}).click();
                

                
             await page.waitForTimeout(3000) ;



         })
        
         
         
        //  test('click on the js alert 2 ' , async ({page})=>{
        //                  await page.waitForTimeout(3000) ;
        //     //  page.on("pop up ",async (diaglog)=>{


        //     //      console.log(diaglog.message());

        //     //         await diaglog.accept();

        //     //  })
        //       await page.waitForTimeout(3000)
        //      await page.getByRole('button', {name:'Click for JS Alert'}).click();
        //      await page.waitForTimeout(3000) ;
        //  })


    })