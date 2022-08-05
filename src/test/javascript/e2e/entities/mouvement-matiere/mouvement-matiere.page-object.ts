import { element, by, ElementFinder } from 'protractor';

export class MouvementMatiereComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-mouvement-matiere div table .btn-danger'));
  title = element.all(by.css('jhi-mouvement-matiere div h2#page-heading span')).first();
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

export class MouvementMatiereUpdatePage {
  pageTitle = element(by.id('jhi-mouvement-matiere-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  typeMouvementSelect = element(by.id('field_typeMouvement'));
  groupSelect = element(by.id('field_group'));
  organisationSelect = element(by.id('field_organisation'));
  autreOrganisationInput = element(by.id('field_autreOrganisation'));
  ressourceSelect = element(by.id('field_ressource'));
  autreRessourceInput = element(by.id('field_autreRessource'));
  designationInput = element(by.id('file_designation'));
  pvReceptionInput = element(by.id('file_pvReception'));
  bordeauDeLivraisonInput = element(by.id('file_bordeauDeLivraison'));
  groupeSelect = element(by.id('field_groupe'));
  bonDeSortieInput = element(by.id('file_bonDeSortie'));
  certificatAdministratifInput = element(by.id('file_certificatAdministratif'));

  lyceesTechniquesSelect = element(by.id('field_lyceesTechniques'));
  comptableMatiereSelect = element(by.id('field_comptableMatiere'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setTypeMouvementSelect(typeMouvement: string): Promise<void> {
    await this.typeMouvementSelect.sendKeys(typeMouvement);
  }

  async getTypeMouvementSelect(): Promise<string> {
    return await this.typeMouvementSelect.element(by.css('option:checked')).getText();
  }

  async typeMouvementSelectLastOption(): Promise<void> {
    await this.typeMouvementSelect.all(by.tagName('option')).last().click();
  }

  async setGroupSelect(group: string): Promise<void> {
    await this.groupSelect.sendKeys(group);
  }

  async getGroupSelect(): Promise<string> {
    return await this.groupSelect.element(by.css('option:checked')).getText();
  }

  async groupSelectLastOption(): Promise<void> {
    await this.groupSelect.all(by.tagName('option')).last().click();
  }

  async setOrganisationSelect(organisation: string): Promise<void> {
    await this.organisationSelect.sendKeys(organisation);
  }

  async getOrganisationSelect(): Promise<string> {
    return await this.organisationSelect.element(by.css('option:checked')).getText();
  }

  async organisationSelectLastOption(): Promise<void> {
    await this.organisationSelect.all(by.tagName('option')).last().click();
  }

  async setAutreOrganisationInput(autreOrganisation: string): Promise<void> {
    await this.autreOrganisationInput.sendKeys(autreOrganisation);
  }

  async getAutreOrganisationInput(): Promise<string> {
    return await this.autreOrganisationInput.getAttribute('value');
  }

  async setRessourceSelect(ressource: string): Promise<void> {
    await this.ressourceSelect.sendKeys(ressource);
  }

  async getRessourceSelect(): Promise<string> {
    return await this.ressourceSelect.element(by.css('option:checked')).getText();
  }

  async ressourceSelectLastOption(): Promise<void> {
    await this.ressourceSelect.all(by.tagName('option')).last().click();
  }

  async setAutreRessourceInput(autreRessource: string): Promise<void> {
    await this.autreRessourceInput.sendKeys(autreRessource);
  }

  async getAutreRessourceInput(): Promise<string> {
    return await this.autreRessourceInput.getAttribute('value');
  }

  async setDesignationInput(designation: string): Promise<void> {
    await this.designationInput.sendKeys(designation);
  }

  async getDesignationInput(): Promise<string> {
    return await this.designationInput.getAttribute('value');
  }

  async setPvReceptionInput(pvReception: string): Promise<void> {
    await this.pvReceptionInput.sendKeys(pvReception);
  }

  async getPvReceptionInput(): Promise<string> {
    return await this.pvReceptionInput.getAttribute('value');
  }

  async setBordeauDeLivraisonInput(bordeauDeLivraison: string): Promise<void> {
    await this.bordeauDeLivraisonInput.sendKeys(bordeauDeLivraison);
  }

  async getBordeauDeLivraisonInput(): Promise<string> {
    return await this.bordeauDeLivraisonInput.getAttribute('value');
  }

  async setGroupeSelect(groupe: string): Promise<void> {
    await this.groupeSelect.sendKeys(groupe);
  }

  async getGroupeSelect(): Promise<string> {
    return await this.groupeSelect.element(by.css('option:checked')).getText();
  }

  async groupeSelectLastOption(): Promise<void> {
    await this.groupeSelect.all(by.tagName('option')).last().click();
  }

  async setBonDeSortieInput(bonDeSortie: string): Promise<void> {
    await this.bonDeSortieInput.sendKeys(bonDeSortie);
  }

  async getBonDeSortieInput(): Promise<string> {
    return await this.bonDeSortieInput.getAttribute('value');
  }

  async setCertificatAdministratifInput(certificatAdministratif: string): Promise<void> {
    await this.certificatAdministratifInput.sendKeys(certificatAdministratif);
  }

  async getCertificatAdministratifInput(): Promise<string> {
    return await this.certificatAdministratifInput.getAttribute('value');
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

  async comptableMatiereSelectLastOption(): Promise<void> {
    await this.comptableMatiereSelect.all(by.tagName('option')).last().click();
  }

  async comptableMatiereSelectOption(option: string): Promise<void> {
    await this.comptableMatiereSelect.sendKeys(option);
  }

  getComptableMatiereSelect(): ElementFinder {
    return this.comptableMatiereSelect;
  }

  async getComptableMatiereSelectedOption(): Promise<string> {
    return await this.comptableMatiereSelect.element(by.css('option:checked')).getText();
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

export class MouvementMatiereDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-mouvementMatiere-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-mouvementMatiere'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
