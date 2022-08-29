import { element, by, ElementFinder } from 'protractor';

export class AttributionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-attribution div table .btn-danger'));
  title = element.all(by.css('jhi-attribution div h2#page-heading span')).first();
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

export class AttributionUpdatePage {
  pageTitle = element(by.id('jhi-attribution-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  beneficiaireInput = element(by.id('field_beneficiaire'));
  fonctionInput = element(by.id('field_fonction'));
  dateInput = element(by.id('field_date'));

  lyceesTechniquesSelect = element(by.id('field_lyceesTechniques'));
  comptableMatiereSelect = element(by.id('field_comptableMatiere'));
  receptionSelect = element(by.id('field_reception'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setBeneficiaireInput(beneficiaire: string): Promise<void> {
    await this.beneficiaireInput.sendKeys(beneficiaire);
  }

  async getBeneficiaireInput(): Promise<string> {
    return await this.beneficiaireInput.getAttribute('value');
  }

  async setFonctionInput(fonction: string): Promise<void> {
    await this.fonctionInput.sendKeys(fonction);
  }

  async getFonctionInput(): Promise<string> {
    return await this.fonctionInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
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

  async comptableMatiereSelectLastOption(): Promise<void> {
    await this.comptableMatiereSelect.all(by.tagName('option')).last().click();
  }

  async comptableMatiereSelectOption(option: string): Promise<void> {
    await this.comptableMatiereSelect.sendKeys(option);
  }

  getComptableMatiereSelect(): ElementFinder {
    return this.comptableMatiereSelect;
  }

  async getComptableMatiereSelectedOption(): Promise<string> {
    return await this.comptableMatiereSelect.element(by.css('option:checked')).getText();
  }

  async receptionSelectLastOption(): Promise<void> {
    await this.receptionSelect.all(by.tagName('option')).last().click();
  }

  async receptionSelectOption(option: string): Promise<void> {
    await this.receptionSelect.sendKeys(option);
  }

  getReceptionSelect(): ElementFinder {
    return this.receptionSelect;
  }

  async getReceptionSelectedOption(): Promise<string> {
    return await this.receptionSelect.element(by.css('option:checked')).getText();
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

export class AttributionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-attribution-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-attribution'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
