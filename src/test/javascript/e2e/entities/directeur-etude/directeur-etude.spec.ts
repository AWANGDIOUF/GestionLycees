import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DirecteurEtudeComponentsPage, DirecteurEtudeDeleteDialog, DirecteurEtudeUpdatePage } from './directeur-etude.page-object';

const expect = chai.expect;

describe('DirecteurEtude e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let directeurEtudeComponentsPage: DirecteurEtudeComponentsPage;
  let directeurEtudeUpdatePage: DirecteurEtudeUpdatePage;
  let directeurEtudeDeleteDialog: DirecteurEtudeDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DirecteurEtudes', async () => {
    await navBarPage.goToEntity('directeur-etude');
    directeurEtudeComponentsPage = new DirecteurEtudeComponentsPage();
    await browser.wait(ec.visibilityOf(directeurEtudeComponentsPage.title), 5000);
    expect(await directeurEtudeComponentsPage.getTitle()).to.eq('Directeur Etudes');
    await browser.wait(
      ec.or(ec.visibilityOf(directeurEtudeComponentsPage.entities), ec.visibilityOf(directeurEtudeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create DirecteurEtude page', async () => {
    await directeurEtudeComponentsPage.clickOnCreateButton();
    directeurEtudeUpdatePage = new DirecteurEtudeUpdatePage();
    expect(await directeurEtudeUpdatePage.getPageTitle()).to.eq('Create or edit a Directeur Etude');
    await directeurEtudeUpdatePage.cancel();
  });

  it('should create and save DirecteurEtudes', async () => {
    const nbButtonsBeforeCreate = await directeurEtudeComponentsPage.countDeleteButtons();

    await directeurEtudeComponentsPage.clickOnCreateButton();

    await promise.all([
      directeurEtudeUpdatePage.setNomPrenomInput('nomPrenom'),
      directeurEtudeUpdatePage.userSelectLastOption(),
      directeurEtudeUpdatePage.nomLyceeSelectLastOption(),
    ]);

    await directeurEtudeUpdatePage.save();
    expect(await directeurEtudeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await directeurEtudeComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last DirecteurEtude', async () => {
    const nbButtonsBeforeDelete = await directeurEtudeComponentsPage.countDeleteButtons();
    await directeurEtudeComponentsPage.clickOnLastDeleteButton();

    directeurEtudeDeleteDialog = new DirecteurEtudeDeleteDialog();
    expect(await directeurEtudeDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Directeur Etude?');
    await directeurEtudeDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(directeurEtudeComponentsPage.title), 5000);

    expect(await directeurEtudeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
