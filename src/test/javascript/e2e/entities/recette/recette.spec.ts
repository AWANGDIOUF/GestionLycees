import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RecetteComponentsPage, RecetteDeleteDialog, RecetteUpdatePage } from './recette.page-object';

const expect = chai.expect;

describe('Recette e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let recetteComponentsPage: RecetteComponentsPage;
  let recetteUpdatePage: RecetteUpdatePage;
  let recetteDeleteDialog: RecetteDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Recettes', async () => {
    await navBarPage.goToEntity('recette');
    recetteComponentsPage = new RecetteComponentsPage();
    await browser.wait(ec.visibilityOf(recetteComponentsPage.title), 5000);
    expect(await recetteComponentsPage.getTitle()).to.eq('Recettes');
    await browser.wait(ec.or(ec.visibilityOf(recetteComponentsPage.entities), ec.visibilityOf(recetteComponentsPage.noResult)), 1000);
  });

  it('should load create Recette page', async () => {
    await recetteComponentsPage.clickOnCreateButton();
    recetteUpdatePage = new RecetteUpdatePage();
    expect(await recetteUpdatePage.getPageTitle()).to.eq('Create or edit a Recette');
    await recetteUpdatePage.cancel();
  });

  it('should create and save Recettes', async () => {
    const nbButtonsBeforeCreate = await recetteComponentsPage.countDeleteButtons();

    await recetteComponentsPage.clickOnCreateButton();

    await promise.all([
      recetteUpdatePage.typeSelectLastOption(),
      recetteUpdatePage.setAutreRecetteInput('autreRecette'),
      recetteUpdatePage.setTypeRessourceInput('typeRessource'),
      recetteUpdatePage.setMontantInput('montant'),
      recetteUpdatePage.setDateInput('2000-12-31'),
      recetteUpdatePage.depenseSelectLastOption(),
      recetteUpdatePage.lyceesTechniquesSelectLastOption(),
      recetteUpdatePage.comptableFinancierSelectLastOption(),
    ]);

    await recetteUpdatePage.save();
    expect(await recetteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await recetteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Recette', async () => {
    const nbButtonsBeforeDelete = await recetteComponentsPage.countDeleteButtons();
    await recetteComponentsPage.clickOnLastDeleteButton();

    recetteDeleteDialog = new RecetteDeleteDialog();
    expect(await recetteDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Recette?');
    await recetteDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(recetteComponentsPage.title), 5000);

    expect(await recetteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
