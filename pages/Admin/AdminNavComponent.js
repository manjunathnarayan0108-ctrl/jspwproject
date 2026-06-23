class AdminNavComponent {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    //this.userManagementTab = page.locator('span').filter({ hasText: 'User Management ' });

     this.userManagementTab= page.getByRole('navigation',{name:'Topbar Menu'}).getByText('User Management ')
    this.user= page.getByRole('menuitem',{name:'Users'})
    this.jobTab = page.locator('span').filter({ hasText: 'Job' });
    this.organizationTab = page.locator('span').filter({ hasText: 'Organization' });
    this.qualificationsTab = page.locator('span').filter({ hasText: 'Qualifications' });
    this.nationalitiesLink = page.getByRole('link', { name: 'Nationalities' });
  }

  
  // Navigation Methods
  async goToUserManagement() {
    await this.userManagementTab.click();

    await this.user.click();



  }
   


  async goToJobDropdown() {
    await this.jobTab.click();
  }

  async goToOrganizationDropdown() {
    await this.organizationTab.click();
  }

  async goToQualificationsDropdown() {
    await this.qualificationsTab.click();
  }

  async goToNationalities() {
    await this.nationalitiesLink.click();
  }
}

export default  AdminNavComponent 