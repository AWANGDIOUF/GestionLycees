import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SerieComponentsPage, SerieDeleteDialog, SerieUpdatePage } from './serie.page-object';

const expect = chai.expect;

describe('Serie e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let serieComponentsPage: SerieComponentsPage;
  let serieUpdatePage: SerieUpdatePage;
  let serieDeleteDialog: SerieDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Series', async () => {
    await navBarPage.goToEntity('serie');
    serieComponentsPage = new SerieComponentsPage();
    await browser.wait(ec.visibilityOf(serieComponentsPage.title), 5000);
    expect(await serieComponentsPage.getTitle()).to.eq('Series');
    await browser.wait(ec.or(ec.visibilityOf(serieComponentsPage.entities), ec.visibilityOf(serieComponentsPage.noResult)), 1000);
  });

  it('should load create Serie page', async () => {
    await serieComponentsPage.clickOnCreateButton();
    serieUpdatePage = new SerieUpdatePage();
    expect(await serieUpdatePage.getPageTitle()).to.eq('Create or edit a Serie');
    await serieUpdatePage.cancel();
  });

  it('should create and save Series', async () => {
    const nbButtonsBeforeCreate = await serieComponentsPage.countDeleteButtons();

    await serieComponentsPage.clickOnCreateButton();

    await promise.all([
      serieUpdatePage.nomSerieSelectLastOption(),
      serieUpdatePage.setAutreSerieInput('autreSerie'),
      serieUpdatePage.lyceesTechniquesSelectLastOption(),
      serieUpdatePage.directeurSelectLastOption(),
    ]);

    await serieUpdatePage.save();
    expect(await serieUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await serieComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Serie', async () => {
    const nbButtonsBeforeDelete = await serieComponentsPage.countDeleteButtons();
    await serieComponentsPage.clickOnLastDeleteButton();

    serieDeleteDialog = new SerieDeleteDialog();
    expect(await serieDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Serie?');
    await serieDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(serieComponentsPage.title), 5000);

    expect(await serieComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
