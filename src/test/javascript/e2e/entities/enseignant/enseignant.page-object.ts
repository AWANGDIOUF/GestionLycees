import { element, by, ElementFinder } from 'protractor';

export class EnseignantComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-enseignant div table .btn-danger'));
  title = element.all(by.css('jhi-enseignant div h2#page-heading span')).first();
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

export class EnseignantUpdatePage {
  pageTitle = element(by.id('jhi-enseignant-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  matriculeEnsInput = element(by.id('field_matriculeEns'));
  nomPrenomInput = element(by.id('field_nomPrenom'));
  sexeSelect = element(by.id('field_sexe'));
  telephoneInput = element(by.id('field_telephone'));
  mailInput = element(by.id('field_mail'));
  gradeInput = element(by.id('field_grade'));
  optionSelect = element(by.id('field_option'));
  situationMatrimonialeSelect = element(by.id('field_situationMatrimoniale'));
  statusSelect = element(by.id('field_status'));
  fonctionInput = element(by.id('field_fonction'));

  lyceesTechniquesSelect = element(by.id('field_lyceesTechniques'));
  serieSelect = element(by.id('field_serie'));
  filiereSelect = element(by.id('field_filiere'));
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

  async setMatriculeEnsInput(matriculeEns: string): Promise<void> {
    await this.matriculeEnsInput.sendKeys(matriculeEns);
  }

  async getMatriculeEnsInput(): Promise<string> {
    return await this.matriculeEnsInput.getAttribute('value');
  }

  async setNomPrenomInput(nomPrenom: string): Promise<void> {
    await this.nomPrenomInput.sendKeys(nomPrenom);
  }

  async getNomPrenomInput(): Promise<string> {
    return await this.nomPrenomInput.getAttribute('value');
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

  async setGradeInput(grade: string): Promise<void> {
    await this.gradeInput.sendKeys(grade);
  }

  async getGradeInput(): Promise<string> {
    return await this.gradeInput.getAttribute('value');
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

  async setStatusSelect(status: string): Promise<void> {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect(): Promise<string> {
    return await this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption(): Promise<void> {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }

  async setFonctionInput(fonction: string): Promise<void> {
    await this.fonctionInput.sendKeys(fonction);
  }

  async getFonctionInput(): Promise<string> {
    return await this.fonctionInput.getAttribute('value');
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

export class EnseignantDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-enseignant-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-enseignant'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
