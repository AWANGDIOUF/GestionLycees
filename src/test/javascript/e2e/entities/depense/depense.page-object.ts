import { element, by, ElementFinder } from 'protractor';

export class DepenseComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-depense div table .btn-danger'));
  title = element.all(by.css('jhi-depense div h2#page-heading span')).first();
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

export class DepenseUpdatePage {
  pageTitle = element(by.id('jhi-depense-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  typeDepenseSelect = element(by.id('field_typeDepense'));
  autreDepenseInput = element(by.id('field_autreDepense'));
  descriptionInput = element(by.id('field_description'));
  montantDepenseInput = element(by.id('field_montantDepense'));

  lyceesTechniquesSelect = element(by.id('field_lyceesTechniques'));
  comptableFinancierSelect = element(by.id('field_comptableFinancier'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setTypeDepenseSelect(typeDepense: string): Promise<void> {
    await this.typeDepenseSelect.sendKeys(typeDepense);
  }

  async getTypeDepenseSelect(): Promise<string> {
    return await this.typeDepenseSelect.element(by.css('option:checked')).getText();
  }

  async typeDepenseSelectLastOption(): Promise<void> {
    await this.typeDepenseSelect.all(by.tagName('option')).last().click();
  }

  async setAutreDepenseInput(autreDepense: string): Promise<void> {
    await this.autreDepenseInput.sendKeys(autreDepense);
  }

  async getAutreDepenseInput(): Promise<string> {
    return await this.autreDepenseInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setMontantDepenseInput(montantDepense: string): Promise<void> {
    await this.montantDepenseInput.sendKeys(montantDepense);
  }

  async getMontantDepenseInput(): Promise<string> {
    return await this.montantDepenseInput.getAttribute('value');
  }

  async lyceesTechniquesSelectLastOption(): Promise<void> {
    await this.lyceesTechniquesSelect.all(by.tagName('option')).last().click();
  }

  async lyceesTechniquesSelectOption(option: string): Promise<void> {
    await this.lyceesTechniquesSelect.sendKeys(option);
  }

  getLyceesTechniquesSelect(): ElementFinder {
    return this.lyceesTechniquesSelect;
  }

  async getLyceesTechniquesSelectedOption(): Promise<string> {
    return await this.lyceesTechniquesSelect.element(by.css('option:checked')).getText();
  }

  async comptableFinancierSelectLastOption(): Promise<void> {
    await this.comptableFinancierSelect.all(by.tagName('option')).last().click();
  }

  async comptableFinancierSelectOption(option: string): Promise<void> {
    await this.comptableFinancierSelect.sendKeys(option);
  }

  getComptableFinancierSelect(): ElementFinder {
    return this.comptableFinancierSelect;
  }

  async getComptableFinancierSelectedOption(): Promise<string> {
    return await this.comptableFinancierSelect.element(by.css('option:checked')).getText();
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

export class DepenseDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-depense-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-depense'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
