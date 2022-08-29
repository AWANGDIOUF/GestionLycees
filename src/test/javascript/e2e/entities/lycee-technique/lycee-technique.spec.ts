import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LyceeTechniqueComponentsPage, LyceeTechniqueDeleteDialog, LyceeTechniqueUpdatePage } from './lycee-technique.page-object';

const expect = chai.expect;

describe('LyceeTechnique e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let lyceeTechniqueComponentsPage: LyceeTechniqueComponentsPage;
  let lyceeTechniqueUpdatePage: LyceeTechniqueUpdatePage;
  let lyceeTechniqueDeleteDialog: LyceeTechniqueDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LyceeTechniques', async () => {
    await navBarPage.goToEntity('lycee-technique');
    lyceeTechniqueComponentsPage = new LyceeTechniqueComponentsPage();
    await browser.wait(ec.visibilityOf(lyceeTechniqueComponentsPage.title), 5000);
    expect(await lyceeTechniqueComponentsPage.getTitle()).to.eq('Lycee Techniques');
    await browser.wait(
      ec.or(ec.visibilityOf(lyceeTechniqueComponentsPage.entities), ec.visibilityOf(lyceeTechniqueComponentsPage.noResult)),
      1000
    );
  });

  it('should load create LyceeTechnique page', async () => {
    await lyceeTechniqueComponentsPage.clickOnCreateButton();
    lyceeTechniqueUpdatePage = new LyceeTechniqueUpdatePage();
    expect(await lyceeTechniqueUpdatePage.getPageTitle()).to.eq('Create or edit a Lycee Technique');
    await lyceeTechniqueUpdatePage.cancel();
  });

  it('should create and save LyceeTechniques', async () => {
    const nbButtonsBeforeCreate = await lyceeTechniqueComponentsPage.countDeleteButtons();

    await lyceeTechniqueComponentsPage.clickOnCreateButton();

    await promise.all([
      lyceeTechniqueUpdatePage.setPrenomNomInput('prenomNom'),
      lyceeTechniqueUpdatePage.setAdresseInput('adresse'),
      lyceeTechniqueUpdatePage.setMailInput('mail'),
      lyceeTechniqueUpdatePage.setTel1Input('tel1'),
      lyceeTechniqueUpdatePage.setTel2Input('tel2'),
      lyceeTechniqueUpdatePage.setBoitePostalInput('boitePostal'),
      lyceeTechniqueUpdatePage.setDecretCreationInput('decretCreation'),
      lyceeTechniqueUpdatePage.setDateCreationInput('2000-12-31'),
      lyceeTechniqueUpdatePage.regionSelectLastOption(),
      lyceeTechniqueUpdatePage.setAutreRegionInput('autreRegion'),
      lyceeTechniqueUpdatePage.departementDakarSelectLastOption(),
      lyceeTechniqueUpdatePage.departementDiourbelSelectLastOption(),
      lyceeTechniqueUpdatePage.departementFatickSelectLastOption(),
      lyceeTechniqueUpdatePage.departementKaffrineSelectLastOption(),
      lyceeTechniqueUpdatePage.departementKaolackSelectLastOption(),
      lyceeTechniqueUpdatePage.departementKedougouSelectLastOption(),
      lyceeTechniqueUpdatePage.departementKoldaSelectLastOption(),
      lyceeTechniqueUpdatePage.departementLougaSelectLastOption(),
      lyceeTechniqueUpdatePage.departementMatamSelectLastOption(),
      lyceeTechniqueUpdatePage.departementSaintSelectLastOption(),
      lyceeTechniqueUpdatePage.departementSedhiouSelectLastOption(),
      lyceeTechniqueUpdatePage.departementTambacoundaSelectLastOption(),
      lyceeTechniqueUpdatePage.departementThisSelectLastOption(),
      lyceeTechniqueUpdatePage.departementZiguinchorSelectLastOption(),
      lyceeTechniqueUpdatePage.setAutredepartementDakarInput('autredepartementDakar'),
      lyceeTechniqueUpdatePage.setAutredepartementDiourbelInput('autredepartementDiourbel'),
      lyceeTechniqueUpdatePage.setAutredepartementFatickInput('autredepartementFatick'),
      lyceeTechniqueUpdatePage.setAutredepartementKaffrineInput('autredepartementKaffrine'),
      lyceeTechniqueUpdatePage.setAutredepartementKaolackInput('autredepartementKaolack'),
      lyceeTechniqueUpdatePage.setAutredepartementKedougouInput('autredepartementKedougou'),
      lyceeTechniqueUpdatePage.setAutredepartementKoldaInput('autredepartementKolda'),
      lyceeTechniqueUpdatePage.setAutredepartementLougaInput('autredepartementLouga'),
      lyceeTechniqueUpdatePage.setAutredepartementMatamInput('autredepartementMatam'),
      lyceeTechniqueUpdatePage.setAutredepartementSaintInput('autredepartementSaint'),
      lyceeTechniqueUpdatePage.setAutredepartementSedhiouInput('autredepartementSedhiou'),
      lyceeTechniqueUpdatePage.setAutredepartementTambacoundaInput('autredepartementTambacounda'),
      lyceeTechniqueUpdatePage.setAutredepartementThisInput('autredepartementThis'),
      lyceeTechniqueUpdatePage.setAutredepartementZiguinchorInput('autredepartementZiguinchor'),
      lyceeTechniqueUpdatePage.setCommuneInput('commune'),
      lyceeTechniqueUpdatePage.setIaInput('ia'),
      lyceeTechniqueUpdatePage.proviseurSelectLastOption(),
      lyceeTechniqueUpdatePage.nomLyceeSelectLastOption(),
    ]);

    await lyceeTechniqueUpdatePage.save();
    expect(await lyceeTechniqueUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await lyceeTechniqueComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last LyceeTechnique', async () => {
    const nbButtonsBeforeDelete = await lyceeTechniqueComponentsPage.countDeleteButtons();
    await lyceeTechniqueComponentsPage.clickOnLastDeleteButton();

    lyceeTechniqueDeleteDialog = new LyceeTechniqueDeleteDialog();
    expect(await lyceeTechniqueDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Lycee Technique?');
    await lyceeTechniqueDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(lyceeTechniqueComponentsPage.title), 5000);

    expect(await lyceeTechniqueComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
