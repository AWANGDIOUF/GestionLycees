import { element, by, ElementFinder } from 'protractor';

export class ComptableFinancierComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-comptable-financier div table .btn-danger'));
  title = element.all(by.css('jhi-comptable-financier div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class ComptableFinancierUpdatePage {
  pageTitle = element(by.id('jhi-comptable-financier-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nomPrenomInput = element(by.id('field_nomPrenom'));

  userSelect = element(by.id('field_user'));
  nomLyceeSelect = element(by.id('field_nomLycee'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setNomPrenomInput(nomPrenom: string): Promise<void> {
    await this.nomPrenomInput.sendKeys(nomPrenom);
  }

  async getNomPrenomInput(): Promise<string> {
    return await this.nomPrenomInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async nomLyceeSelectLastOption(): Promise<void> {
    await this.nomLyceeSelect.all(by.tagName('option')).last().click();
  }

  async nomLyceeSelectOption(option: string): Promise<void> {
    await this.nomLyceeSelect.sendKeys(option);
  }

  getNomLyceeSelect(): ElementFinder {
    return this.nomLyceeSelect;
  }

  async getNomLyceeSelectedOption(): Promise<string> {
    return await this.nomLyceeSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ComptableFinancierDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-comptableFinancier-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-comptableFinancier'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
