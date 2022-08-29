import { element, by, ElementFinder } from 'protractor';

export class ProgrammeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-programme div table .btn-danger'));
  title = element.all(by.css('jhi-programme div h2#page-heading span')).first();
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

export class ProgrammeUpdatePage {
  pageTitle = element(by.id('jhi-programme-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nomProgrammeInput = element(by.id('field_nomProgramme'));

  lyceesTechniquesSelect = element(by.id('field_lyceesTechniques'));
  directeurSelect = element(by.id('field_directeur'));
  filiereSelect = element(by.id('field_filiere'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setNomProgrammeInput(nomProgramme: string): Promise<void> {
    await this.nomProgrammeInput.sendKeys(nomProgramme);
  }

  async getNomProgrammeInput(): Promise<string> {
    return await this.nomProgrammeInput.getAttribute('value');
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

export class ProgrammeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-programme-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-programme'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
