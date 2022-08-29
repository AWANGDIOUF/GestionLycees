import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MaterielComponentsPage, MaterielDeleteDialog, MaterielUpdatePage } from './materiel.page-object';

const expect = chai.expect;

describe('Materiel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let materielComponentsPage: MaterielComponentsPage;
  let materielUpdatePage: MaterielUpdatePage;
  let materielDeleteDialog: MaterielDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Materiels', async () => {
    await navBarPage.goToEntity('materiel');
    materielComponentsPage = new MaterielComponentsPage();
    await browser.wait(ec.visibilityOf(materielComponentsPage.title), 5000);
    expect(await materielComponentsPage.getTitle()).to.eq('Materiels');
    await browser.wait(ec.or(ec.visibilityOf(materielComponentsPage.entities), ec.visibilityOf(materielComponentsPage.noResult)), 1000);
  });

  it('should load create Materiel page', async () => {
    await materielComponentsPage.clickOnCreateButton();
    materielUpdatePage = new MaterielUpdatePage();
    expect(await materielUpdatePage.getPageTitle()).to.eq('Create or edit a Materiel');
    await materielUpdatePage.cancel();
  });

  it('should create and save Materiels', async () => {
    const nbButtonsBeforeCreate = await materielComponentsPage.countDeleteButtons();

    await materielComponentsPage.clickOnCreateButton();

    await promise.all([
      materielUpdatePage.categorieMaterielSelectLastOption(),
      materielUpdatePage.etatMaterielSelectLastOption(),
      materielUpdatePage.lyceesTechniquesSelectLastOption(),
      materielUpdatePage.comptableMatiereSelectLastOption(),
      materielUpdatePage.receptionSelectLastOption(),
    ]);

    await materielUpdatePage.save();
    expect(await materielUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await materielComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Materiel', async () => {
    const nbButtonsBeforeDelete = await materielComponentsPage.countDeleteButtons();
    await materielComponentsPage.clickOnLastDeleteButton();

    materielDeleteDialog = new MaterielDeleteDialog();
    expect(await materielDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Materiel?');
    await materielDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(materielComponentsPage.title), 5000);

    expect(await materielComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
