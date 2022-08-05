import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DifficulteComponentsPage, DifficulteDeleteDialog, DifficulteUpdatePage } from './difficulte.page-object';

const expect = chai.expect;

describe('Difficulte e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let difficulteComponentsPage: DifficulteComponentsPage;
  let difficulteUpdatePage: DifficulteUpdatePage;
  let difficulteDeleteDialog: DifficulteDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Difficultes', async () => {
    await navBarPage.goToEntity('difficulte');
    difficulteComponentsPage = new DifficulteComponentsPage();
    await browser.wait(ec.visibilityOf(difficulteComponentsPage.title), 5000);
    expect(await difficulteComponentsPage.getTitle()).to.eq('Difficultes');
    await browser.wait(ec.or(ec.visibilityOf(difficulteComponentsPage.entities), ec.visibilityOf(difficulteComponentsPage.noResult)), 1000);
  });

  it('should load create Difficulte page', async () => {
    await difficulteComponentsPage.clickOnCreateButton();
    difficulteUpdatePage = new DifficulteUpdatePage();
    expect(await difficulteUpdatePage.getPageTitle()).to.eq('Create or edit a Difficulte');
    await difficulteUpdatePage.cancel();
  });

  it('should create and save Difficultes', async () => {
    const nbButtonsBeforeCreate = await difficulteComponentsPage.countDeleteButtons();

    await difficulteComponentsPage.clickOnCreateButton();

    await promise.all([
      difficulteUpdatePage.natureSelectLastOption(),
      difficulteUpdatePage.setAutreNatureInput('autreNature'),
      difficulteUpdatePage.setDescriptionInput('description'),
      difficulteUpdatePage.setSolutionInput('solution'),
      difficulteUpdatePage.setObservationInput('observation'),
      difficulteUpdatePage.lyceesTechniquesSelectLastOption(),
      difficulteUpdatePage.proviseurSelectLastOption(),
    ]);

    await difficulteUpdatePage.save();
    expect(await difficulteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await difficulteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Difficulte', async () => {
    const nbButtonsBeforeDelete = await difficulteComponentsPage.countDeleteButtons();
    await difficulteComponentsPage.clickOnLastDeleteButton();

    difficulteDeleteDialog = new DifficulteDeleteDialog();
    expect(await difficulteDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Difficulte?');
    await difficulteDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(difficulteComponentsPage.title), 5000);

    expect(await difficulteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
