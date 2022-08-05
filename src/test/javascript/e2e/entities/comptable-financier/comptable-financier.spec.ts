import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ComptableFinancierComponentsPage,
  ComptableFinancierDeleteDialog,
  ComptableFinancierUpdatePage,
} from './comptable-financier.page-object';

const expect = chai.expect;

describe('ComptableFinancier e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let comptableFinancierComponentsPage: ComptableFinancierComponentsPage;
  let comptableFinancierUpdatePage: ComptableFinancierUpdatePage;
  let comptableFinancierDeleteDialog: ComptableFinancierDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ComptableFinanciers', async () => {
    await navBarPage.goToEntity('comptable-financier');
    comptableFinancierComponentsPage = new ComptableFinancierComponentsPage();
    await browser.wait(ec.visibilityOf(comptableFinancierComponentsPage.title), 5000);
    expect(await comptableFinancierComponentsPage.getTitle()).to.eq('Comptable Financiers');
    await browser.wait(
      ec.or(ec.visibilityOf(comptableFinancierComponentsPage.entities), ec.visibilityOf(comptableFinancierComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ComptableFinancier page', async () => {
    await comptableFinancierComponentsPage.clickOnCreateButton();
    comptableFinancierUpdatePage = new ComptableFinancierUpdatePage();
    expect(await comptableFinancierUpdatePage.getPageTitle()).to.eq('Create or edit a Comptable Financier');
    await comptableFinancierUpdatePage.cancel();
  });

  it('should create and save ComptableFinanciers', async () => {
    const nbButtonsBeforeCreate = await comptableFinancierComponentsPage.countDeleteButtons();

    await comptableFinancierComponentsPage.clickOnCreateButton();

    await promise.all([
      comptableFinancierUpdatePage.setNomPrenomInput('nomPrenom'),
      comptableFinancierUpdatePage.userSelectLastOption(),
      comptableFinancierUpdatePage.nomLyceeSelectLastOption(),
    ]);

    await comptableFinancierUpdatePage.save();
    expect(await comptableFinancierUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await comptableFinancierComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ComptableFinancier', async () => {
    const nbButtonsBeforeDelete = await comptableFinancierComponentsPage.countDeleteButtons();
    await comptableFinancierComponentsPage.clickOnLastDeleteButton();

    comptableFinancierDeleteDialog = new ComptableFinancierDeleteDialog();
    expect(await comptableFinancierDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Comptable Financier?');
    await comptableFinancierDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(comptableFinancierComponentsPage.title), 5000);

    expect(await comptableFinancierComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
