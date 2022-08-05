import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ExamenComponentsPage, ExamenDeleteDialog, ExamenUpdatePage } from './examen.page-object';

const expect = chai.expect;

describe('Examen e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let examenComponentsPage: ExamenComponentsPage;
  let examenUpdatePage: ExamenUpdatePage;
  let examenDeleteDialog: ExamenDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Examen', async () => {
    await navBarPage.goToEntity('examen');
    examenComponentsPage = new ExamenComponentsPage();
    await browser.wait(ec.visibilityOf(examenComponentsPage.title), 5000);
    expect(await examenComponentsPage.getTitle()).to.eq('Examen');
    await browser.wait(ec.or(ec.visibilityOf(examenComponentsPage.entities), ec.visibilityOf(examenComponentsPage.noResult)), 1000);
  });

  it('should load create Examen page', async () => {
    await examenComponentsPage.clickOnCreateButton();
    examenUpdatePage = new ExamenUpdatePage();
    expect(await examenUpdatePage.getPageTitle()).to.eq('Create or edit a Examen');
    await examenUpdatePage.cancel();
  });

  it('should create and save Examen', async () => {
    const nbButtonsBeforeCreate = await examenComponentsPage.countDeleteButtons();

    await examenComponentsPage.clickOnCreateButton();

    await promise.all([
      examenUpdatePage.typeSelectLastOption(),
      examenUpdatePage.setAutresInput('autres'),
      examenUpdatePage.optionSelectLastOption(),
      examenUpdatePage.statusSelectLastOption(),
      examenUpdatePage.lyceesTechniquesSelectLastOption(),
      examenUpdatePage.directeurSelectLastOption(),
      examenUpdatePage.serieSelectLastOption(),
      examenUpdatePage.filiereSelectLastOption(),
      examenUpdatePage.apprenantSelectLastOption(),
    ]);

    await examenUpdatePage.save();
    expect(await examenUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await examenComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Examen', async () => {
    const nbButtonsBeforeDelete = await examenComponentsPage.countDeleteButtons();
    await examenComponentsPage.clickOnLastDeleteButton();

    examenDeleteDialog = new ExamenDeleteDialog();
    expect(await examenDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Examen?');
    await examenDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(examenComponentsPage.title), 5000);

    expect(await examenComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
