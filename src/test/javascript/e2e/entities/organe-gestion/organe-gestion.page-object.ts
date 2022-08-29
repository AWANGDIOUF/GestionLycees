import { element, by, ElementFinder } from 'protractor';

export class OrganeGestionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-organe-gestion div table .btn-danger'));
  title = element.all(by.css('jhi-organe-gestion div h2#page-heading span')).first();
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

export class OrganeGestionUpdatePage {
  pageTitle = element(by.id('jhi-organe-gestion-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  typeSelect = element(by.id('field_type'));
  autreTypeInput = element(by.id('field_autreType'));
  fonctionnelSelect = element(by.id('field_fonctionnel'));
  activiteInput = element(by.id('field_activite'));
  dateActiviteInput = element(by.id('field_dateActivite'));
  rapportInput = element(by.id('file_rapport'));

  lyceesTechniquesSelect = element(by.id('field_lyceesTechniques'));
  proviseurSelect = element(by.id('field_proviseur'));

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

  async setAutreTypeInput(autreType: string): Promise<void> {
    await this.autreTypeInput.sendKeys(autreType);
  }

  async getAutreTypeInput(): Promise<string> {
    return await this.autreTypeInput.getAttribute('value');
  }

  async setFonctionnelSelect(fonctionnel: string): Promise<void> {
    await this.fonctionnelSelect.sendKeys(fonctionnel);
  }

  async getFonctionnelSelect(): Promise<string> {
    return await this.fonctionnelSelect.element(by.css('option:checked')).getText();
  }

  async fonctionnelSelectLastOption(): Promise<void> {
    await this.fonctionnelSelect.all(by.tagName('option')).last().click();
  }

  async setActiviteInput(activite: string): Promise<void> {
    await this.activiteInput.sendKeys(activite);
  }

  async getActiviteInput(): Promise<string> {
    return await this.activiteInput.getAttribute('value');
  }

  async setDateActiviteInput(dateActivite: string): Promise<void> {
    await this.dateActiviteInput.sendKeys(dateActivite);
  }

  async getDateActiviteInput(): Promise<string> {
    return await this.dateActiviteInput.getAttribute('value');
  }

  async setRapportInput(rapport: string): Promise<void> {
    await this.rapportInput.sendKeys(rapport);
  }

  async getRapportInput(): Promise<string> {
    return await this.rapportInput.getAttribute('value');
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

  async proviseurSelectLastOption(): Promise<void> {
    await this.proviseurSelect.all(by.tagName('option')).last().click();
  }

  async proviseurSelectOption(option: string): Promise<void> {
    await this.proviseurSelect.sendKeys(option);
  }

  getProviseurSelect(): ElementFinder {
    return this.proviseurSelect;
  }

  async getProviseurSelectedOption(): Promise<string> {
    return await this.proviseurSelect.element(by.css('option:checked')).getText();
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

export class OrganeGestionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-organeGestion-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-organeGestion'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
