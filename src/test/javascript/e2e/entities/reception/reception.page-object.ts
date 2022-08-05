import { element, by, ElementFinder } from 'protractor';

export class ReceptionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-reception div table .btn-danger'));
  title = element.all(by.css('jhi-reception div h2#page-heading span')).first();
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

export class ReceptionUpdatePage {
  pageTitle = element(by.id('jhi-reception-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  libelleMaterielInput = element(by.id('field_libelleMateriel'));
  typeGroupSelect = element(by.id('field_typeGroup'));
  provenanceSelect = element(by.id('field_provenance'));
  fournisseurInput = element(by.id('field_fournisseur'));
  dateInput = element(by.id('field_date'));

  lyceesTechniquesSelect = element(by.id('field_lyceesTechniques'));
  comptableMatiereSelect = element(by.id('field_comptableMatiere'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setLibelleMaterielInput(libelleMateriel: string): Promise<void> {
    await this.libelleMaterielInput.sendKeys(libelleMateriel);
  }

  async getLibelleMaterielInput(): Promise<string> {
    return await this.libelleMaterielInput.getAttribute('value');
  }

  async setTypeGroupSelect(typeGroup: string): Promise<void> {
    await this.typeGroupSelect.sendKeys(typeGroup);
  }

  async getTypeGroupSelect(): Promise<string> {
    return await this.typeGroupSelect.element(by.css('option:checked')).getText();
  }

  async typeGroupSelectLastOption(): Promise<void> {
    await this.typeGroupSelect.all(by.tagName('option')).last().click();
  }

  async setProvenanceSelect(provenance: string): Promise<void> {
    await this.provenanceSelect.sendKeys(provenance);
  }

  async getProvenanceSelect(): Promise<string> {
    return await this.provenanceSelect.element(by.css('option:checked')).getText();
  }

  async provenanceSelectLastOption(): Promise<void> {
    await this.provenanceSelect.all(by.tagName('option')).last().click();
  }

  async setFournisseurInput(fournisseur: string): Promise<void> {
    await this.fournisseurInput.sendKeys(fournisseur);
  }

  async getFournisseurInput(): Promise<string> {
    return await this.fournisseurInput.getAttribute('value');
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

export class ReceptionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-reception-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-reception'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
