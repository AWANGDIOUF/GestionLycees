import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BesoinComponentsPage, BesoinDeleteDialog, BesoinUpdatePage } from './besoin.page-object';

const expect = chai.expect;

describe('Besoin e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let besoinComponentsPage: BesoinComponentsPage;
  let besoinUpdatePage: BesoinUpdatePage;
  let besoinDeleteDialog: BesoinDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Besoins', async () => {
    await navBarPage.goToEntity('besoin');
    besoinComponentsPage = new BesoinComponentsPage();
    await browser.wait(ec.visibilityOf(besoinComponentsPage.title), 5000);
    expect(await besoinComponentsPage.getTitle()).to.eq('Besoins');
    await browser.wait(ec.or(ec.visibilityOf(besoinComponentsPage.entities), ec.visibilityOf(besoinComponentsPage.noResult)), 1000);
  });

  it('should load create Besoin page', async () => {
    await besoinComponentsPage.clickOnCreateButton();
    besoinUpdatePage = new BesoinUpdatePage();
    expect(await besoinUpdatePage.getPageTitle()).to.eq('Create or edit a Besoin');
    await besoinUpdatePage.cancel();
  });

  it('should create and save Besoins', async () => {
    const nbButtonsBeforeCreate = await besoinComponentsPage.countDeleteButtons();

    await besoinComponentsPage.clickOnCreateButton();

    await promise.all([
      besoinUpdatePage.typeSelectLastOption(),
      besoinUpdatePage.setAutreBesoinInput('autreBesoin'),
      besoinUpdatePage.setDesignationInput('designation'),
      besoinUpdatePage.setEtatActuelInput('etatActuel'),
      besoinUpdatePage.setInterventionSouhaiteeInput('interventionSouhaitee'),
      besoinUpdatePage.setJustificationInput('justification'),
      besoinUpdatePage.lyceesTechniquesSelectLastOption(),
      besoinUpdatePage.proviseurSelectLastOption(),
    ]);

    await besoinUpdatePage.save();
    expect(await besoinUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await besoinComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Besoin', async () => {
    const nbButtonsBeforeDelete = await besoinComponentsPage.countDeleteButtons();
    await besoinComponentsPage.clickOnLastDeleteButton();

    besoinDeleteDialog = new BesoinDeleteDialog();
    expect(await besoinDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Besoin?');
    await besoinDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(besoinComponentsPage.title), 5000);

    expect(await besoinComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
