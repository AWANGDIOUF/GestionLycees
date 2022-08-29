import { element, by, ElementFinder } from 'protractor';

export class BesoinComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-besoin div table .btn-danger'));
  title = element.all(by.css('jhi-besoin div h2#page-heading span')).first();
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

export class BesoinUpdatePage {
  pageTitle = element(by.id('jhi-besoin-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  typeSelect = element(by.id('field_type'));
  autreBesoinInput = element(by.id('field_autreBesoin'));
  designationInput = element(by.id('field_designation'));
  etatActuelInput = element(by.id('field_etatActuel'));
  interventionSouhaiteeInput = element(by.id('field_interventionSouhaitee'));
  justificationInput = element(by.id('field_justification'));

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

  async setAutreBesoinInput(autreBesoin: string): Promise<void> {
    await this.autreBesoinInput.sendKeys(autreBesoin);
  }

  async getAutreBesoinInput(): Promise<string> {
    return await this.autreBesoinInput.getAttribute('value');
  }

  async setDesignationInput(designation: string): Promise<void> {
    await this.designationInput.sendKeys(designation);
  }

  async getDesignationInput(): Promise<string> {
    return await this.designationInput.getAttribute('value');
  }

  async setEtatActuelInput(etatActuel: string): Promise<void> {
    await this.etatActuelInput.sendKeys(etatActuel);
  }

  async getEtatActuelInput(): Promise<string> {
    return await this.etatActuelInput.getAttribute('value');
  }

  async setInterventionSouhaiteeInput(interventionSouhaitee: string): Promise<void> {
    await this.interventionSouhaiteeInput.sendKeys(interventionSouhaitee);
  }

  async getInterventionSouhaiteeInput(): Promise<string> {
    return await this.interventionSouhaiteeInput.getAttribute('value');
  }

  async setJustificationInput(justification: string): Promise<void> {
    await this.justificationInput.sendKeys(justification);
  }

  async getJustificationInput(): Promise<string> {
    return await this.justificationInput.getAttribute('value');
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

export class BesoinDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-besoin-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-besoin'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
