import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ApprenantComponentsPage, ApprenantDeleteDialog, ApprenantUpdatePage } from './apprenant.page-object';

const expect = chai.expect;

describe('Apprenant e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let apprenantComponentsPage: ApprenantComponentsPage;
  let apprenantUpdatePage: ApprenantUpdatePage;
  let apprenantDeleteDialog: ApprenantDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Apprenants', async () => {
    await navBarPage.goToEntity('apprenant');
    apprenantComponentsPage = new ApprenantComponentsPage();
    await browser.wait(ec.visibilityOf(apprenantComponentsPage.title), 5000);
    expect(await apprenantComponentsPage.getTitle()).to.eq('Apprenants');
    await browser.wait(ec.or(ec.visibilityOf(apprenantComponentsPage.entities), ec.visibilityOf(apprenantComponentsPage.noResult)), 1000);
  });

  it('should load create Apprenant page', async () => {
    await apprenantComponentsPage.clickOnCreateButton();
    apprenantUpdatePage = new ApprenantUpdatePage();
    expect(await apprenantUpdatePage.getPageTitle()).to.eq('Create or edit a Apprenant');
    await apprenantUpdatePage.cancel();
  });

  it('should create and save Apprenants', async () => {
    const nbButtonsBeforeCreate = await apprenantComponentsPage.countDeleteButtons();

    await apprenantComponentsPage.clickOnCreateButton();

    await promise.all([
      apprenantUpdatePage.setNomPrenomInput('nomPrenom'),
      apprenantUpdatePage.setDateNaissanceInput('2000-12-31'),
      apprenantUpdatePage.setLieuNaissanceInput('lieuNaissance'),
      apprenantUpdatePage.setTelephoneInput('telephone'),
      apprenantUpdatePage.setAdresseInput('adresse'),
      apprenantUpdatePage.sexeSelectLastOption(),
      apprenantUpdatePage.optionSelectLastOption(),
      apprenantUpdatePage.situationMatrimonialeSelectLastOption(),
      apprenantUpdatePage.setTuteurInput('tuteur'),
      apprenantUpdatePage.setContactTuteurInput('contactTuteur'),
      apprenantUpdatePage.serieSelectLastOption(),
      apprenantUpdatePage.filiereSelectLastOption(),
      apprenantUpdatePage.lyceesTechniquesSelectLastOption(),
      apprenantUpdatePage.directeurSelectLastOption(),
    ]);

    await apprenantUpdatePage.save();
    expect(await apprenantUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await apprenantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Apprenant', async () => {
    const nbButtonsBeforeDelete = await apprenantComponentsPage.countDeleteButtons();
    await apprenantComponentsPage.clickOnLastDeleteButton();

    apprenantDeleteDialog = new ApprenantDeleteDialog();
    expect(await apprenantDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Apprenant?');
    await apprenantDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(apprenantComponentsPage.title), 5000);

    expect(await apprenantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
