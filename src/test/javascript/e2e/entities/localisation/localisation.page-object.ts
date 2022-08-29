import { element, by, ElementFinder } from 'protractor';

export class LocalisationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-localisation div table .btn-danger'));
  title = element.all(by.css('jhi-localisation div h2#page-heading span')).first();
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

export class LocalisationUpdatePage {
  pageTitle = element(by.id('jhi-localisation-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  regionSelect = element(by.id('field_region'));
  departementDakarSelect = element(by.id('field_departementDakar'));
  departementDiourbelSelect = element(by.id('field_departementDiourbel'));
  departementFatickSelect = element(by.id('field_departementFatick'));
  departementKaffrineSelect = element(by.id('field_departementKaffrine'));
  departementKaolackSelect = element(by.id('field_departementKaolack'));
  departementKedougouSelect = element(by.id('field_departementKedougou'));
  departementKoldaSelect = element(by.id('field_departementKolda'));
  departementLougaSelect = element(by.id('field_departementLouga'));
  departementMatamSelect = element(by.id('field_departementMatam'));
  departementSaintSelect = element(by.id('field_departementSaint'));
  departementSedhiouSelect = element(by.id('field_departementSedhiou'));
  departementTambacoundaSelect = element(by.id('field_departementTambacounda'));
  departementThisSelect = element(by.id('field_departementThis'));
  departementZicSelect = element(by.id('field_departementZic'));
  iaInput = element(by.id('field_ia'));

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

  async setRegionSelect(region: string): Promise<void> {
    await this.regionSelect.sendKeys(region);
  }

  async getRegionSelect(): Promise<string> {
    return await this.regionSelect.element(by.css('option:checked')).getText();
  }

  async regionSelectLastOption(): Promise<void> {
    await this.regionSelect.all(by.tagName('option')).last().click();
  }

  async setDepartementDakarSelect(departementDakar: string): Promise<void> {
    await this.departementDakarSelect.sendKeys(departementDakar);
  }

  async getDepartementDakarSelect(): Promise<string> {
    return await this.departementDakarSelect.element(by.css('option:checked')).getText();
  }

  async departementDakarSelectLastOption(): Promise<void> {
    await this.departementDakarSelect.all(by.tagName('option')).last().click();
  }

  async setDepartementDiourbelSelect(departementDiourbel: string): Promise<void> {
    await this.departementDiourbelSelect.sendKeys(departementDiourbel);
  }

  async getDepartementDiourbelSelect(): Promise<string> {
    return await this.departementDiourbelSelect.element(by.css('option:checked')).getText();
  }

  async departementDiourbelSelectLastOption(): Promise<void> {
    await this.departementDiourbelSelect.all(by.tagName('option')).last().click();
  }

  async setDepartementFatickSelect(departementFatick: string): Promise<void> {
    await this.departementFatickSelect.sendKeys(departementFatick);
  }

  async getDepartementFatickSelect(): Promise<string> {
    return await this.departementFatickSelect.element(by.css('option:checked')).getText();
  }

  async departementFatickSelectLastOption(): Promise<void> {
    await this.departementFatickSelect.all(by.tagName('option')).last().click();
  }

  async setDepartementKaffrineSelect(departementKaffrine: string): Promise<void> {
    await this.departementKaffrineSelect.sendKeys(departementKaffrine);
  }

  async getDepartementKaffrineSelect(): Promise<string> {
    return await this.departementKaffrineSelect.element(by.css('option:checked')).getText();
  }

  async departementKaffrineSelectLastOption(): Promise<void> {
    await this.departementKaffrineSelect.all(by.tagName('option')).last().click();
  }

  async setDepartementKaolackSelect(departementKaolack: string): Promise<void> {
    await this.departementKaolackSelect.sendKeys(departementKaolack);
  }

  async getDepartementKaolackSelect(): Promise<string> {
    return await this.departementKaolackSelect.element(by.css('option:checked')).getText();
  }

  async departementKaolackSelectLastOption(): Promise<void> {
    await this.departementKaolackSelect.all(by.tagName('option')).last().click();
  }

  async setDepartementKedougouSelect(departementKedougou: string): Promise<void> {
    await this.departementKedougouSelect.sendKeys(departementKedougou);
  }

  async getDepartementKedougouSelect(): Promise<string> {
    return await this.departementKedougouSelect.element(by.css('option:checked')).getText();
  }

  async departementKedougouSelectLastOption(): Promise<void> {
    await this.departementKedougouSelect.all(by.tagName('option')).last().click();
  }

  async setDepartementKoldaSelect(departementKolda: string): Promise<void> {
    await this.departementKoldaSelect.sendKeys(departementKolda);
  }

  async getDepartementKoldaSelect(): Promise<string> {
    return await this.departementKoldaSelect.element(by.css('option:checked')).getText();
  }

  async departementKoldaSelectLastOption(): Promise<void> {
    await this.departementKoldaSelect.all(by.tagName('option')).last().click();
  }

  async setDepartementLougaSelect(departementLouga: string): Promise<void> {
    await this.departementLougaSelect.sendKeys(departementLouga);
  }

  async getDepartementLougaSelect(): Promise<string> {
    return await this.departementLougaSelect.element(by.css('option:checked')).getText();
  }

  async departementLougaSelectLastOption(): Promise<void> {
    await this.departementLougaSelect.all(by.tagName('option')).last().click();
  }

  async setDepartementMatamSelect(departementMatam: string): Promise<void> {
    await this.departementMatamSelect.sendKeys(departementMatam);
  }

  async getDepartementMatamSelect(): Promise<string> {
    return await this.departementMatamSelect.element(by.css('option:checked')).getText();
  }

  async departementMatamSelectLastOption(): Promise<void> {
    await this.departementMatamSelect.all(by.tagName('option')).last().click();
  }

  async setDepartementSaintSelect(departementSaint: string): Promise<void> {
    await this.departementSaintSelect.sendKeys(departementSaint);
  }

  async getDepartementSaintSelect(): Promise<string> {
    return await this.departementSaintSelect.element(by.css('option:checked')).getText();
  }

  async departementSaintSelectLastOption(): Promise<void> {
    await this.departementSaintSelect.all(by.tagName('option')).last().click();
  }

  async setDepartementSedhiouSelect(departementSedhiou: string): Promise<void> {
    await this.departementSedhiouSelect.sendKeys(departementSedhiou);
  }

  async getDepartementSedhiouSelect(): Promise<string> {
    return await this.departementSedhiouSelect.element(by.css('option:checked')).getText();
  }

  async departementSedhiouSelectLastOption(): Promise<void> {
    await this.departementSedhiouSelect.all(by.tagName('option')).last().click();
  }

  async setDepartementTambacoundaSelect(departementTambacounda: string): Promise<void> {
    await this.departementTambacoundaSelect.sendKeys(departementTambacounda);
  }

  async getDepartementTambacoundaSelect(): Promise<string> {
    return await this.departementTambacoundaSelect.element(by.css('option:checked')).getText();
  }

  async departementTambacoundaSelectLastOption(): Promise<void> {
    await this.departementTambacoundaSelect.all(by.tagName('option')).last().click();
  }

  async setDepartementThisSelect(departementThis: string): Promise<void> {
    await this.departementThisSelect.sendKeys(departementThis);
  }

  async getDepartementThisSelect(): Promise<string> {
    return await this.departementThisSelect.element(by.css('option:checked')).getText();
  }

  async departementThisSelectLastOption(): Promise<void> {
    await this.departementThisSelect.all(by.tagName('option')).last().click();
  }

  async setDepartementZicSelect(departementZic: string): Promise<void> {
    await this.departementZicSelect.sendKeys(departementZic);
  }

  async getDepartementZicSelect(): Promise<string> {
    return await this.departementZicSelect.element(by.css('option:checked')).getText();
  }

  async departementZicSelectLastOption(): Promise<void> {
    await this.departementZicSelect.all(by.tagName('option')).last().click();
  }

  async setIaInput(ia: string): Promise<void> {
    await this.iaInput.sendKeys(ia);
  }

  async getIaInput(): Promise<string> {
    return await this.iaInput.getAttribute('value');
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

export class LocalisationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-localisation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-localisation'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
