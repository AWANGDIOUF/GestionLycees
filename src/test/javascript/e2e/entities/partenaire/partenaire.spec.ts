import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PartenaireComponentsPage, PartenaireDeleteDialog, PartenaireUpdatePage } from './partenaire.page-object';

const expect = chai.expect;

describe('Partenaire e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let partenaireComponentsPage: PartenaireComponentsPage;
  let partenaireUpdatePage: PartenaireUpdatePage;
  let partenaireDeleteDialog: PartenaireDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Partenaires', async () => {
    await navBarPage.goToEntity('partenaire');
    partenaireComponentsPage = new PartenaireComponentsPage();
    await browser.wait(ec.visibilityOf(partenaireComponentsPage.title), 5000);
    expect(await partenaireComponentsPage.getTitle()).to.eq('Partenaires');
    await browser.wait(ec.or(ec.visibilityOf(partenaireComponentsPage.entities), ec.visibilityOf(partenaireComponentsPage.noResult)), 1000);
  });

  it('should load create Partenaire page', async () => {
    await partenaireComponentsPage.clickOnCreateButton();
    partenaireUpdatePage = new PartenaireUpdatePage();
    expect(await partenaireUpdatePage.getPageTitle()).to.eq('Create or edit a Partenaire');
    await partenaireUpdatePage.cancel();
  });

  it('should create and save Partenaires', async () => {
    const nbButtonsBeforeCreate = await partenaireComponentsPage.countDeleteButtons();

    await partenaireComponentsPage.clickOnCreateButton();

    await promise.all([
      partenaireUpdatePage.setDenominationPartenaireInput('denominationPartenaire'),
      partenaireUpdatePage.categorieProvenaireSelectLastOption(),
      partenaireUpdatePage.setAutreCategorieInput('autreCategorie'),
      partenaireUpdatePage.natureSelectLastOption(),
      partenaireUpdatePage.setAutreNatureInput('autreNature'),
      partenaireUpdatePage.lyceesTechniquesSelectLastOption(),
      partenaireUpdatePage.proviseurSelectLastOption(),
    ]);

    await partenaireUpdatePage.save();
    expect(await partenaireUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await partenaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Partenaire', async () => {
    const nbButtonsBeforeDelete = await partenaireComponentsPage.countDeleteButtons();
    await partenaireComponentsPage.clickOnLastDeleteButton();

    partenaireDeleteDialog = new PartenaireDeleteDialog();
    expect(await partenaireDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Partenaire?');
    await partenaireDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(partenaireComponentsPage.title), 5000);

    expect(await partenaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
