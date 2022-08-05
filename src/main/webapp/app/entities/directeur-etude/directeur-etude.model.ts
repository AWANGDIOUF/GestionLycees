import { IUser } from 'app/entities/user/user.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IConcours } from 'app/entities/concours/concours.model';
import { IFormation } from 'app/entities/formation/formation.model';
import { ISalle } from 'app/entities/salle/salle.model';
import { ISerie } from 'app/entities/serie/serie.model';
import { INiveauxEtudes } from 'app/entities/niveaux-etudes/niveaux-etudes.model';
import { IFiliere } from 'app/entities/filiere/filiere.model';
import { IProgramme } from 'app/entities/programme/programme.model';
import { INiveauxCalification } from 'app/entities/niveaux-calification/niveaux-calification.model';
import { IApprenant } from 'app/entities/apprenant/apprenant.model';
import { IExamen } from 'app/entities/examen/examen.model';

export interface IDirecteurEtude {
  id?: number;
  nomPrenom?: string;
  user?: IUser | null;
  nomLycee?: ILyceesTechniques | null;
  concours?: IConcours[] | null;
  formations?: IFormation[] | null;
  salles?: ISalle[] | null;
  series?: ISerie[] | null;
  niveaus?: INiveauxEtudes[] | null;
  filieres?: IFiliere[] | null;
  programmes?: IProgramme[] | null;
  niveauCalifications?: INiveauxCalification[] | null;
  apprenants?: IApprenant[] | null;
  examen?: IExamen[] | null;
}

export class DirecteurEtude implements IDirecteurEtude {
  constructor(
    public id?: number,
    public nomPrenom?: string,
    public user?: IUser | null,
    public nomLycee?: ILyceesTechniques | null,
    public concours?: IConcours[] | null,
    public formations?: IFormation[] | null,
    public salles?: ISalle[] | null,
    public series?: ISerie[] | null,
    public niveaus?: INiveauxEtudes[] | null,
    public filieres?: IFiliere[] | null,
    public programmes?: IProgramme[] | null,
    public niveauCalifications?: INiveauxCalification[] | null,
    public apprenants?: IApprenant[] | null,
    public examen?: IExamen[] | null
  ) {}
}

export function getDirecteurEtudeIdentifier(directeurEtude: IDirecteurEtude): number | undefined {
  return directeurEtude.id;
}
