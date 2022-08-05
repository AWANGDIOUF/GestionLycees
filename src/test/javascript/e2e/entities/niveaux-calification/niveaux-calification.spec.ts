import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  NiveauxCalificationComponentsPage,
  NiveauxCalificationDeleteDialog,
  NiveauxCalificationUpdatePage,
} from './niveaux-calification.page-object';

const expect = chai.expect;

describe('NiveauxCalification e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let niveauxCalificationComponentsPage: NiveauxCalificationComponentsPage;
  let niveauxCalificationUpdatePage: NiveauxCalificationUpdatePage;
  let niveauxCalificationDeleteDialog: NiveauxCalificationDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NiveauxCalifications', async () => {
    await navBarPage.goToEntity('niveaux-calification');
    niveauxCalificationComponentsPage = new NiveauxCalificationComponentsPage();
    await browser.wait(ec.visibilityOf(niveauxCalificationComponentsPage.title), 5000);
    expect(await niveauxCalificationComponentsPage.getTitle()).to.eq('Niveaux Califications');
    await browser.wait(
      ec.or(ec.visibilityOf(niveauxCalificationComponentsPage.entities), ec.visibilityOf(niveauxCalificationComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NiveauxCalification page', async () => {
    await niveauxCalificationComponentsPage.clickOnCreateButton();
    niveauxCalificationUpdatePage = new NiveauxCalificationUpdatePage();
    expect(await niveauxCalificationUpdatePage.getPageTitle()).to.eq('Create or edit a Niveaux Calification');
    await niveauxCalificationUpdatePage.cancel();
  });

  it('should create and save NiveauxCalifications', async () => {
    const nbButtonsBeforeCreate = await niveauxCalificationComponentsPage.countDeleteButtons();

    await niveauxCalificationComponentsPage.clickOnCreateButton();

    await promise.all([
      niveauxCalificationUpdatePage.setNiveauCalificationInput('niveauCalification'),
      niveauxCalificationUpdatePage.lyceesTechniquesSelectLastOption(),
      niveauxCalificationUpdatePage.directeurSelectLastOption(),
      niveauxCalificationUpdatePage.programmeSelectLastOption(),
    ]);

    await niveauxCalificationUpdatePage.save();
    expect(await niveauxCalificationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await niveauxCalificationComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last NiveauxCalification', async () => {
    const nbButtonsBeforeDelete = await niveauxCalificationComponentsPage.countDeleteButtons();
    await niveauxCalificationComponentsPage.clickOnLastDeleteButton();

    niveauxCalificationDeleteDialog = new NiveauxCalificationDeleteDialog();
    expect(await niveauxCalificationDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Niveaux Calification?');
    await niveauxCalificationDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(niveauxCalificationComponentsPage.title), 5000);

    expect(await niveauxCalificationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
