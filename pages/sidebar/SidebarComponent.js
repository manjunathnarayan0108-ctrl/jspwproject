import { expect } from '@playwright/test';

class SidebarComponent {

  
  constructor(page) {
    this.page = page;
    
    // Locators
    this.searchInput = page.getByPlaceholder('Search');
    this.adminLink = page.getByRole('link', { name: 'Admin' });
    this.pimLink = page.getByRole('link', { name: 'PIM' });
    this.leaveLink = page.getByRole('link', { name: 'Leave' });
    this.timeLink = page.getByRole('link', { name: 'Time' });
    this.recruitmentLink = page.getByRole('link', { name: 'Recruitment' });
    this.myInfoLink = page.getByRole('link', { name: 'My Info' });
    this.performanceLink = page.getByRole('link', { name: 'Performance' });
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.directoryLink = page.getByRole('link', { name: 'Directory' });
    this.maintenanceLink = page.getByRole('link', { name: 'Maintenance' });
    this.claimLink = page.getByRole('link', { name: 'Claim' });
    this.buzzLink = page.getByRole('link', { name: 'Buzz' });
  }

//   /**
//    * Search for a specific module in the sidebar
//    * @param {string} query - Term to search for
//    */

  async searchSidebar(query) {
    await this.searchInput.fill(query);
  }



  // Navigation Helper Methods
  async clickAdmin() { await this.adminLink.click(); }
  async clickPIM() { await this.pimLink.click(); }
  async clickLeave() { await this.leaveLink.click(); }
  async clickTime() { await this.timeLink.click(); }
  async clickRecruitment() { await this.recruitmentLink.click(); }
  async clickMyInfo() { await this.myInfoLink.click(); }
  async clickPerformance() { await this.performanceLink.click(); }
  async clickDashboard() { await this.dashboardLink.click(); }
  async clickDirectory() { await this.directoryLink.click(); }
  async clickMaintenance() { await this.maintenanceLink.click(); }
  async clickClaim() { await this.claimLink.click(); }
  async clickBuzz() { await this.buzzLink.click(); }
}


export default  SidebarComponent ;