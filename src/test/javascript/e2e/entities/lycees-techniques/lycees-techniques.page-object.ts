import { element, by, ElementFinder } from 'protractor';

export class LyceesTechniquesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-lycees-techniques div table .btn-danger'));
  title = element.all(by.css('jhi-lycees-techniques div h2#page-heading span')).first();
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

export class LyceesTechniquesUpdatePage {
  pageTitle = element(by.id('jhi-lycees-techniques-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nomLyceeInput = element(by.id('field_nomLycee'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setNomLyceeInput(nomLycee: string): Promise<void> {
    await this.nomLyceeInput.sendKeys(nomLycee);
  }

  async getNomLyceeInput(): Promise<string> {
    return await this.nomLyceeInput.getAttribute('value');
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

export class LyceesTechniquesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-lyceesTechniques-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-lyceesTechniques'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
