import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LyceesTechniquesComponentsPage, LyceesTechniquesDeleteDialog, LyceesTechniquesUpdatePage } from './lycees-techniques.page-object';

const expect = chai.expect;

describe('LyceesTechniques e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let lyceesTechniquesComponentsPage: LyceesTechniquesComponentsPage;
  let lyceesTechniquesUpdatePage: LyceesTechniquesUpdatePage;
  let lyceesTechniquesDeleteDialog: LyceesTechniquesDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LyceesTechniques', async () => {
    await navBarPage.goToEntity('lycees-techniques');
    lyceesTechniquesComponentsPage = new LyceesTechniquesComponentsPage();
    await browser.wait(ec.visibilityOf(lyceesTechniquesComponentsPage.title), 5000);
    expect(await lyceesTechniquesComponentsPage.getTitle()).to.eq('Lycees Techniques');
    await browser.wait(
      ec.or(ec.visibilityOf(lyceesTechniquesComponentsPage.entities), ec.visibilityOf(lyceesTechniquesComponentsPage.noResult)),
      1000
    );
  });

  it('should load create LyceesTechniques page', async () => {
    await lyceesTechniquesComponentsPage.clickOnCreateButton();
    lyceesTechniquesUpdatePage = new LyceesTechniquesUpdatePage();
    expect(await lyceesTechniquesUpdatePage.getPageTitle()).to.eq('Create or edit a Lycees Techniques');
    await lyceesTechniquesUpdatePage.cancel();
  });

  it('should create and save LyceesTechniques', async () => {
    const nbButtonsBeforeCreate = await lyceesTechniquesComponentsPage.countDeleteButtons();

    await lyceesTechniquesComponentsPage.clickOnCreateButton();

    await promise.all([lyceesTechniquesUpdatePage.setNomLyceeInput('nomLycee')]);

    await lyceesTechniquesUpdatePage.save();
    expect(await lyceesTechniquesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await lyceesTechniquesComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last LyceesTechniques', async () => {
    const nbButtonsBeforeDelete = await lyceesTechniquesComponentsPage.countDeleteButtons();
    await lyceesTechniquesComponentsPage.clickOnLastDeleteButton();

    lyceesTechniquesDeleteDialog = new LyceesTechniquesDeleteDialog();
    expect(await lyceesTechniquesDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Lycees Techniques?');
    await lyceesTechniquesDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(lyceesTechniquesComponentsPage.title), 5000);

    expect(await lyceesTechniquesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
