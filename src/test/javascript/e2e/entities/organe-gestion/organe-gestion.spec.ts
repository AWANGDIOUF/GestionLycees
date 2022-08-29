import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrganeGestionComponentsPage, OrganeGestionDeleteDialog, OrganeGestionUpdatePage } from './organe-gestion.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('OrganeGestion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let organeGestionComponentsPage: OrganeGestionComponentsPage;
  let organeGestionUpdatePage: OrganeGestionUpdatePage;
  let organeGestionDeleteDialog: OrganeGestionDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load OrganeGestions', async () => {
    await navBarPage.goToEntity('organe-gestion');
    organeGestionComponentsPage = new OrganeGestionComponentsPage();
    await browser.wait(ec.visibilityOf(organeGestionComponentsPage.title), 5000);
    expect(await organeGestionComponentsPage.getTitle()).to.eq('Organe Gestions');
    await browser.wait(
      ec.or(ec.visibilityOf(organeGestionComponentsPage.entities), ec.visibilityOf(organeGestionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create OrganeGestion page', async () => {
    await organeGestionComponentsPage.clickOnCreateButton();
    organeGestionUpdatePage = new OrganeGestionUpdatePage();
    expect(await organeGestionUpdatePage.getPageTitle()).to.eq('Create or edit a Organe Gestion');
    await organeGestionUpdatePage.cancel();
  });

  it('should create and save OrganeGestions', async () => {
    const nbButtonsBeforeCreate = await organeGestionComponentsPage.countDeleteButtons();

    await organeGestionComponentsPage.clickOnCreateButton();

    await promise.all([
      organeGestionUpdatePage.typeSelectLastOption(),
      organeGestionUpdatePage.setAutreTypeInput('autreType'),
      organeGestionUpdatePage.fonctionnelSelectLastOption(),
      organeGestionUpdatePage.setActiviteInput('activite'),
      organeGestionUpdatePage.setDateActiviteInput('2000-12-31'),
      organeGestionUpdatePage.setRapportInput(absolutePath),
      organeGestionUpdatePage.lyceesTechniquesSelectLastOption(),
      organeGestionUpdatePage.proviseurSelectLastOption(),
    ]);

    await organeGestionUpdatePage.save();
    expect(await organeGestionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await organeGestionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last OrganeGestion', async () => {
    const nbButtonsBeforeDelete = await organeGestionComponentsPage.countDeleteButtons();
    await organeGestionComponentsPage.clickOnLastDeleteButton();

    organeGestionDeleteDialog = new OrganeGestionDeleteDialog();
    expect(await organeGestionDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Organe Gestion?');
    await organeGestionDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(organeGestionComponentsPage.title), 5000);

    expect(await organeGestionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
