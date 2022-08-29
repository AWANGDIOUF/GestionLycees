import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { Situation } from 'app/entities/enumerations/situation.model';
import { FonctionPersAd } from 'app/entities/enumerations/fonction-pers-ad.model';

export interface IPersonnelAdministratif {
  id?: number;
  matricule?: string;
  nom?: string;
  prenom?: string;
  situationMatrimoniale?: Situation;
  fonction?: FonctionPersAd;
  autreFonction?: string | null;
  telephone?: string;
  mail?: string;
  lyceesTechniques?: ILyceesTechniques | null;
  proviseur?: IProviseur | null;
}

export class PersonnelAdministratif implements IPersonnelAdministratif {
  constructor(
    public id?: number,
    public matricule?: string,
    public nom?: string,
    public prenom?: string,
    public situationMatrimoniale?: Situation,
    public fonction?: FonctionPersAd,
    public autreFonction?: string | null,
    public telephone?: string,
    public mail?: string,
    public lyceesTechniques?: ILyceesTechniques | null,
    public proviseur?: IProviseur | null
  ) {}
}

export function getPersonnelAdministratifIdentifier(personnelAdministratif: IPersonnelAdministratif): number | undefined {
  return personnelAdministratif.id;
}
