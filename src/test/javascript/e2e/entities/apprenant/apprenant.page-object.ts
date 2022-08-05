import { element, by, ElementFinder } from 'protractor';

export class ApprenantComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-apprenant div table .btn-danger'));
  title = element.all(by.css('jhi-apprenant div h2#page-heading span')).first();
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

export class ApprenantUpdatePage {
  pageTitle = element(by.id('jhi-apprenant-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nomPrenomInput = element(by.id('field_nomPrenom'));
  dateNaissanceInput = element(by.id('field_dateNaissance'));
  lieuNaissanceInput = element(by.id('field_lieuNaissance'));
  telephoneInput = element(by.id('field_telephone'));
  adresseInput = element(by.id('field_adresse'));
  sexeSelect = element(by.id('field_sexe'));
  optionSelect = element(by.id('field_option'));
  situationMatrimonialeSelect = element(by.id('field_situationMatrimoniale'));
  tuteurInput = element(by.id('field_tuteur'));
  contactTuteurInput = element(by.id('field_contactTuteur'));

  serieSelect = element(by.id('field_serie'));
  filiereSelect = element(by.id('field_filiere'));
  lyceesTechniquesSelect = element(by.id('field_lyceesTechniques'));
  directeurSelect = element(by.id('field_directeur'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setNomPrenomInput(nomPrenom: string): Promise<void> {
    await this.nomPrenomInput.sendKeys(nomPrenom);
  }

  async getNomPrenomInput(): Promise<string> {
    return await this.nomPrenomInput.getAttribute('value');
  }

  async setDateNaissanceInput(dateNaissance: string): Promise<void> {
    await this.dateNaissanceInput.sendKeys(dateNaissance);
  }

  async getDateNaissanceInput(): Promise<string> {
    return await this.dateNaissanceInput.getAttribute('value');
  }

  async setLieuNaissanceInput(lieuNaissance: string): Promise<void> {
    await this.lieuNaissanceInput.sendKeys(lieuNaissance);
  }

  async getLieuNaissanceInput(): Promise<string> {
    return await this.lieuNaissanceInput.getAttribute('value');
  }

  async setTelephoneInput(telephone: string): Promise<void> {
    await this.telephoneInput.sendKeys(telephone);
  }

  async getTelephoneInput(): Promise<string> {
    return await this.telephoneInput.getAttribute('value');
  }

  async setAdresseInput(adresse: string): Promise<void> {
    await this.adresseInput.sendKeys(adresse);
  }

  async getAdresseInput(): Promise<string> {
    return await this.adresseInput.getAttribute('value');
  }

  async setSexeSelect(sexe: string): Promise<void> {
    await this.sexeSelect.sendKeys(sexe);
  }

  async getSexeSelect(): Promise<string> {
    return await this.sexeSelect.element(by.css('option:checked')).getText();
  }

  async sexeSelectLastOption(): Promise<void> {
    await this.sexeSelect.all(by.tagName('option')).last().click();
  }

  async setOptionSelect(option: string): Promise<void> {
    await this.optionSelect.sendKeys(option);
  }

  async getOptionSelect(): Promise<string> {
    return await this.optionSelect.element(by.css('option:checked')).getText();
  }

  async optionSelectLastOption(): Promise<void> {
    await this.optionSelect.all(by.tagName('option')).last().click();
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

  async setTuteurInput(tuteur: string): Promise<void> {
    await this.tuteurInput.sendKeys(tuteur);
  }

  async getTuteurInput(): Promise<string> {
    return await this.tuteurInput.getAttribute('value');
  }

  async setContactTuteurInput(contactTuteur: string): Promise<void> {
    await this.contactTuteurInput.sendKeys(contactTuteur);
  }

  async getContactTuteurInput(): Promise<string> {
    return await this.contactTuteurInput.getAttribute('value');
  }

  async serieSelectLastOption(): Promise<void> {
    await this.serieSelect.all(by.tagName('option')).last().click();
  }

  async serieSelectOption(option: string): Promise<void> {
    await this.serieSelect.sendKeys(option);
  }

  getSerieSelect(): ElementFinder {
    return this.serieSelect;
  }

  async getSerieSelectedOption(): Promise<string> {
    return await this.serieSelect.element(by.css('option:checked')).getText();
  }

  async filiereSelectLastOption(): Promise<void> {
    await this.filiereSelect.all(by.tagName('option')).last().click();
  }

  async filiereSelectOption(option: string): Promise<void> {
    await this.filiereSelect.sendKeys(option);
  }

  getFiliereSelect(): ElementFinder {
    return this.filiereSelect;
  }

  async getFiliereSelectedOption(): Promise<string> {
    return await this.filiereSelect.element(by.css('option:checked')).getText();
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

  async directeurSelectLastOption(): Promise<void> {
    await this.directeurSelect.all(by.tagName('option')).last().click();
  }

  async directeurSelectOption(option: string): Promise<void> {
    await this.directeurSelect.sendKeys(option);
  }

  getDirecteurSelect(): ElementFinder {
    return this.directeurSelect;
  }

  async getDirecteurSelectedOption(): Promise<string> {
    return await this.directeurSelect.element(by.css('option:checked')).getText();
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

export class ApprenantDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-apprenant-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-apprenant'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
