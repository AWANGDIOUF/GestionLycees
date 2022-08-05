import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MouvementMatiereComponentsPage, MouvementMatiereDeleteDialog, MouvementMatiereUpdatePage } from './mouvement-matiere.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('MouvementMatiere e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mouvementMatiereComponentsPage: MouvementMatiereComponentsPage;
  let mouvementMatiereUpdatePage: MouvementMatiereUpdatePage;
  let mouvementMatiereDeleteDialog: MouvementMatiereDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MouvementMatieres', async () => {
    await navBarPage.goToEntity('mouvement-matiere');
    mouvementMatiereComponentsPage = new MouvementMatiereComponentsPage();
    await browser.wait(ec.visibilityOf(mouvementMatiereComponentsPage.title), 5000);
    expect(await mouvementMatiereComponentsPage.getTitle()).to.eq('Mouvement Matieres');
    await browser.wait(
      ec.or(ec.visibilityOf(mouvementMatiereComponentsPage.entities), ec.visibilityOf(mouvementMatiereComponentsPage.noResult)),
      1000
    );
  });

  it('should load create MouvementMatiere page', async () => {
    await mouvementMatiereComponentsPage.clickOnCreateButton();
    mouvementMatiereUpdatePage = new MouvementMatiereUpdatePage();
    expect(await mouvementMatiereUpdatePage.getPageTitle()).to.eq('Create or edit a Mouvement Matiere');
    await mouvementMatiereUpdatePage.cancel();
  });

  it('should create and save MouvementMatieres', async () => {
    const nbButtonsBeforeCreate = await mouvementMatiereComponentsPage.countDeleteButtons();

    await mouvementMatiereComponentsPage.clickOnCreateButton();

    await promise.all([
      mouvementMatiereUpdatePage.typeMouvementSelectLastOption(),
      mouvementMatiereUpdatePage.groupSelectLastOption(),
      mouvementMatiereUpdatePage.organisationSelectLastOption(),
      mouvementMatiereUpdatePage.setAutreOrganisationInput('autreOrganisation'),
      mouvementMatiereUpdatePage.ressourceSelectLastOption(),
      mouvementMatiereUpdatePage.setAutreRessourceInput('autreRessource'),
      mouvementMatiereUpdatePage.setDesignationInput(absolutePath),
      mouvementMatiereUpdatePage.setPvReceptionInput(absolutePath),
      mouvementMatiereUpdatePage.setBordeauDeLivraisonInput(absolutePath),
      mouvementMatiereUpdatePage.groupeSelectLastOption(),
      mouvementMatiereUpdatePage.setBonDeSortieInput(absolutePath),
      mouvementMatiereUpdatePage.setCertificatAdministratifInput(absolutePath),
      mouvementMatiereUpdatePage.lyceesTechniquesSelectLastOption(),
      mouvementMatiereUpdatePage.comptableMatiereSelectLastOption(),
    ]);

    await mouvementMatiereUpdatePage.save();
    expect(await mouvementMatiereUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await mouvementMatiereComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last MouvementMatiere', async () => {
    const nbButtonsBeforeDelete = await mouvementMatiereComponentsPage.countDeleteButtons();
    await mouvementMatiereComponentsPage.clickOnLastDeleteButton();

    mouvementMatiereDeleteDialog = new MouvementMatiereDeleteDialog();
    expect(await mouvementMatiereDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Mouvement Matiere?');
    await mouvementMatiereDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(mouvementMatiereComponentsPage.title), 5000);

    expect(await mouvementMatiereComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
