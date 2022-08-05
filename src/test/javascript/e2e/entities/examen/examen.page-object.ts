import { element, by, ElementFinder } from 'protractor';

export class ExamenComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-examen div table .btn-danger'));
  title = element.all(by.css('jhi-examen div h2#page-heading span')).first();
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

export class ExamenUpdatePage {
  pageTitle = element(by.id('jhi-examen-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  typeSelect = element(by.id('field_type'));
  autresInput = element(by.id('field_autres'));
  optionSelect = element(by.id('field_option'));
  statusSelect = element(by.id('field_status'));

  lyceesTechniquesSelect = element(by.id('field_lyceesTechniques'));
  directeurSelect = element(by.id('field_directeur'));
  serieSelect = element(by.id('field_serie'));
  filiereSelect = element(by.id('field_filiere'));
  apprenantSelect = element(by.id('field_apprenant'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setTypeSelect(type: string): Promise<void> {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect(): Promise<string> {
    return await this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption(): Promise<void> {
    await this.typeSelect.all(by.tagName('option')).last().click();
  }

  async setAutresInput(autres: string): Promise<void> {
    await this.autresInput.sendKeys(autres);
  }

  async getAutresInput(): Promise<string> {
    return await this.autresInput.getAttribute('value');
  }

  async setOptionSelect(option: string): Promise<void> {
    await this.optionSelect.sendKeys(option);
  }

  async getOptionSelect(): Promise<string> {
    return await this.optionSelect.element(by.css('option:checked')).getText();
  }

  async optionSelectLastOption(): Promise<void> {
    await this.optionSelect.all(by.tagName('option')).last().click();
  }

  async setStatusSelect(status: string): Promise<void> {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect(): Promise<string> {
    return await this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption(): Promise<void> {
    await this.statusSelect.all(by.tagName('option')).last().click();
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

  async directeurSelectLastOption(): Promise<void> {
    await this.directeurSelect.all(by.tagName('option')).last().click();
  }

  async directeurSelectOption(option: string): Promise<void> {
    await this.directeurSelect.sendKeys(option);
  }

  getDirecteurSelect(): ElementFinder {
    return this.directeurSelect;
  }

  async getDirecteurSelectedOption(): Promise<string> {
    return await this.directeurSelect.element(by.css('option:checked')).getText();
  }

  async serieSelectLastOption(): Promise<void> {
    await this.serieSelect.all(by.tagName('option')).last().click();
  }

  async serieSelectOption(option: string): Promise<void> {
    await this.serieSelect.sendKeys(option);
  }

  getSerieSelect(): ElementFinder {
    return this.serieSelect;
  }

  async getSerieSelectedOption(): Promise<string> {
    return await this.serieSelect.element(by.css('option:checked')).getText();
  }

  async filiereSelectLastOption(): Promise<void> {
    await this.filiereSelect.all(by.tagName('option')).last().click();
  }

  async filiereSelectOption(option: string): Promise<void> {
    await this.filiereSelect.sendKeys(option);
  }

  getFiliereSelect(): ElementFinder {
    return this.filiereSelect;
  }

  async getFiliereSelectedOption(): Promise<string> {
    return await this.filiereSelect.element(by.css('option:checked')).getText();
  }

  async apprenantSelectLastOption(): Promise<void> {
    await this.apprenantSelect.all(by.tagName('option')).last().click();
  }

  async apprenantSelectOption(option: string): Promise<void> {
    await this.apprenantSelect.sendKeys(option);
  }

  getApprenantSelect(): ElementFinder {
    return this.apprenantSelect;
  }

  async getApprenantSelectedOption(): Promise<string> {
    return await this.apprenantSelect.element(by.css('option:checked')).getText();
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

export class ExamenDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-examen-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-examen'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
