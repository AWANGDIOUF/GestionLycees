import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ComptableMatiereComponentsPage, ComptableMatiereDeleteDialog, ComptableMatiereUpdatePage } from './comptable-matiere.page-object';

const expect = chai.expect;

describe('ComptableMatiere e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let comptableMatiereComponentsPage: ComptableMatiereComponentsPage;
  let comptableMatiereUpdatePage: ComptableMatiereUpdatePage;
  let comptableMatiereDeleteDialog: ComptableMatiereDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ComptableMatieres', async () => {
    await navBarPage.goToEntity('comptable-matiere');
    comptableMatiereComponentsPage = new ComptableMatiereComponentsPage();
    await browser.wait(ec.visibilityOf(comptableMatiereComponentsPage.title), 5000);
    expect(await comptableMatiereComponentsPage.getTitle()).to.eq('Comptable Matieres');
    await browser.wait(
      ec.or(ec.visibilityOf(comptableMatiereComponentsPage.entities), ec.visibilityOf(comptableMatiereComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ComptableMatiere page', async () => {
    await comptableMatiereComponentsPage.clickOnCreateButton();
    comptableMatiereUpdatePage = new ComptableMatiereUpdatePage();
    expect(await comptableMatiereUpdatePage.getPageTitle()).to.eq('Create or edit a Comptable Matiere');
    await comptableMatiereUpdatePage.cancel();
  });

  it('should create and save ComptableMatieres', async () => {
    const nbButtonsBeforeCreate = await comptableMatiereComponentsPage.countDeleteButtons();

    await comptableMatiereComponentsPage.clickOnCreateButton();

    await promise.all([
      comptableMatiereUpdatePage.setNomPrenomInput('nomPrenom'),
      comptableMatiereUpdatePage.userSelectLastOption(),
      comptableMatiereUpdatePage.nomLyceeSelectLastOption(),
    ]);

    await comptableMatiereUpdatePage.save();
    expect(await comptableMatiereUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await comptableMatiereComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ComptableMatiere', async () => {
    const nbButtonsBeforeDelete = await comptableMatiereComponentsPage.countDeleteButtons();
    await comptableMatiereComponentsPage.clickOnLastDeleteButton();

    comptableMatiereDeleteDialog = new ComptableMatiereDeleteDialog();
    expect(await comptableMatiereDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Comptable Matiere?');
    await comptableMatiereDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(comptableMatiereComponentsPage.title), 5000);

    expect(await comptableMatiereComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
