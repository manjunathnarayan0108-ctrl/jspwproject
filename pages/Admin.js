import { expect } from "@playwright/test";
import {HomePage} from "./HomePage";

export default class Admin extends HomePage {
        

     
     constructor(page) {
           
        this.page= page;

// Targets the specific list item in the top navigation bar

 userManagement: await page.getByRole('listitem').filter({ hasText: 'User Management' }),

  

this.userManagementItem = {
 
   

    usersItem : await page.getByRole('listitem').filter({hasText: 'Users'}),

usernameInput = page.getByRole('textbox', { name: 'Username' }),
  passwordInput = page.getByRole('textbox', { name: 'Employee Name' }),
  userRoleDropdown = page.getByRole('combobox', { name: 'User Role' }),
  statusDropdown = page.getByRole('combobox', { name: 'Status' }),

  resetButton = page.getByRole('button', { name: 'Reset' }),
  searchButton = page.getByRole('button', { name: 'Search' }),
  addButton = page.getByRole('button', { name: 'Add' }),
  deleteButton = page.getByRole('button', { name: 'Delete' }),
  editButton = page.getByRole('button', { name: 'Edit' })





} 


this.JobMenuItems =  await page.getByRole('listitem').filter({hasText: 'Job'});


this.JobMenuItems= {

    jobTitles: {
                menuLink: page.getByRole('listitem').filter({ hasText: 'Job Titles' }),
                
                // Elements that belong exclusively to the Job Titles Page
                addButton: page.getByRole('button', { name: 'Add' }),
                recordsTable: page.locator('.oxd-table-body'),
                jobTitleInput: page.locator('form input').nth(1), // Example input field on the add page
                saveButton: page.getByRole('button', { name: 'Save' })
            },

    payGrades: {
                menuLink: page.getByRole('listitem').filter({ hasText: 'Pay Grades' }),
                
                // Elements that belong exclusively to the Pay Grades Page
                addButton: page.getByRole('button', { name: 'Add' }),
                recordsTable: page.locator('.oxd-table-body'),
                payGradeInput: page.locator('form input').nth(2), // Example input field on the add page
                saveButton: page.getByRole('button', { name: 'Save' })
            },

    employmentStatus: {
                menuLink: page.getByRole('listitem').filter({ hasText: 'Employment Status' }),
                addButton: page.getByRole('button', { name: 'Add' })
            },

    jobCategories: {
                menuLink: page.getByRole('listitem').filter({ hasText: 'Job Categories' }),
                addButton: page.getByRole('button', { name: 'Add' })
            },

    workShifts: {
                menuLink: page.getByRole('listitem').filter({ hasText: 'Work Shifts' }),
                addButton: page.getByRole('button', { name: 'Add' })
            }

}


// elments for organization

 this.organizationMenuItems =  await page.getByRole('listitem').filter({hasText: 'Organization'});

 this.organizationMenuItems = {




     }





}