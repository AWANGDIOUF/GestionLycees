import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ConcoursComponentsPage, ConcoursDeleteDialog, ConcoursUpdatePage } from './concours.page-object';

const expect = chai.expect;

describe('Concours e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let concoursComponentsPage: ConcoursComponentsPage;
  let concoursUpdatePage: ConcoursUpdatePage;
  let concoursDeleteDialog: ConcoursDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Concours', async () => {
    await navBarPage.goToEntity('concours');
    concoursComponentsPage = new ConcoursComponentsPage();
    await browser.wait(ec.visibilityOf(concoursComponentsPage.title), 5000);
    expect(await concoursComponentsPage.getTitle()).to.eq('Concours');
    await browser.wait(ec.or(ec.visibilityOf(concoursComponentsPage.entities), ec.visibilityOf(concoursComponentsPage.noResult)), 1000);
  });

  it('should load create Concours page', async () => {
    await concoursComponentsPage.clickOnCreateButton();
    concoursUpdatePage = new ConcoursUpdatePage();
    expect(await concoursUpdatePage.getPageTitle()).to.eq('Create or edit a Concours');
    await concoursUpdatePage.cancel();
  });

  it('should create and save Concours', async () => {
    const nbButtonsBeforeCreate = await concoursComponentsPage.countDeleteButtons();

    await concoursComponentsPage.clickOnCreateButton();

    await promise.all([
      concoursUpdatePage.setNomConcoursInput('nomConcours'),
      concoursUpdatePage.setDateOuvertureInput('2000-12-31'),
      concoursUpdatePage.setDateClotureInput('2000-12-31'),
      concoursUpdatePage.setNbreCandidatsInput('5'),
      concoursUpdatePage.setDateConcoursInput('2000-12-31'),
      concoursUpdatePage.setDateDeliberationInput('2000-12-31'),
      concoursUpdatePage.setNbreAdmisInput('5'),
      concoursUpdatePage.lyceesTechniquesSelectLastOption(),
      concoursUpdatePage.directeurSelectLastOption(),
    ]);

    await concoursUpdatePage.save();
    expect(await concoursUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await concoursComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Concours', async () => {
    const nbButtonsBeforeDelete = await concoursComponentsPage.countDeleteButtons();
    await concoursComponentsPage.clickOnLastDeleteButton();

    concoursDeleteDialog = new ConcoursDeleteDialog();
    expect(await concoursDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Concours?');
    await concoursDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(concoursComponentsPage.title), 5000);

    expect(await concoursComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
