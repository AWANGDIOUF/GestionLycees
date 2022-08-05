import { element, by, ElementFinder } from 'protractor';

export class FormationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-formation div table .btn-danger'));
  title = element.all(by.css('jhi-formation div h2#page-heading span')).first();
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

export class FormationUpdatePage {
  pageTitle = element(by.id('jhi-formation-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nomFormationInput = element(by.id('field_nomFormation'));
  typeFormationInput = element(by.id('field_typeFormation'));
  niveauFormationInput = element(by.id('field_niveauFormation'));
  dureeInput = element(by.id('field_duree'));
  secteurInput = element(by.id('field_secteur'));
  modaliteInput = element(by.id('field_modalite'));

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

  async setNomFormationInput(nomFormation: string): Promise<void> {
    await this.nomFormationInput.sendKeys(nomFormation);
  }

  async getNomFormationInput(): Promise<string> {
    return await this.nomFormationInput.getAttribute('value');
  }

  async setTypeFormationInput(typeFormation: string): Promise<void> {
    await this.typeFormationInput.sendKeys(typeFormation);
  }

  async getTypeFormationInput(): Promise<string> {
    return await this.typeFormationInput.getAttribute('value');
  }

  async setNiveauFormationInput(niveauFormation: string): Promise<void> {
    await this.niveauFormationInput.sendKeys(niveauFormation);
  }

  async getNiveauFormationInput(): Promise<string> {
    return await this.niveauFormationInput.getAttribute('value');
  }

  async setDureeInput(duree: string): Promise<void> {
    await this.dureeInput.sendKeys(duree);
  }

  async getDureeInput(): Promise<string> {
    return await this.dureeInput.getAttribute('value');
  }

  async setSecteurInput(secteur: string): Promise<void> {
    await this.secteurInput.sendKeys(secteur);
  }

  async getSecteurInput(): Promise<string> {
    return await this.secteurInput.getAttribute('value');
  }

  async setModaliteInput(modalite: string): Promise<void> {
    await this.modaliteInput.sendKeys(modalite);
  }

  async getModaliteInput(): Promise<string> {
    return await this.modaliteInput.getAttribute('value');
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

export class FormationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-formation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-formation'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
