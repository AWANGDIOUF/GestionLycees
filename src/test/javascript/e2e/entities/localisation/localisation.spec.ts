import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LocalisationComponentsPage, LocalisationDeleteDialog, LocalisationUpdatePage } from './localisation.page-object';

const expect = chai.expect;

describe('Localisation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let localisationComponentsPage: LocalisationComponentsPage;
  let localisationUpdatePage: LocalisationUpdatePage;
  let localisationDeleteDialog: LocalisationDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Localisations', async () => {
    await navBarPage.goToEntity('localisation');
    localisationComponentsPage = new LocalisationComponentsPage();
    await browser.wait(ec.visibilityOf(localisationComponentsPage.title), 5000);
    expect(await localisationComponentsPage.getTitle()).to.eq('Localisations');
    await browser.wait(
      ec.or(ec.visibilityOf(localisationComponentsPage.entities), ec.visibilityOf(localisationComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Localisation page', async () => {
    await localisationComponentsPage.clickOnCreateButton();
    localisationUpdatePage = new LocalisationUpdatePage();
    expect(await localisationUpdatePage.getPageTitle()).to.eq('Create or edit a Localisation');
    await localisationUpdatePage.cancel();
  });

  it('should create and save Localisations', async () => {
    const nbButtonsBeforeCreate = await localisationComponentsPage.countDeleteButtons();

    await localisationComponentsPage.clickOnCreateButton();

    await promise.all([
      localisationUpdatePage.regionSelectLastOption(),
      localisationUpdatePage.departementDakarSelectLastOption(),
      localisationUpdatePage.departementDiourbelSelectLastOption(),
      localisationUpdatePage.departementFatickSelectLastOption(),
      localisationUpdatePage.departementKaffrineSelectLastOption(),
      localisationUpdatePage.departementKaolackSelectLastOption(),
      localisationUpdatePage.departementKedougouSelectLastOption(),
      localisationUpdatePage.departementKoldaSelectLastOption(),
      localisationUpdatePage.departementLougaSelectLastOption(),
      localisationUpdatePage.departementMatamSelectLastOption(),
      localisationUpdatePage.departementSaintSelectLastOption(),
      localisationUpdatePage.departementSedhiouSelectLastOption(),
      localisationUpdatePage.departementTambacoundaSelectLastOption(),
      localisationUpdatePage.departementThisSelectLastOption(),
      localisationUpdatePage.departementZicSelectLastOption(),
      localisationUpdatePage.setIaInput('ia'),
      localisationUpdatePage.lyceesTechniquesSelectLastOption(),
      localisationUpdatePage.proviseurSelectLastOption(),
    ]);

    await localisationUpdatePage.save();
    expect(await localisationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await localisationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Localisation', async () => {
    const nbButtonsBeforeDelete = await localisationComponentsPage.countDeleteButtons();
    await localisationComponentsPage.clickOnLastDeleteButton();

    localisationDeleteDialog = new LocalisationDeleteDialog();
    expect(await localisationDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Localisation?');
    await localisationDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(localisationComponentsPage.title), 5000);

    expect(await localisationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
