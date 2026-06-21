
class JobWorkShiftsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.shiftNameInput = page.locator('form').getByRole('textbox').first();
    
    // Time picker bounds
    this.workHoursFrom = page.locator('.oxd-time-input').first();
    this.workHoursTo = page.locator('.oxd-time-input').last();
    

    // Assign Employees element
    this.assignedEmployeesInput = page.getByPlaceholder('Type for hints...');

    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async clickAdd() { await this.addButton.click(); }
  async fillShiftName(name) { await this.shiftNameInput.fill(name); }
  
  async setShiftHours(fromTime, toTime) {
    await this.workHoursFrom.fill(fromTime);
    await this.workHoursTo.fill(toTime);
  }

  async assignEmployee(employeeName) {
    await this.assignedEmployeesInput.fill(employeeName);
    await this.page.getByRole('option', { name: employeeName }).first().click();
  }

  async clickCancel() { await this.cancelButton.click(); }
  async clickSave() { await this.saveButton.click(); }
}

export default { JobWorkShiftsPage };

