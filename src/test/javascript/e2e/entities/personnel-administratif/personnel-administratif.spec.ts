import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  PersonnelAdministratifComponentsPage,
  PersonnelAdministratifDeleteDialog,
  PersonnelAdministratifUpdatePage,
} from './personnel-administratif.page-object';

const expect = chai.expect;

describe('PersonnelAdministratif e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let personnelAdministratifComponentsPage: PersonnelAdministratifComponentsPage;
  let personnelAdministratifUpdatePage: PersonnelAdministratifUpdatePage;
  let personnelAdministratifDeleteDialog: PersonnelAdministratifDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PersonnelAdministratifs', async () => {
    await navBarPage.goToEntity('personnel-administratif');
    personnelAdministratifComponentsPage = new PersonnelAdministratifComponentsPage();
    await browser.wait(ec.visibilityOf(personnelAdministratifComponentsPage.title), 5000);
    expect(await personnelAdministratifComponentsPage.getTitle()).to.eq('Personnel Administratifs');
    await browser.wait(
      ec.or(ec.visibilityOf(personnelAdministratifComponentsPage.entities), ec.visibilityOf(personnelAdministratifComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PersonnelAdministratif page', async () => {
    await personnelAdministratifComponentsPage.clickOnCreateButton();
    personnelAdministratifUpdatePage = new PersonnelAdministratifUpdatePage();
    expect(await personnelAdministratifUpdatePage.getPageTitle()).to.eq('Create or edit a Personnel Administratif');
    await personnelAdministratifUpdatePage.cancel();
  });

  it('should create and save PersonnelAdministratifs', async () => {
    const nbButtonsBeforeCreate = await personnelAdministratifComponentsPage.countDeleteButtons();

    await personnelAdministratifComponentsPage.clickOnCreateButton();

    await promise.all([
      personnelAdministratifUpdatePage.setMatriculeInput('matricule'),
      personnelAdministratifUpdatePage.setNomInput('nom'),
      personnelAdministratifUpdatePage.setPrenomInput('prenom'),
      personnelAdministratifUpdatePage.situationMatrimonialeSelectLastOption(),
      personnelAdministratifUpdatePage.fonctionSelectLastOption(),
      personnelAdministratifUpdatePage.setAutreFonctionInput('autreFonction'),
      personnelAdministratifUpdatePage.setTelephoneInput('telephone'),
      personnelAdministratifUpdatePage.setMailInput('mail'),
      personnelAdministratifUpdatePage.lyceesTechniquesSelectLastOption(),
      personnelAdministratifUpdatePage.proviseurSelectLastOption(),
    ]);

    await personnelAdministratifUpdatePage.save();
    expect(await personnelAdministratifUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await personnelAdministratifComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last PersonnelAdministratif', async () => {
    const nbButtonsBeforeDelete = await personnelAdministratifComponentsPage.countDeleteButtons();
    await personnelAdministratifComponentsPage.clickOnLastDeleteButton();

    personnelAdministratifDeleteDialog = new PersonnelAdministratifDeleteDialog();
    expect(await personnelAdministratifDeleteDialog.getDialogTitle()).to.eq(
      'Are you sure you want to delete this Personnel Administratif?'
    );
    await personnelAdministratifDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(personnelAdministratifComponentsPage.title), 5000);

    expect(await personnelAdministratifComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
