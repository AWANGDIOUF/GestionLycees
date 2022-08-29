import { element, by, ElementFinder } from 'protractor';

export class MaterielComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-materiel div table .btn-danger'));
  title = element.all(by.css('jhi-materiel div h2#page-heading span')).first();
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

export class MaterielUpdatePage {
  pageTitle = element(by.id('jhi-materiel-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  categorieMaterielSelect = element(by.id('field_categorieMateriel'));
  etatMaterielSelect = element(by.id('field_etatMateriel'));

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

  async setCategorieMaterielSelect(categorieMateriel: string): Promise<void> {
    await this.categorieMaterielSelect.sendKeys(categorieMateriel);
  }

  async getCategorieMaterielSelect(): Promise<string> {
    return await this.categorieMaterielSelect.element(by.css('option:checked')).getText();
  }

  async categorieMaterielSelectLastOption(): Promise<void> {
    await this.categorieMaterielSelect.all(by.tagName('option')).last().click();
  }

  async setEtatMaterielSelect(etatMateriel: string): Promise<void> {
    await this.etatMaterielSelect.sendKeys(etatMateriel);
  }

  async getEtatMaterielSelect(): Promise<string> {
    return await this.etatMaterielSelect.element(by.css('option:checked')).getText();
  }

  async etatMaterielSelectLastOption(): Promise<void> {
    await this.etatMaterielSelect.all(by.tagName('option')).last().click();
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

export class MaterielDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-materiel-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-materiel'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
