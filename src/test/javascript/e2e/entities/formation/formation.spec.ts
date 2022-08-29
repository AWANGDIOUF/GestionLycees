import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FormationComponentsPage, FormationDeleteDialog, FormationUpdatePage } from './formation.page-object';

const expect = chai.expect;

describe('Formation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let formationComponentsPage: FormationComponentsPage;
  let formationUpdatePage: FormationUpdatePage;
  let formationDeleteDialog: FormationDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Formations', async () => {
    await navBarPage.goToEntity('formation');
    formationComponentsPage = new FormationComponentsPage();
    await browser.wait(ec.visibilityOf(formationComponentsPage.title), 5000);
    expect(await formationComponentsPage.getTitle()).to.eq('Formations');
    await browser.wait(ec.or(ec.visibilityOf(formationComponentsPage.entities), ec.visibilityOf(formationComponentsPage.noResult)), 1000);
  });

  it('should load create Formation page', async () => {
    await formationComponentsPage.clickOnCreateButton();
    formationUpdatePage = new FormationUpdatePage();
    expect(await formationUpdatePage.getPageTitle()).to.eq('Create or edit a Formation');
    await formationUpdatePage.cancel();
  });

  it('should create and save Formations', async () => {
    const nbButtonsBeforeCreate = await formationComponentsPage.countDeleteButtons();

    await formationComponentsPage.clickOnCreateButton();

    await promise.all([
      formationUpdatePage.setNomFormationInput('nomFormation'),
      formationUpdatePage.setTypeFormationInput('typeFormation'),
      formationUpdatePage.setNiveauFormationInput('niveauFormation'),
      formationUpdatePage.setDureeInput('PT12S'),
      formationUpdatePage.setSecteurInput('secteur'),
      formationUpdatePage.setModaliteInput('modalite'),
      formationUpdatePage.lyceesTechniquesSelectLastOption(),
      formationUpdatePage.directeurSelectLastOption(),
    ]);

    await formationUpdatePage.save();
    expect(await formationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await formationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Formation', async () => {
    const nbButtonsBeforeDelete = await formationComponentsPage.countDeleteButtons();
    await formationComponentsPage.clickOnLastDeleteButton();

    formationDeleteDialog = new FormationDeleteDialog();
    expect(await formationDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Formation?');
    await formationDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(formationComponentsPage.title), 5000);

    expect(await formationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
