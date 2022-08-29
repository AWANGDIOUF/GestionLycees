import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VisiteComponentsPage, VisiteDeleteDialog, VisiteUpdatePage } from './visite.page-object';

const expect = chai.expect;

describe('Visite e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let visiteComponentsPage: VisiteComponentsPage;
  let visiteUpdatePage: VisiteUpdatePage;
  let visiteDeleteDialog: VisiteDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Visites', async () => {
    await navBarPage.goToEntity('visite');
    visiteComponentsPage = new VisiteComponentsPage();
    await browser.wait(ec.visibilityOf(visiteComponentsPage.title), 5000);
    expect(await visiteComponentsPage.getTitle()).to.eq('Visites');
    await browser.wait(ec.or(ec.visibilityOf(visiteComponentsPage.entities), ec.visibilityOf(visiteComponentsPage.noResult)), 1000);
  });

  it('should load create Visite page', async () => {
    await visiteComponentsPage.clickOnCreateButton();
    visiteUpdatePage = new VisiteUpdatePage();
    expect(await visiteUpdatePage.getPageTitle()).to.eq('Create or edit a Visite');
    await visiteUpdatePage.cancel();
  });

  it('should create and save Visites', async () => {
    const nbButtonsBeforeCreate = await visiteComponentsPage.countDeleteButtons();

    await visiteComponentsPage.clickOnCreateButton();

    await promise.all([
      visiteUpdatePage.natureSelectLastOption(),
      visiteUpdatePage.setAutreNatureInput('autreNature'),
      visiteUpdatePage.provenanceSelectLastOption(),
      visiteUpdatePage.setAutreProvenanceInput('autreProvenance'),
      visiteUpdatePage.setObjetInput('objet'),
      visiteUpdatePage.setResultatsInput('resultats'),
      visiteUpdatePage.setPeriodeInput('2000-12-31'),
      visiteUpdatePage.lyceesTechniquesSelectLastOption(),
      visiteUpdatePage.proviseurSelectLastOption(),
    ]);

    await visiteUpdatePage.save();
    expect(await visiteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await visiteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Visite', async () => {
    const nbButtonsBeforeDelete = await visiteComponentsPage.countDeleteButtons();
    await visiteComponentsPage.clickOnLastDeleteButton();

    visiteDeleteDialog = new VisiteDeleteDialog();
    expect(await visiteDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Visite?');
    await visiteDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(visiteComponentsPage.title), 5000);

    expect(await visiteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
