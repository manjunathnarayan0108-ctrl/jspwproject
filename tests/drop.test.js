// import { test,expect} from "@playwright/test";



//  test.describe('handling dropdown',()=>{


//       test.beforeEach('launch the browser and enter the url ', async ({page})=>{

           
//               await page.goto('https://demoqa.com/');


//               await page.locator('div.card',{hasText:/^Widgets$/}).click();

//            //   await page.locator('div:has(h5:has-text("Widgets"))').click();


//                await page.waitForTimeout(2000);

//       })


      
//        test('click on the select menu', async ({page})=>{


//                 await page.getByRole('link',{name:/^Select Menu$/}).click();

//                 await page.waitForTimeout(3000);

        
//        })




//        test('select single select dropdown', async({page})=>{

//            await page.getByRole('link',{name:/^Select Menu$/}).click();

//                 await page.waitForTimeout(3000);

               
//           // await page.locator("//*[@id='withOptGroup']/div[1]/div[2]/div").dblclick({force:true});
        
//             await page.locator('#withOptGroup').click();

           
//             await page.waitForTimeout(2000);

              
//         //       await  expect(dropdown).toBeVisible();
              
             


// //               await page.locator('//*[@id="react-select-2-listbox"]/div[1]').
// //               selectOption({
// //         label: 'Group 1, option 1'
// //     });


// await page.getByRole('option', {
//     name: 'Group 1, option 1'
// }).click();


//             await page.waitForTimeout(3000);

//        })




//         test('multi select ', async ({page})=>{
            
//                   await page.getByRole('link',{name:/^Select Menu$/}).click();

//                 await page.waitForTimeout(3000);

            
                
//                 await page.locator('#react-select-4-placeholder').click();


//                const colors = ['Green', 'Blue', 'Black'];

//         await page.getByRole('combobox').click();

//        for (const color of colors) {

//     await page.getByRole('option', {
//         name: color
//                }).click();
//                                        }

                 

//         })



//         test('select a value ', async ({page})=>{

//                 await page.getByRole('link',{name:/^Select Menu$/}).click();

//                 await page.waitForTimeout(3000);


//                await  page.locator('#selectOne').click();

//                const options = await page
//     .getByRole('option')
//     .allTextContents();

//   for (const text of options) {

//     if (text === 'Dr.') {

//         await page.getByText(text).click();

//     }


// }

// console.log(options);

//       await page.waitForTimeout(3000);
//            await  page.locator('#selectOne').click();

//                 await page.getByRole('option',{name:'Mr.'}).click();
//         })





//  })