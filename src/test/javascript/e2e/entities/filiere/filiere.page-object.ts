import { element, by, ElementFinder } from 'protractor';

export class FiliereComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-filiere div table .btn-danger'));
  title = element.all(by.css('jhi-filiere div h2#page-heading span')).first();
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

export class FiliereUpdatePage {
  pageTitle = element(by.id('jhi-filiere-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nomFiliereSelect = element(by.id('field_nomFiliere'));
  nomAutreInput = element(by.id('field_nomAutre'));

  lyceesTechniquesSelect = element(by.id('field_lyceesTechniques'));
  directeurSelect = element(by.id('field_directeur'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setNomFiliereSelect(nomFiliere: string): Promise<void> {
    await this.nomFiliereSelect.sendKeys(nomFiliere);
  }

  async getNomFiliereSelect(): Promise<string> {
    return await this.nomFiliereSelect.element(by.css('option:checked')).getText();
  }

  async nomFiliereSelectLastOption(): Promise<void> {
    await this.nomFiliereSelect.all(by.tagName('option')).last().click();
  }

  async setNomAutreInput(nomAutre: string): Promise<void> {
    await this.nomAutreInput.sendKeys(nomAutre);
  }

  async getNomAutreInput(): Promise<string> {
    return await this.nomAutreInput.getAttribute('value');
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

export class FiliereDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-filiere-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-filiere'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
