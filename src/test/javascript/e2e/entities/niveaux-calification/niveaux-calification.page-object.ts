import { element, by, ElementFinder } from 'protractor';

export class NiveauxCalificationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-niveaux-calification div table .btn-danger'));
  title = element.all(by.css('jhi-niveaux-calification div h2#page-heading span')).first();
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

export class NiveauxCalificationUpdatePage {
  pageTitle = element(by.id('jhi-niveaux-calification-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  niveauCalificationInput = element(by.id('field_niveauCalification'));

  lyceesTechniquesSelect = element(by.id('field_lyceesTechniques'));
  directeurSelect = element(by.id('field_directeur'));
  programmeSelect = element(by.id('field_programme'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setNiveauCalificationInput(niveauCalification: string): Promise<void> {
    await this.niveauCalificationInput.sendKeys(niveauCalification);
  }

  async getNiveauCalificationInput(): Promise<string> {
    return await this.niveauCalificationInput.getAttribute('value');
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

  async programmeSelectLastOption(): Promise<void> {
    await this.programmeSelect.all(by.tagName('option')).last().click();
  }

  async programmeSelectOption(option: string): Promise<void> {
    await this.programmeSelect.sendKeys(option);
  }

  getProgrammeSelect(): ElementFinder {
    return this.programmeSelect;
  }

  async getProgrammeSelectedOption(): Promise<string> {
    return await this.programmeSelect.element(by.css('option:checked')).getText();
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

export class NiveauxCalificationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-niveauxCalification-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-niveauxCalification'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
