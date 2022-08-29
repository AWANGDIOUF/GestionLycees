import { element, by, ElementFinder } from 'protractor';

export class PartenaireComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-partenaire div table .btn-danger'));
  title = element.all(by.css('jhi-partenaire div h2#page-heading span')).first();
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

export class PartenaireUpdatePage {
  pageTitle = element(by.id('jhi-partenaire-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  denominationPartenaireInput = element(by.id('field_denominationPartenaire'));
  categorieProvenaireSelect = element(by.id('field_categorieProvenaire'));
  autreCategorieInput = element(by.id('field_autreCategorie'));
  natureSelect = element(by.id('field_nature'));
  autreNatureInput = element(by.id('field_autreNature'));

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

  async setDenominationPartenaireInput(denominationPartenaire: string): Promise<void> {
    await this.denominationPartenaireInput.sendKeys(denominationPartenaire);
  }

  async getDenominationPartenaireInput(): Promise<string> {
    return await this.denominationPartenaireInput.getAttribute('value');
  }

  async setCategorieProvenaireSelect(categorieProvenaire: string): Promise<void> {
    await this.categorieProvenaireSelect.sendKeys(categorieProvenaire);
  }

  async getCategorieProvenaireSelect(): Promise<string> {
    return await this.categorieProvenaireSelect.element(by.css('option:checked')).getText();
  }

  async categorieProvenaireSelectLastOption(): Promise<void> {
    await this.categorieProvenaireSelect.all(by.tagName('option')).last().click();
  }

  async setAutreCategorieInput(autreCategorie: string): Promise<void> {
    await this.autreCategorieInput.sendKeys(autreCategorie);
  }

  async getAutreCategorieInput(): Promise<string> {
    return await this.autreCategorieInput.getAttribute('value');
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

export class PartenaireDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-partenaire-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-partenaire'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
