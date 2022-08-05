import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProgrammeComponentsPage, ProgrammeDeleteDialog, ProgrammeUpdatePage } from './programme.page-object';

const expect = chai.expect;

describe('Programme e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let programmeComponentsPage: ProgrammeComponentsPage;
  let programmeUpdatePage: ProgrammeUpdatePage;
  let programmeDeleteDialog: ProgrammeDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Programmes', async () => {
    await navBarPage.goToEntity('programme');
    programmeComponentsPage = new ProgrammeComponentsPage();
    await browser.wait(ec.visibilityOf(programmeComponentsPage.title), 5000);
    expect(await programmeComponentsPage.getTitle()).to.eq('Programmes');
    await browser.wait(ec.or(ec.visibilityOf(programmeComponentsPage.entities), ec.visibilityOf(programmeComponentsPage.noResult)), 1000);
  });

  it('should load create Programme page', async () => {
    await programmeComponentsPage.clickOnCreateButton();
    programmeUpdatePage = new ProgrammeUpdatePage();
    expect(await programmeUpdatePage.getPageTitle()).to.eq('Create or edit a Programme');
    await programmeUpdatePage.cancel();
  });

  it('should create and save Programmes', async () => {
    const nbButtonsBeforeCreate = await programmeComponentsPage.countDeleteButtons();

    await programmeComponentsPage.clickOnCreateButton();

    await promise.all([
      programmeUpdatePage.setNomProgrammeInput('nomProgramme'),
      programmeUpdatePage.lyceesTechniquesSelectLastOption(),
      programmeUpdatePage.directeurSelectLastOption(),
      programmeUpdatePage.filiereSelectLastOption(),
    ]);

    await programmeUpdatePage.save();
    expect(await programmeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await programmeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Programme', async () => {
    const nbButtonsBeforeDelete = await programmeComponentsPage.countDeleteButtons();
    await programmeComponentsPage.clickOnLastDeleteButton();

    programmeDeleteDialog = new ProgrammeDeleteDialog();
    expect(await programmeDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Programme?');
    await programmeDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(programmeComponentsPage.title), 5000);

    expect(await programmeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
