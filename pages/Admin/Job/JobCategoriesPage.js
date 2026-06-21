
 
 class JobEmploymentStatusPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.statusNameInput = page.locator('form').getByRole('textbox').first();
    
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async clickAdd() { await this.addButton.click(); }
  async fillStatusName(name) { await this.statusNameInput.fill(name); }

  async clickCancel() { await this.cancelButton.click(); }
  async clickSave() { await this.saveButton.click(); }
}


export default { JobEmploymentStatusPage };

