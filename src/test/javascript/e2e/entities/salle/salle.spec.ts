import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SalleComponentsPage, SalleDeleteDialog, SalleUpdatePage } from './salle.page-object';

const expect = chai.expect;

describe('Salle e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let salleComponentsPage: SalleComponentsPage;
  let salleUpdatePage: SalleUpdatePage;
  let salleDeleteDialog: SalleDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Salles', async () => {
    await navBarPage.goToEntity('salle');
    salleComponentsPage = new SalleComponentsPage();
    await browser.wait(ec.visibilityOf(salleComponentsPage.title), 5000);
    expect(await salleComponentsPage.getTitle()).to.eq('Salles');
    await browser.wait(ec.or(ec.visibilityOf(salleComponentsPage.entities), ec.visibilityOf(salleComponentsPage.noResult)), 1000);
  });

  it('should load create Salle page', async () => {
    await salleComponentsPage.clickOnCreateButton();
    salleUpdatePage = new SalleUpdatePage();
    expect(await salleUpdatePage.getPageTitle()).to.eq('Create or edit a Salle');
    await salleUpdatePage.cancel();
  });

  it('should create and save Salles', async () => {
    const nbButtonsBeforeCreate = await salleComponentsPage.countDeleteButtons();

    await salleComponentsPage.clickOnCreateButton();

    await promise.all([
      salleUpdatePage.setNombreSalleclasseInput('nombreSalleclasse'),
      salleUpdatePage.setNombreAteliersInput('nombreAteliers'),
      salleUpdatePage.specialiaseSelectLastOption(),
      salleUpdatePage.setNombreSalleSpecialiseInput('nombreSalleSpecialise'),
      salleUpdatePage.setJustificationSalleSpeInput('justificationSalleSpe'),
      salleUpdatePage.cdiSelectLastOption(),
      salleUpdatePage.setNombreCDIInput('nombreCDI'),
      salleUpdatePage.setJustifiactifSalleCDIInput('justifiactifSalleCDI'),
      salleUpdatePage.jumSelectLastOption(),
      salleUpdatePage.setSalleJumInput('salleJum'),
      salleUpdatePage.setJustifiactifSalleJumInput('justifiactifSalleJum'),
      salleUpdatePage.setAutreSalleInput('autreSalle'),
      salleUpdatePage.lyceesTechniquesSelectLastOption(),
      salleUpdatePage.directeurSelectLastOption(),
    ]);

    await salleUpdatePage.save();
    expect(await salleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await salleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Salle', async () => {
    const nbButtonsBeforeDelete = await salleComponentsPage.countDeleteButtons();
    await salleComponentsPage.clickOnLastDeleteButton();

    salleDeleteDialog = new SalleDeleteDialog();
    expect(await salleDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Salle?');
    await salleDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(salleComponentsPage.title), 5000);

    expect(await salleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
