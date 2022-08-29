import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PersonnelAppuiComponentsPage, PersonnelAppuiDeleteDialog, PersonnelAppuiUpdatePage } from './personnel-appui.page-object';

const expect = chai.expect;

describe('PersonnelAppui e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let personnelAppuiComponentsPage: PersonnelAppuiComponentsPage;
  let personnelAppuiUpdatePage: PersonnelAppuiUpdatePage;
  let personnelAppuiDeleteDialog: PersonnelAppuiDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PersonnelAppuis', async () => {
    await navBarPage.goToEntity('personnel-appui');
    personnelAppuiComponentsPage = new PersonnelAppuiComponentsPage();
    await browser.wait(ec.visibilityOf(personnelAppuiComponentsPage.title), 5000);
    expect(await personnelAppuiComponentsPage.getTitle()).to.eq('Personnel Appuis');
    await browser.wait(
      ec.or(ec.visibilityOf(personnelAppuiComponentsPage.entities), ec.visibilityOf(personnelAppuiComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PersonnelAppui page', async () => {
    await personnelAppuiComponentsPage.clickOnCreateButton();
    personnelAppuiUpdatePage = new PersonnelAppuiUpdatePage();
    expect(await personnelAppuiUpdatePage.getPageTitle()).to.eq('Create or edit a Personnel Appui');
    await personnelAppuiUpdatePage.cancel();
  });

  it('should create and save PersonnelAppuis', async () => {
    const nbButtonsBeforeCreate = await personnelAppuiComponentsPage.countDeleteButtons();

    await personnelAppuiComponentsPage.clickOnCreateButton();

    await promise.all([
      personnelAppuiUpdatePage.setNomInput('nom'),
      personnelAppuiUpdatePage.setPrenomInput('prenom'),
      personnelAppuiUpdatePage.situationMatrimonialeSelectLastOption(),
      personnelAppuiUpdatePage.fonctionSelectLastOption(),
      personnelAppuiUpdatePage.setAutreFoctionInput('autreFoction'),
      personnelAppuiUpdatePage.setTelephoneInput('telephone'),
      personnelAppuiUpdatePage.setMailInput('mail'),
      personnelAppuiUpdatePage.lyceesTechniquesSelectLastOption(),
      personnelAppuiUpdatePage.directeurSelectLastOption(),
    ]);

    await personnelAppuiUpdatePage.save();
    expect(await personnelAppuiUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await personnelAppuiComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last PersonnelAppui', async () => {
    const nbButtonsBeforeDelete = await personnelAppuiComponentsPage.countDeleteButtons();
    await personnelAppuiComponentsPage.clickOnLastDeleteButton();

    personnelAppuiDeleteDialog = new PersonnelAppuiDeleteDialog();
    expect(await personnelAppuiDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Personnel Appui?');
    await personnelAppuiDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(personnelAppuiComponentsPage.title), 5000);

    expect(await personnelAppuiComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
