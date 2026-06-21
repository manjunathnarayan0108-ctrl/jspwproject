class JobPayGradePage {
  /**
   * @param {import('@playwright/test').Page} page
   */


  constructor(page) {
    this.page = page;

    // Locators
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.nameInput = page.locator('form').getByRole('textbox').first();
    
    // Currency Sub-Form Locators (Appears after adding a grade)
    this.addCurrencyButton = page.getByRole('button', { name: 'Add' }).last();
    this.currencyDropdown = page.locator('.oxd-select-text');
    this.minimumSalaryInput = page.locator('form').locator('input').nth(1);
    this.maximumSalaryInput = page.locator('form').locator('input').nth(2);

    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async clickAddGrade() { await this.addButton.click(); }
  async fillGradeName(name) { await this.nameInput.fill(name); }
  
  async addCurrency(currencyName, minSalary, maxSalary) {
    await this.addCurrencyButton.click();
    await this.currencyDropdown.click();
    await this.page.getByRole('option', { name: currencyName }).click();
    await this.minimumSalaryInput.fill(minSalary.toString());
    await this.maximumSalaryInput.fill(maxSalary.toString());
  }

  

  async clickCancel() { await this.cancelButton.click(); }
  async clickSave() { await this.saveButton.click(); }
}
export default { JobPayGradesPage };