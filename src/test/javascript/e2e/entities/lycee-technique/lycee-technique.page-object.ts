import { element, by, ElementFinder } from 'protractor';

export class LyceeTechniqueComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-lycee-technique div table .btn-danger'));
  title = element.all(by.css('jhi-lycee-technique div h2#page-heading span')).first();
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

export class LyceeTechniqueUpdatePage {
  pageTitle = element(by.id('jhi-lycee-technique-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  prenomNomInput = element(by.id('field_prenomNom'));
  adresseInput = element(by.id('field_adresse'));
  mailInput = element(by.id('field_mail'));
  tel1Input = element(by.id('field_tel1'));
  tel2Input = element(by.id('field_tel2'));
  boitePostalInput = element(by.id('field_boitePostal'));
  decretCreationInput = element(by.id('field_decretCreation'));
  dateCreationInput = element(by.id('field_dateCreation'));
  regionSelect = element(by.id('field_region'));
  autreRegionInput = element(by.id('field_autreRegion'));
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
  departementZiguinchorSelect = element(by.id('field_departementZiguinchor'));
  autredepartementDakarInput = element(by.id('field_autredepartementDakar'));
  autredepartementDiourbelInput = element(by.id('field_autredepartementDiourbel'));
  autredepartementFatickInput = element(by.id('field_autredepartementFatick'));
  autredepartementKaffrineInput = element(by.id('field_autredepartementKaffrine'));
  autredepartementKaolackInput = element(by.id('field_autredepartementKaolack'));
  autredepartementKedougouInput = element(by.id('field_autredepartementKedougou'));
  autredepartementKoldaInput = element(by.id('field_autredepartementKolda'));
  autredepartementLougaInput = element(by.id('field_autredepartementLouga'));
  autredepartementMatamInput = element(by.id('field_autredepartementMatam'));
  autredepartementSaintInput = element(by.id('field_autredepartementSaint'));
  autredepartementSedhiouInput = element(by.id('field_autredepartementSedhiou'));
  autredepartementTambacoundaInput = element(by.id('field_autredepartementTambacounda'));
  autredepartementThisInput = element(by.id('field_autredepartementThis'));
  autredepartementZiguinchorInput = element(by.id('field_autredepartementZiguinchor'));
  communeInput = element(by.id('field_commune'));
  iaInput = element(by.id('field_ia'));

  proviseurSelect = element(by.id('field_proviseur'));
  nomLyceeSelect = element(by.id('field_nomLycee'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setPrenomNomInput(prenomNom: string): Promise<void> {
    await this.prenomNomInput.sendKeys(prenomNom);
  }

  async getPrenomNomInput(): Promise<string> {
    return await this.prenomNomInput.getAttribute('value');
  }

  async setAdresseInput(adresse: string): Promise<void> {
    await this.adresseInput.sendKeys(adresse);
  }

  async getAdresseInput(): Promise<string> {
    return await this.adresseInput.getAttribute('value');
  }

  async setMailInput(mail: string): Promise<void> {
    await this.mailInput.sendKeys(mail);
  }

  async getMailInput(): Promise<string> {
    return await this.mailInput.getAttribute('value');
  }

  async setTel1Input(tel1: string): Promise<void> {
    await this.tel1Input.sendKeys(tel1);
  }

  async getTel1Input(): Promise<string> {
    return await this.tel1Input.getAttribute('value');
  }

  async setTel2Input(tel2: string): Promise<void> {
    await this.tel2Input.sendKeys(tel2);
  }

  async getTel2Input(): Promise<string> {
    return await this.tel2Input.getAttribute('value');
  }

  async setBoitePostalInput(boitePostal: string): Promise<void> {
    await this.boitePostalInput.sendKeys(boitePostal);
  }

  async getBoitePostalInput(): Promise<string> {
    return await this.boitePostalInput.getAttribute('value');
  }

  async setDecretCreationInput(decretCreation: string): Promise<void> {
    await this.decretCreationInput.sendKeys(decretCreation);
  }

  async getDecretCreationInput(): Promise<string> {
    return await this.decretCreationInput.getAttribute('value');
  }

  async setDateCreationInput(dateCreation: string): Promise<void> {
    await this.dateCreationInput.sendKeys(dateCreation);
  }

  async getDateCreationInput(): Promise<string> {
    return await this.dateCreationInput.getAttribute('value');
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

  async setAutreRegionInput(autreRegion: string): Promise<void> {
    await this.autreRegionInput.sendKeys(autreRegion);
  }

  async getAutreRegionInput(): Promise<string> {
    return await this.autreRegionInput.getAttribute('value');
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

  async setDepartementZiguinchorSelect(departementZiguinchor: string): Promise<void> {
    await this.departementZiguinchorSelect.sendKeys(departementZiguinchor);
  }

  async getDepartementZiguinchorSelect(): Promise<string> {
    return await this.departementZiguinchorSelect.element(by.css('option:checked')).getText();
  }

  async departementZiguinchorSelectLastOption(): Promise<void> {
    await this.departementZiguinchorSelect.all(by.tagName('option')).last().click();
  }

  async setAutredepartementDakarInput(autredepartementDakar: string): Promise<void> {
    await this.autredepartementDakarInput.sendKeys(autredepartementDakar);
  }

  async getAutredepartementDakarInput(): Promise<string> {
    return await this.autredepartementDakarInput.getAttribute('value');
  }

  async setAutredepartementDiourbelInput(autredepartementDiourbel: string): Promise<void> {
    await this.autredepartementDiourbelInput.sendKeys(autredepartementDiourbel);
  }

  async getAutredepartementDiourbelInput(): Promise<string> {
    return await this.autredepartementDiourbelInput.getAttribute('value');
  }

  async setAutredepartementFatickInput(autredepartementFatick: string): Promise<void> {
    await this.autredepartementFatickInput.sendKeys(autredepartementFatick);
  }

  async getAutredepartementFatickInput(): Promise<string> {
    return await this.autredepartementFatickInput.getAttribute('value');
  }

  async setAutredepartementKaffrineInput(autredepartementKaffrine: string): Promise<void> {
    await this.autredepartementKaffrineInput.sendKeys(autredepartementKaffrine);
  }

  async getAutredepartementKaffrineInput(): Promise<string> {
    return await this.autredepartementKaffrineInput.getAttribute('value');
  }

  async setAutredepartementKaolackInput(autredepartementKaolack: string): Promise<void> {
    await this.autredepartementKaolackInput.sendKeys(autredepartementKaolack);
  }

  async getAutredepartementKaolackInput(): Promise<string> {
    return await this.autredepartementKaolackInput.getAttribute('value');
  }

  async setAutredepartementKedougouInput(autredepartementKedougou: string): Promise<void> {
    await this.autredepartementKedougouInput.sendKeys(autredepartementKedougou);
  }

  async getAutredepartementKedougouInput(): Promise<string> {
    return await this.autredepartementKedougouInput.getAttribute('value');
  }

  async setAutredepartementKoldaInput(autredepartementKolda: string): Promise<void> {
    await this.autredepartementKoldaInput.sendKeys(autredepartementKolda);
  }

  async getAutredepartementKoldaInput(): Promise<string> {
    return await this.autredepartementKoldaInput.getAttribute('value');
  }

  async setAutredepartementLougaInput(autredepartementLouga: string): Promise<void> {
    await this.autredepartementLougaInput.sendKeys(autredepartementLouga);
  }

  async getAutredepartementLougaInput(): Promise<string> {
    return await this.autredepartementLougaInput.getAttribute('value');
  }

  async setAutredepartementMatamInput(autredepartementMatam: string): Promise<void> {
    await this.autredepartementMatamInput.sendKeys(autredepartementMatam);
  }

  async getAutredepartementMatamInput(): Promise<string> {
    return await this.autredepartementMatamInput.getAttribute('value');
  }

  async setAutredepartementSaintInput(autredepartementSaint: string): Promise<void> {
    await this.autredepartementSaintInput.sendKeys(autredepartementSaint);
  }

  async getAutredepartementSaintInput(): Promise<string> {
    return await this.autredepartementSaintInput.getAttribute('value');
  }

  async setAutredepartementSedhiouInput(autredepartementSedhiou: string): Promise<void> {
    await this.autredepartementSedhiouInput.sendKeys(autredepartementSedhiou);
  }

  async getAutredepartementSedhiouInput(): Promise<string> {
    return await this.autredepartementSedhiouInput.getAttribute('value');
  }

  async setAutredepartementTambacoundaInput(autredepartementTambacounda: string): Promise<void> {
    await this.autredepartementTambacoundaInput.sendKeys(autredepartementTambacounda);
  }

  async getAutredepartementTambacoundaInput(): Promise<string> {
    return await this.autredepartementTambacoundaInput.getAttribute('value');
  }

  async setAutredepartementThisInput(autredepartementThis: string): Promise<void> {
    await this.autredepartementThisInput.sendKeys(autredepartementThis);
  }

  async getAutredepartementThisInput(): Promise<string> {
    return await this.autredepartementThisInput.getAttribute('value');
  }

  async setAutredepartementZiguinchorInput(autredepartementZiguinchor: string): Promise<void> {
    await this.autredepartementZiguinchorInput.sendKeys(autredepartementZiguinchor);
  }

  async getAutredepartementZiguinchorInput(): Promise<string> {
    return await this.autredepartementZiguinchorInput.getAttribute('value');
  }

  async setCommuneInput(commune: string): Promise<void> {
    await this.communeInput.sendKeys(commune);
  }

  async getCommuneInput(): Promise<string> {
    return await this.communeInput.getAttribute('value');
  }

  async setIaInput(ia: string): Promise<void> {
    await this.iaInput.sendKeys(ia);
  }

  async getIaInput(): Promise<string> {
    return await this.iaInput.getAttribute('value');
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

  async nomLyceeSelectLastOption(): Promise<void> {
    await this.nomLyceeSelect.all(by.tagName('option')).last().click();
  }

  async nomLyceeSelectOption(option: string): Promise<void> {
    await this.nomLyceeSelect.sendKeys(option);
  }

  getNomLyceeSelect(): ElementFinder {
    return this.nomLyceeSelect;
  }

  async getNomLyceeSelectedOption(): Promise<string> {
    return await this.nomLyceeSelect.element(by.css('option:checked')).getText();
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

export class LyceeTechniqueDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-lyceeTechnique-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-lyceeTechnique'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
