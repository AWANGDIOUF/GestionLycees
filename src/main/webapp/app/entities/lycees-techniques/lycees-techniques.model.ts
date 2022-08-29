import { IConcours } from 'app/entities/concours/concours.model';
import { IFormation } from 'app/entities/formation/formation.model';
import { IExamen } from 'app/entities/examen/examen.model';
import { IRecette } from 'app/entities/recette/recette.model';
import { IDepense } from 'app/entities/depense/depense.model';
import { IVisite } from 'app/entities/visite/visite.model';
import { IOrganeGestion } from 'app/entities/organe-gestion/organe-gestion.model';
import { IMouvementMatiere } from 'app/entities/mouvement-matiere/mouvement-matiere.model';
import { IPartenaire } from 'app/entities/partenaire/partenaire.model';
import { IBesoin } from 'app/entities/besoin/besoin.model';
import { IPersonnelAdministratif } from 'app/entities/personnel-administratif/personnel-administratif.model';
import { IPersonnelAppui } from 'app/entities/personnel-appui/personnel-appui.model';
import { ISerie } from 'app/entities/serie/serie.model';
import { IFiliere } from 'app/entities/filiere/filiere.model';
import { ISalle } from 'app/entities/salle/salle.model';
import { IApprenant } from 'app/entities/apprenant/apprenant.model';
import { IEnseignant } from 'app/entities/enseignant/enseignant.model';
import { IDifficulte } from 'app/entities/difficulte/difficulte.model';
import { INiveauxCalification } from 'app/entities/niveaux-calification/niveaux-calification.model';
import { IReformeMatiere } from 'app/entities/reforme-matiere/reforme-matiere.model';
import { IIventaireDesMatetiere } from 'app/entities/iventaire-des-matetiere/iventaire-des-matetiere.model';
import { IProgramme } from 'app/entities/programme/programme.model';
import { INiveauxEtudes } from 'app/entities/niveaux-etudes/niveaux-etudes.model';
import { ILyceeTechnique } from 'app/entities/lycee-technique/lycee-technique.model';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';
import { IComptableFinancier } from 'app/entities/comptable-financier/comptable-financier.model';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';

export interface ILyceesTechniques {
  id?: number;
  nomLycee?: string;
  concours?: IConcours[] | null;
  formations?: IFormation[] | null;
  examen?: IExamen[] | null;
  recettes?: IRecette[] | null;
  depenses?: IDepense[] | null;
  visites?: IVisite[] | null;
  organes?: IOrganeGestion[] | null;
  mouvementMatieres?: IMouvementMatiere[] | null;
  partenaires?: IPartenaire[] | null;
  besoins?: IBesoin[] | null;
  personnelAdmiistratifs?: IPersonnelAdministratif[] | null;
  personnelAppuis?: IPersonnelAppui[] | null;
  series?: ISerie[] | null;
  filieres?: IFiliere[] | null;
  salles?: ISalle[] | null;
  apprenants?: IApprenant[] | null;
  enseignants?: IEnseignant[] | null;
  difficultes?: IDifficulte[] | null;
  niveaucalifications?: INiveauxCalification[] | null;
  reformeMatieres?: IReformeMatiere[] | null;
  iventaireDesMatetieres?: IIventaireDesMatetiere[] | null;
  programmes?: IProgramme[] | null;
  niveauetudes?: INiveauxEtudes[] | null;
  lyceeTechnique?: ILyceeTechnique | null;
  proviseur?: IProviseur | null;
  directeurEtude?: IDirecteurEtude | null;
  comptableFinancie?: IComptableFinancier | null;
  comptableMatiere?: IComptableMatiere | null;
}

export class LyceesTechniques implements ILyceesTechniques {
  constructor(
    public id?: number,
    public nomLycee?: string,
    public concours?: IConcours[] | null,
    public formations?: IFormation[] | null,
    public examen?: IExamen[] | null,
    public recettes?: IRecette[] | null,
    public depenses?: IDepense[] | null,
    public visites?: IVisite[] | null,
    public organes?: IOrganeGestion[] | null,
    public mouvementMatieres?: IMouvementMatiere[] | null,
    public partenaires?: IPartenaire[] | null,
    public besoins?: IBesoin[] | null,
    public personnelAdmiistratifs?: IPersonnelAdministratif[] | null,
    public personnelAppuis?: IPersonnelAppui[] | null,
    public series?: ISerie[] | null,
    public filieres?: IFiliere[] | null,
    public salles?: ISalle[] | null,
    public apprenants?: IApprenant[] | null,
    public enseignants?: IEnseignant[] | null,
    public difficultes?: IDifficulte[] | null,
    public niveaucalifications?: INiveauxCalification[] | null,
    public reformeMatieres?: IReformeMatiere[] | null,
    public iventaireDesMatetieres?: IIventaireDesMatetiere[] | null,
    public programmes?: IProgramme[] | null,
    public niveauetudes?: INiveauxEtudes[] | null,
    public lyceeTechnique?: ILyceeTechnique | null,
    public proviseur?: IProviseur | null,
    public directeurEtude?: IDirecteurEtude | null,
    public comptableFinancie?: IComptableFinancier | null,
    public comptableMatiere?: IComptableMatiere | null
  ) {}
}

export function getLyceesTechniquesIdentifier(lyceesTechniques: ILyceesTechniques): number | undefined {
  return lyceesTechniques.id;
}
