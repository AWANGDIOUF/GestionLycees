import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  IventaireDesMatetiereComponentsPage,
  IventaireDesMatetiereDeleteDialog,
  IventaireDesMatetiereUpdatePage,
} from './iventaire-des-matetiere.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('IventaireDesMatetiere e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let iventaireDesMatetiereComponentsPage: IventaireDesMatetiereComponentsPage;
  let iventaireDesMatetiereUpdatePage: IventaireDesMatetiereUpdatePage;
  let iventaireDesMatetiereDeleteDialog: IventaireDesMatetiereDeleteDialog;
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

  it('should load IventaireDesMatetieres', async () => {
    await navBarPage.goToEntity('iventaire-des-matetiere');
    iventaireDesMatetiereComponentsPage = new IventaireDesMatetiereComponentsPage();
    await browser.wait(ec.visibilityOf(iventaireDesMatetiereComponentsPage.title), 5000);
    expect(await iventaireDesMatetiereComponentsPage.getTitle()).to.eq('Iventaire Des Matetieres');
    await browser.wait(
      ec.or(ec.visibilityOf(iventaireDesMatetiereComponentsPage.entities), ec.visibilityOf(iventaireDesMatetiereComponentsPage.noResult)),
      1000
    );
  });

  it('should load create IventaireDesMatetiere page', async () => {
    await iventaireDesMatetiereComponentsPage.clickOnCreateButton();
    iventaireDesMatetiereUpdatePage = new IventaireDesMatetiereUpdatePage();
    expect(await iventaireDesMatetiereUpdatePage.getPageTitle()).to.eq('Create or edit a Iventaire Des Matetiere');
    await iventaireDesMatetiereUpdatePage.cancel();
  });

  it('should create and save IventaireDesMatetieres', async () => {
    const nbButtonsBeforeCreate = await iventaireDesMatetiereComponentsPage.countDeleteButtons();

    await iventaireDesMatetiereComponentsPage.clickOnCreateButton();

    await promise.all([
      iventaireDesMatetiereUpdatePage.groupSelectLastOption(),
      iventaireDesMatetiereUpdatePage.setDesignationMembreInput(absolutePath),
      iventaireDesMatetiereUpdatePage.setPvDinventaireInput(absolutePath),
      iventaireDesMatetiereUpdatePage.lyceesTechniquesSelectLastOption(),
      iventaireDesMatetiereUpdatePage.comptableMatiereSelectLastOption(),
    ]);

    await iventaireDesMatetiereUpdatePage.save();
    expect(await iventaireDesMatetiereUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await iventaireDesMatetiereComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last IventaireDesMatetiere', async () => {
    const nbButtonsBeforeDelete = await iventaireDesMatetiereComponentsPage.countDeleteButtons();
    await iventaireDesMatetiereComponentsPage.clickOnLastDeleteButton();

    iventaireDesMatetiereDeleteDialog = new IventaireDesMatetiereDeleteDialog();
    expect(await iventaireDesMatetiereDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Iventaire Des Matetiere?');
    await iventaireDesMatetiereDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(iventaireDesMatetiereComponentsPage.title), 5000);

    expect(await iventaireDesMatetiereComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
