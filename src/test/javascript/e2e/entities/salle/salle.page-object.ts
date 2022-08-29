import { element, by, ElementFinder } from 'protractor';

export class SalleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-salle div table .btn-danger'));
  title = element.all(by.css('jhi-salle div h2#page-heading span')).first();
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

export class SalleUpdatePage {
  pageTitle = element(by.id('jhi-salle-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nombreSalleclasseInput = element(by.id('field_nombreSalleclasse'));
  nombreAteliersInput = element(by.id('field_nombreAteliers'));
  specialiaseSelect = element(by.id('field_specialiase'));
  nombreSalleSpecialiseInput = element(by.id('field_nombreSalleSpecialise'));
  justificationSalleSpeInput = element(by.id('field_justificationSalleSpe'));
  cdiSelect = element(by.id('field_cdi'));
  nombreCDIInput = element(by.id('field_nombreCDI'));
  justifiactifSalleCDIInput = element(by.id('field_justifiactifSalleCDI'));
  jumSelect = element(by.id('field_jum'));
  salleJumInput = element(by.id('field_salleJum'));
  justifiactifSalleJumInput = element(by.id('field_justifiactifSalleJum'));
  autreSalleInput = element(by.id('field_autreSalle'));

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

  async setNombreSalleclasseInput(nombreSalleclasse: string): Promise<void> {
    await this.nombreSalleclasseInput.sendKeys(nombreSalleclasse);
  }

  async getNombreSalleclasseInput(): Promise<string> {
    return await this.nombreSalleclasseInput.getAttribute('value');
  }

  async setNombreAteliersInput(nombreAteliers: string): Promise<void> {
    await this.nombreAteliersInput.sendKeys(nombreAteliers);
  }

  async getNombreAteliersInput(): Promise<string> {
    return await this.nombreAteliersInput.getAttribute('value');
  }

  async setSpecialiaseSelect(specialiase: string): Promise<void> {
    await this.specialiaseSelect.sendKeys(specialiase);
  }

  async getSpecialiaseSelect(): Promise<string> {
    return await this.specialiaseSelect.element(by.css('option:checked')).getText();
  }

  async specialiaseSelectLastOption(): Promise<void> {
    await this.specialiaseSelect.all(by.tagName('option')).last().click();
  }

  async setNombreSalleSpecialiseInput(nombreSalleSpecialise: string): Promise<void> {
    await this.nombreSalleSpecialiseInput.sendKeys(nombreSalleSpecialise);
  }

  async getNombreSalleSpecialiseInput(): Promise<string> {
    return await this.nombreSalleSpecialiseInput.getAttribute('value');
  }

  async setJustificationSalleSpeInput(justificationSalleSpe: string): Promise<void> {
    await this.justificationSalleSpeInput.sendKeys(justificationSalleSpe);
  }

  async getJustificationSalleSpeInput(): Promise<string> {
    return await this.justificationSalleSpeInput.getAttribute('value');
  }

  async setCdiSelect(cdi: string): Promise<void> {
    await this.cdiSelect.sendKeys(cdi);
  }

  async getCdiSelect(): Promise<string> {
    return await this.cdiSelect.element(by.css('option:checked')).getText();
  }

  async cdiSelectLastOption(): Promise<void> {
    await this.cdiSelect.all(by.tagName('option')).last().click();
  }

  async setNombreCDIInput(nombreCDI: string): Promise<void> {
    await this.nombreCDIInput.sendKeys(nombreCDI);
  }

  async getNombreCDIInput(): Promise<string> {
    return await this.nombreCDIInput.getAttribute('value');
  }

  async setJustifiactifSalleCDIInput(justifiactifSalleCDI: string): Promise<void> {
    await this.justifiactifSalleCDIInput.sendKeys(justifiactifSalleCDI);
  }

  async getJustifiactifSalleCDIInput(): Promise<string> {
    return await this.justifiactifSalleCDIInput.getAttribute('value');
  }

  async setJumSelect(jum: string): Promise<void> {
    await this.jumSelect.sendKeys(jum);
  }

  async getJumSelect(): Promise<string> {
    return await this.jumSelect.element(by.css('option:checked')).getText();
  }

  async jumSelectLastOption(): Promise<void> {
    await this.jumSelect.all(by.tagName('option')).last().click();
  }

  async setSalleJumInput(salleJum: string): Promise<void> {
    await this.salleJumInput.sendKeys(salleJum);
  }

  async getSalleJumInput(): Promise<string> {
    return await this.salleJumInput.getAttribute('value');
  }

  async setJustifiactifSalleJumInput(justifiactifSalleJum: string): Promise<void> {
    await this.justifiactifSalleJumInput.sendKeys(justifiactifSalleJum);
  }

  async getJustifiactifSalleJumInput(): Promise<string> {
    return await this.justifiactifSalleJumInput.getAttribute('value');
  }

  async setAutreSalleInput(autreSalle: string): Promise<void> {
    await this.autreSalleInput.sendKeys(autreSalle);
  }

  async getAutreSalleInput(): Promise<string> {
    return await this.autreSalleInput.getAttribute('value');
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

export class SalleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-salle-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-salle'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
