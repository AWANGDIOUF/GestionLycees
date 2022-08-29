import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProviseurComponentsPage, ProviseurDeleteDialog, ProviseurUpdatePage } from './proviseur.page-object';

const expect = chai.expect;

describe('Proviseur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let proviseurComponentsPage: ProviseurComponentsPage;
  let proviseurUpdatePage: ProviseurUpdatePage;
  let proviseurDeleteDialog: ProviseurDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Proviseurs', async () => {
    await navBarPage.goToEntity('proviseur');
    proviseurComponentsPage = new ProviseurComponentsPage();
    await browser.wait(ec.visibilityOf(proviseurComponentsPage.title), 5000);
    expect(await proviseurComponentsPage.getTitle()).to.eq('Proviseurs');
    await browser.wait(ec.or(ec.visibilityOf(proviseurComponentsPage.entities), ec.visibilityOf(proviseurComponentsPage.noResult)), 1000);
  });

  it('should load create Proviseur page', async () => {
    await proviseurComponentsPage.clickOnCreateButton();
    proviseurUpdatePage = new ProviseurUpdatePage();
    expect(await proviseurUpdatePage.getPageTitle()).to.eq('Create or edit a Proviseur');
    await proviseurUpdatePage.cancel();
  });

  it('should create and save Proviseurs', async () => {
    const nbButtonsBeforeCreate = await proviseurComponentsPage.countDeleteButtons();

    await proviseurComponentsPage.clickOnCreateButton();

    await promise.all([
      proviseurUpdatePage.setNomPrenomInput('nomPrenom'),
      proviseurUpdatePage.userSelectLastOption(),
      proviseurUpdatePage.nomLyceeSelectLastOption(),
    ]);

    await proviseurUpdatePage.save();
    expect(await proviseurUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await proviseurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Proviseur', async () => {
    const nbButtonsBeforeDelete = await proviseurComponentsPage.countDeleteButtons();
    await proviseurComponentsPage.clickOnLastDeleteButton();

    proviseurDeleteDialog = new ProviseurDeleteDialog();
    expect(await proviseurDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Proviseur?');
    await proviseurDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(proviseurComponentsPage.title), 5000);

    expect(await proviseurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
