import { element, by, ElementFinder } from 'protractor';

export class IventaireDesMatetiereComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-iventaire-des-matetiere div table .btn-danger'));
  title = element.all(by.css('jhi-iventaire-des-matetiere div h2#page-heading span')).first();
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

export class IventaireDesMatetiereUpdatePage {
  pageTitle = element(by.id('jhi-iventaire-des-matetiere-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  groupSelect = element(by.id('field_group'));
  designationMembreInput = element(by.id('file_designationMembre'));
  pvDinventaireInput = element(by.id('file_pvDinventaire'));

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

  async setGroupSelect(group: string): Promise<void> {
    await this.groupSelect.sendKeys(group);
  }

  async getGroupSelect(): Promise<string> {
    return await this.groupSelect.element(by.css('option:checked')).getText();
  }

  async groupSelectLastOption(): Promise<void> {
    await this.groupSelect.all(by.tagName('option')).last().click();
  }

  async setDesignationMembreInput(designationMembre: string): Promise<void> {
    await this.designationMembreInput.sendKeys(designationMembre);
  }

  async getDesignationMembreInput(): Promise<string> {
    return await this.designationMembreInput.getAttribute('value');
  }

  async setPvDinventaireInput(pvDinventaire: string): Promise<void> {
    await this.pvDinventaireInput.sendKeys(pvDinventaire);
  }

  async getPvDinventaireInput(): Promise<string> {
    return await this.pvDinventaireInput.getAttribute('value');
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

export class IventaireDesMatetiereDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-iventaireDesMatetiere-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-iventaireDesMatetiere'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
