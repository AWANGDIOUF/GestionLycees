import { element, by, ElementFinder } from 'protractor';

export class ConcoursComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-concours div table .btn-danger'));
  title = element.all(by.css('jhi-concours div h2#page-heading span')).first();
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

export class ConcoursUpdatePage {
  pageTitle = element(by.id('jhi-concours-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nomConcoursInput = element(by.id('field_nomConcours'));
  dateOuvertureInput = element(by.id('field_dateOuverture'));
  dateClotureInput = element(by.id('field_dateCloture'));
  nbreCandidatsInput = element(by.id('field_nbreCandidats'));
  dateConcoursInput = element(by.id('field_dateConcours'));
  dateDeliberationInput = element(by.id('field_dateDeliberation'));
  nbreAdmisInput = element(by.id('field_nbreAdmis'));

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

  async setNomConcoursInput(nomConcours: string): Promise<void> {
    await this.nomConcoursInput.sendKeys(nomConcours);
  }

  async getNomConcoursInput(): Promise<string> {
    return await this.nomConcoursInput.getAttribute('value');
  }

  async setDateOuvertureInput(dateOuverture: string): Promise<void> {
    await this.dateOuvertureInput.sendKeys(dateOuverture);
  }

  async getDateOuvertureInput(): Promise<string> {
    return await this.dateOuvertureInput.getAttribute('value');
  }

  async setDateClotureInput(dateCloture: string): Promise<void> {
    await this.dateClotureInput.sendKeys(dateCloture);
  }

  async getDateClotureInput(): Promise<string> {
    return await this.dateClotureInput.getAttribute('value');
  }

  async setNbreCandidatsInput(nbreCandidats: string): Promise<void> {
    await this.nbreCandidatsInput.sendKeys(nbreCandidats);
  }

  async getNbreCandidatsInput(): Promise<string> {
    return await this.nbreCandidatsInput.getAttribute('value');
  }

  async setDateConcoursInput(dateConcours: string): Promise<void> {
    await this.dateConcoursInput.sendKeys(dateConcours);
  }

  async getDateConcoursInput(): Promise<string> {
    return await this.dateConcoursInput.getAttribute('value');
  }

  async setDateDeliberationInput(dateDeliberation: string): Promise<void> {
    await this.dateDeliberationInput.sendKeys(dateDeliberation);
  }

  async getDateDeliberationInput(): Promise<string> {
    return await this.dateDeliberationInput.getAttribute('value');
  }

  async setNbreAdmisInput(nbreAdmis: string): Promise<void> {
    await this.nbreAdmisInput.sendKeys(nbreAdmis);
  }

  async getNbreAdmisInput(): Promise<string> {
    return await this.nbreAdmisInput.getAttribute('value');
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

export class ConcoursDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-concours-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-concours'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
