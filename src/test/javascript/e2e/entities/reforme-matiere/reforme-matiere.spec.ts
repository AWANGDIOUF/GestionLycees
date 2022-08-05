import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ReformeMatiereComponentsPage, ReformeMatiereDeleteDialog, ReformeMatiereUpdatePage } from './reforme-matiere.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('ReformeMatiere e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reformeMatiereComponentsPage: ReformeMatiereComponentsPage;
  let reformeMatiereUpdatePage: ReformeMatiereUpdatePage;
  let reformeMatiereDeleteDialog: ReformeMatiereDeleteDialog;
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

  it('should load ReformeMatieres', async () => {
    await navBarPage.goToEntity('reforme-matiere');
    reformeMatiereComponentsPage = new ReformeMatiereComponentsPage();
    await browser.wait(ec.visibilityOf(reformeMatiereComponentsPage.title), 5000);
    expect(await reformeMatiereComponentsPage.getTitle()).to.eq('Reforme Matieres');
    await browser.wait(
      ec.or(ec.visibilityOf(reformeMatiereComponentsPage.entities), ec.visibilityOf(reformeMatiereComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ReformeMatiere page', async () => {
    await reformeMatiereComponentsPage.clickOnCreateButton();
    reformeMatiereUpdatePage = new ReformeMatiereUpdatePage();
    expect(await reformeMatiereUpdatePage.getPageTitle()).to.eq('Create or edit a Reforme Matiere');
    await reformeMatiereUpdatePage.cancel();
  });

  it('should create and save ReformeMatieres', async () => {
    const nbButtonsBeforeCreate = await reformeMatiereComponentsPage.countDeleteButtons();

    await reformeMatiereComponentsPage.clickOnCreateButton();

    await promise.all([
      reformeMatiereUpdatePage.groupSelectLastOption(),
      reformeMatiereUpdatePage.setDesignationDesmembreInput(absolutePath),
      reformeMatiereUpdatePage.setPvReformeInput(absolutePath),
      reformeMatiereUpdatePage.setSortieDefinitiveInput(absolutePath),
      reformeMatiereUpdatePage.setCertificatAdministratifInput(absolutePath),
      reformeMatiereUpdatePage.lyceesTechniquesSelectLastOption(),
      reformeMatiereUpdatePage.comptableMatiereSelectLastOption(),
    ]);

    await reformeMatiereUpdatePage.save();
    expect(await reformeMatiereUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await reformeMatiereComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ReformeMatiere', async () => {
    const nbButtonsBeforeDelete = await reformeMatiereComponentsPage.countDeleteButtons();
    await reformeMatiereComponentsPage.clickOnLastDeleteButton();

    reformeMatiereDeleteDialog = new ReformeMatiereDeleteDialog();
    expect(await reformeMatiereDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Reforme Matiere?');
    await reformeMatiereDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(reformeMatiereComponentsPage.title), 5000);

    expect(await reformeMatiereComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
