import { element, by, ElementFinder } from 'protractor';

export class PersonnelAdministratifComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-personnel-administratif div table .btn-danger'));
  title = element.all(by.css('jhi-personnel-administratif div h2#page-heading span')).first();
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

export class PersonnelAdministratifUpdatePage {
  pageTitle = element(by.id('jhi-personnel-administratif-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  matriculeInput = element(by.id('field_matricule'));
  nomInput = element(by.id('field_nom'));
  prenomInput = element(by.id('field_prenom'));
  situationMatrimonialeSelect = element(by.id('field_situationMatrimoniale'));
  fonctionSelect = element(by.id('field_fonction'));
  autreFonctionInput = element(by.id('field_autreFonction'));
  telephoneInput = element(by.id('field_telephone'));
  mailInput = element(by.id('field_mail'));

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

  async setMatriculeInput(matricule: string): Promise<void> {
    await this.matriculeInput.sendKeys(matricule);
  }

  async getMatriculeInput(): Promise<string> {
    return await this.matriculeInput.getAttribute('value');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setPrenomInput(prenom: string): Promise<void> {
    await this.prenomInput.sendKeys(prenom);
  }

  async getPrenomInput(): Promise<string> {
    return await this.prenomInput.getAttribute('value');
  }

  async setSituationMatrimonialeSelect(situationMatrimoniale: string): Promise<void> {
    await this.situationMatrimonialeSelect.sendKeys(situationMatrimoniale);
  }

  async getSituationMatrimonialeSelect(): Promise<string> {
    return await this.situationMatrimonialeSelect.element(by.css('option:checked')).getText();
  }

  async situationMatrimonialeSelectLastOption(): Promise<void> {
    await this.situationMatrimonialeSelect.all(by.tagName('option')).last().click();
  }

  async setFonctionSelect(fonction: string): Promise<void> {
    await this.fonctionSelect.sendKeys(fonction);
  }

  async getFonctionSelect(): Promise<string> {
    return await this.fonctionSelect.element(by.css('option:checked')).getText();
  }

  async fonctionSelectLastOption(): Promise<void> {
    await this.fonctionSelect.all(by.tagName('option')).last().click();
  }

  async setAutreFonctionInput(autreFonction: string): Promise<void> {
    await this.autreFonctionInput.sendKeys(autreFonction);
  }

  async getAutreFonctionInput(): Promise<string> {
    return await this.autreFonctionInput.getAttribute('value');
  }

  async setTelephoneInput(telephone: string): Promise<void> {
    await this.telephoneInput.sendKeys(telephone);
  }

  async getTelephoneInput(): Promise<string> {
    return await this.telephoneInput.getAttribute('value');
  }

  async setMailInput(mail: string): Promise<void> {
    await this.mailInput.sendKeys(mail);
  }

  async getMailInput(): Promise<string> {
    return await this.mailInput.getAttribute('value');
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

export class PersonnelAdministratifDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-personnelAdministratif-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-personnelAdministratif'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
