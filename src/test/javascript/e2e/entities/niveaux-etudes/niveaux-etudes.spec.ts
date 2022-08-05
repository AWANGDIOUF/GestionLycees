import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NiveauxEtudesComponentsPage, NiveauxEtudesDeleteDialog, NiveauxEtudesUpdatePage } from './niveaux-etudes.page-object';

const expect = chai.expect;

describe('NiveauxEtudes e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let niveauxEtudesComponentsPage: NiveauxEtudesComponentsPage;
  let niveauxEtudesUpdatePage: NiveauxEtudesUpdatePage;
  let niveauxEtudesDeleteDialog: NiveauxEtudesDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NiveauxEtudes', async () => {
    await navBarPage.goToEntity('niveaux-etudes');
    niveauxEtudesComponentsPage = new NiveauxEtudesComponentsPage();
    await browser.wait(ec.visibilityOf(niveauxEtudesComponentsPage.title), 5000);
    expect(await niveauxEtudesComponentsPage.getTitle()).to.eq('Niveaux Etudes');
    await browser.wait(
      ec.or(ec.visibilityOf(niveauxEtudesComponentsPage.entities), ec.visibilityOf(niveauxEtudesComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NiveauxEtudes page', async () => {
    await niveauxEtudesComponentsPage.clickOnCreateButton();
    niveauxEtudesUpdatePage = new NiveauxEtudesUpdatePage();
    expect(await niveauxEtudesUpdatePage.getPageTitle()).to.eq('Create or edit a Niveaux Etudes');
    await niveauxEtudesUpdatePage.cancel();
  });

  it('should create and save NiveauxEtudes', async () => {
    const nbButtonsBeforeCreate = await niveauxEtudesComponentsPage.countDeleteButtons();

    await niveauxEtudesComponentsPage.clickOnCreateButton();

    await promise.all([
      niveauxEtudesUpdatePage.setNomNiveauInput('nomNiveau'),
      niveauxEtudesUpdatePage.lyceesTechniquesSelectLastOption(),
      niveauxEtudesUpdatePage.directeurSelectLastOption(),
      niveauxEtudesUpdatePage.serieSelectLastOption(),
    ]);

    await niveauxEtudesUpdatePage.save();
    expect(await niveauxEtudesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await niveauxEtudesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last NiveauxEtudes', async () => {
    const nbButtonsBeforeDelete = await niveauxEtudesComponentsPage.countDeleteButtons();
    await niveauxEtudesComponentsPage.clickOnLastDeleteButton();

    niveauxEtudesDeleteDialog = new NiveauxEtudesDeleteDialog();
    expect(await niveauxEtudesDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Niveaux Etudes?');
    await niveauxEtudesDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(niveauxEtudesComponentsPage.title), 5000);

    expect(await niveauxEtudesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
