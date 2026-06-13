
 export default class HomePage {

                


            constructor(page) {
              
                 this.page= page;

                 this.adminMenu = page.getByRole('link',{ name: 'Admin' });

                 this.pimMenu = page.getByRole('link',{ name: 'PIM' });

                  this.logoutBtn= page.getByRole('oxd-userdropdown-img')

                  this.logoutOption = page.getByRole('link',{ name: 'Logout' });


                 this.leaveMenu = page.getByRole('link',{ name: 'Leave' });



            }
 }