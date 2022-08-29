import { element, by, ElementFinder } from 'protractor';

export class ReformeMatiereComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-reforme-matiere div table .btn-danger'));
  title = element.all(by.css('jhi-reforme-matiere div h2#page-heading span')).first();
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

export class ReformeMatiereUpdatePage {
  pageTitle = element(by.id('jhi-reforme-matiere-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  groupSelect = element(by.id('field_group'));
  designationDesmembreInput = element(by.id('file_designationDesmembre'));
  pvReformeInput = element(by.id('file_pvReforme'));
  sortieDefinitiveInput = element(by.id('file_sortieDefinitive'));
  certificatAdministratifInput = element(by.id('file_certificatAdministratif'));

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

  async setDesignationDesmembreInput(designationDesmembre: string): Promise<void> {
    await this.designationDesmembreInput.sendKeys(designationDesmembre);
  }

  async getDesignationDesmembreInput(): Promise<string> {
    return await this.designationDesmembreInput.getAttribute('value');
  }

  async setPvReformeInput(pvReforme: string): Promise<void> {
    await this.pvReformeInput.sendKeys(pvReforme);
  }

  async getPvReformeInput(): Promise<string> {
    return await this.pvReformeInput.getAttribute('value');
  }

  async setSortieDefinitiveInput(sortieDefinitive: string): Promise<void> {
    await this.sortieDefinitiveInput.sendKeys(sortieDefinitive);
  }

  async getSortieDefinitiveInput(): Promise<string> {
    return await this.sortieDefinitiveInput.getAttribute('value');
  }

  async setCertificatAdministratifInput(certificatAdministratif: string): Promise<void> {
    await this.certificatAdministratifInput.sendKeys(certificatAdministratif);
  }

  async getCertificatAdministratifInput(): Promise<string> {
    return await this.certificatAdministratifInput.getAttribute('value');
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

export class ReformeMatiereDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-reformeMatiere-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-reformeMatiere'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
