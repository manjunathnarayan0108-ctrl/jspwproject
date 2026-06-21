class JobTitlesPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  
  constructor(page) {
    this.page = page;

    // Locators
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.jobTitleInput = page.locator('form').getByRole('textbox').first();
    this.jobDescriptionTextArea = page.getByPlaceholder('Type description here');
    this.jobSpecificationFile = page.locator('input[type="file"]');
    this.noteTextArea = page.getByPlaceholder('Type note here');
    
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async clickAdd() { await this.addButton.click(); }
  
  async fillJobTitle(title) { await this.jobTitleInput.fill(title); }
  async fillDescription(desc) { await this.jobDescriptionTextArea.fill(desc); }
  async uploadSpecification(filePath) { await this.jobSpecificationFile.setInputFiles(filePath); }
  async fillNote(note) { await this.noteTextArea.fill(note); }

  async clickCancel() { await this.cancelButton.click(); }
  async clickSave() { await this.saveButton.click(); }
}
module.exports = { JobTitlesPage };