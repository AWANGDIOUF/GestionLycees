import { element, by, ElementFinder } from 'protractor';

export class VisiteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-visite div table .btn-danger'));
  title = element.all(by.css('jhi-visite div h2#page-heading span')).first();
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

export class VisiteUpdatePage {
  pageTitle = element(by.id('jhi-visite-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  natureSelect = element(by.id('field_nature'));
  autreNatureInput = element(by.id('field_autreNature'));
  provenanceSelect = element(by.id('field_provenance'));
  autreProvenanceInput = element(by.id('field_autreProvenance'));
  objetInput = element(by.id('field_objet'));
  resultatsInput = element(by.id('field_resultats'));
  periodeInput = element(by.id('field_periode'));

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

  async setNatureSelect(nature: string): Promise<void> {
    await this.natureSelect.sendKeys(nature);
  }

  async getNatureSelect(): Promise<string> {
    return await this.natureSelect.element(by.css('option:checked')).getText();
  }

  async natureSelectLastOption(): Promise<void> {
    await this.natureSelect.all(by.tagName('option')).last().click();
  }

  async setAutreNatureInput(autreNature: string): Promise<void> {
    await this.autreNatureInput.sendKeys(autreNature);
  }

  async getAutreNatureInput(): Promise<string> {
    return await this.autreNatureInput.getAttribute('value');
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

  async setAutreProvenanceInput(autreProvenance: string): Promise<void> {
    await this.autreProvenanceInput.sendKeys(autreProvenance);
  }

  async getAutreProvenanceInput(): Promise<string> {
    return await this.autreProvenanceInput.getAttribute('value');
  }

  async setObjetInput(objet: string): Promise<void> {
    await this.objetInput.sendKeys(objet);
  }

  async getObjetInput(): Promise<string> {
    return await this.objetInput.getAttribute('value');
  }

  async setResultatsInput(resultats: string): Promise<void> {
    await this.resultatsInput.sendKeys(resultats);
  }

  async getResultatsInput(): Promise<string> {
    return await this.resultatsInput.getAttribute('value');
  }

  async setPeriodeInput(periode: string): Promise<void> {
    await this.periodeInput.sendKeys(periode);
  }

  async getPeriodeInput(): Promise<string> {
    return await this.periodeInput.getAttribute('value');
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

export class VisiteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-visite-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-visite'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
