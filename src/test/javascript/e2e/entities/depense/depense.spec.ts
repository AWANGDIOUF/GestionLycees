import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DepenseComponentsPage, DepenseDeleteDialog, DepenseUpdatePage } from './depense.page-object';

const expect = chai.expect;

describe('Depense e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let depenseComponentsPage: DepenseComponentsPage;
  let depenseUpdatePage: DepenseUpdatePage;
  let depenseDeleteDialog: DepenseDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Depenses', async () => {
    await navBarPage.goToEntity('depense');
    depenseComponentsPage = new DepenseComponentsPage();
    await browser.wait(ec.visibilityOf(depenseComponentsPage.title), 5000);
    expect(await depenseComponentsPage.getTitle()).to.eq('Depenses');
    await browser.wait(ec.or(ec.visibilityOf(depenseComponentsPage.entities), ec.visibilityOf(depenseComponentsPage.noResult)), 1000);
  });

  it('should load create Depense page', async () => {
    await depenseComponentsPage.clickOnCreateButton();
    depenseUpdatePage = new DepenseUpdatePage();
    expect(await depenseUpdatePage.getPageTitle()).to.eq('Create or edit a Depense');
    await depenseUpdatePage.cancel();
  });

  it('should create and save Depenses', async () => {
    const nbButtonsBeforeCreate = await depenseComponentsPage.countDeleteButtons();

    await depenseComponentsPage.clickOnCreateButton();

    await promise.all([
      depenseUpdatePage.typeDepenseSelectLastOption(),
      depenseUpdatePage.setAutreDepenseInput('autreDepense'),
      depenseUpdatePage.setDescriptionInput('description'),
      depenseUpdatePage.setMontantDepenseInput('montantDepense'),
      depenseUpdatePage.lyceesTechniquesSelectLastOption(),
      depenseUpdatePage.comptableFinancierSelectLastOption(),
    ]);

    await depenseUpdatePage.save();
    expect(await depenseUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await depenseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Depense', async () => {
    const nbButtonsBeforeDelete = await depenseComponentsPage.countDeleteButtons();
    await depenseComponentsPage.clickOnLastDeleteButton();

    depenseDeleteDialog = new DepenseDeleteDialog();
    expect(await depenseDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Depense?');
    await depenseDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(depenseComponentsPage.title), 5000);

    expect(await depenseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
