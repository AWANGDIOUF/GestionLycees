import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ReceptionComponentsPage, ReceptionDeleteDialog, ReceptionUpdatePage } from './reception.page-object';

const expect = chai.expect;

describe('Reception e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let receptionComponentsPage: ReceptionComponentsPage;
  let receptionUpdatePage: ReceptionUpdatePage;
  let receptionDeleteDialog: ReceptionDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Receptions', async () => {
    await navBarPage.goToEntity('reception');
    receptionComponentsPage = new ReceptionComponentsPage();
    await browser.wait(ec.visibilityOf(receptionComponentsPage.title), 5000);
    expect(await receptionComponentsPage.getTitle()).to.eq('Receptions');
    await browser.wait(ec.or(ec.visibilityOf(receptionComponentsPage.entities), ec.visibilityOf(receptionComponentsPage.noResult)), 1000);
  });

  it('should load create Reception page', async () => {
    await receptionComponentsPage.clickOnCreateButton();
    receptionUpdatePage = new ReceptionUpdatePage();
    expect(await receptionUpdatePage.getPageTitle()).to.eq('Create or edit a Reception');
    await receptionUpdatePage.cancel();
  });

  it('should create and save Receptions', async () => {
    const nbButtonsBeforeCreate = await receptionComponentsPage.countDeleteButtons();

    await receptionComponentsPage.clickOnCreateButton();

    await promise.all([
      receptionUpdatePage.setLibelleMaterielInput('libelleMateriel'),
      receptionUpdatePage.typeGroupSelectLastOption(),
      receptionUpdatePage.provenanceSelectLastOption(),
      receptionUpdatePage.setFournisseurInput('fournisseur'),
      receptionUpdatePage.setDateInput('2000-12-31'),
      receptionUpdatePage.lyceesTechniquesSelectLastOption(),
      receptionUpdatePage.comptableMatiereSelectLastOption(),
    ]);

    await receptionUpdatePage.save();
    expect(await receptionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await receptionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Reception', async () => {
    const nbButtonsBeforeDelete = await receptionComponentsPage.countDeleteButtons();
    await receptionComponentsPage.clickOnLastDeleteButton();

    receptionDeleteDialog = new ReceptionDeleteDialog();
    expect(await receptionDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Reception?');
    await receptionDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(receptionComponentsPage.title), 5000);

    expect(await receptionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
