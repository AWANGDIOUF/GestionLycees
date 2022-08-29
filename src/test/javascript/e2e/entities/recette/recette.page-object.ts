import { element, by, ElementFinder } from 'protractor';

export class RecetteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-recette div table .btn-danger'));
  title = element.all(by.css('jhi-recette div h2#page-heading span')).first();
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

export class RecetteUpdatePage {
  pageTitle = element(by.id('jhi-recette-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  typeSelect = element(by.id('field_type'));
  autreRecetteInput = element(by.id('field_autreRecette'));
  typeRessourceInput = element(by.id('field_typeRessource'));
  montantInput = element(by.id('field_montant'));
  dateInput = element(by.id('field_date'));

  depenseSelect = element(by.id('field_depense'));
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

  async setTypeSelect(type: string): Promise<void> {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect(): Promise<string> {
    return await this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption(): Promise<void> {
    await this.typeSelect.all(by.tagName('option')).last().click();
  }

  async setAutreRecetteInput(autreRecette: string): Promise<void> {
    await this.autreRecetteInput.sendKeys(autreRecette);
  }

  async getAutreRecetteInput(): Promise<string> {
    return await this.autreRecetteInput.getAttribute('value');
  }

  async setTypeRessourceInput(typeRessource: string): Promise<void> {
    await this.typeRessourceInput.sendKeys(typeRessource);
  }

  async getTypeRessourceInput(): Promise<string> {
    return await this.typeRessourceInput.getAttribute('value');
  }

  async setMontantInput(montant: string): Promise<void> {
    await this.montantInput.sendKeys(montant);
  }

  async getMontantInput(): Promise<string> {
    return await this.montantInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async depenseSelectLastOption(): Promise<void> {
    await this.depenseSelect.all(by.tagName('option')).last().click();
  }

  async depenseSelectOption(option: string): Promise<void> {
    await this.depenseSelect.sendKeys(option);
  }

  getDepenseSelect(): ElementFinder {
    return this.depenseSelect;
  }

  async getDepenseSelectedOption(): Promise<string> {
    return await this.depenseSelect.element(by.css('option:checked')).getText();
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

export class RecetteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-recette-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-recette'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
