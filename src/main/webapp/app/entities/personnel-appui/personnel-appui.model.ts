import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { Situation } from 'app/entities/enumerations/situation.model';
import { FonctionPersApp } from 'app/entities/enumerations/fonction-pers-app.model';

export interface IPersonnelAppui {
  id?: number;
  nom?: string;
  prenom?: string;
  situationMatrimoniale?: Situation;
  fonction?: FonctionPersApp;
  autreFoction?: string | null;
  telephone?: string;
  mail?: string;
  lyceesTechniques?: ILyceesTechniques | null;
  directeur?: IProviseur | null;
}

export class PersonnelAppui implements IPersonnelAppui {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public situationMatrimoniale?: Situation,
    public fonction?: FonctionPersApp,
    public autreFoction?: string | null,
    public telephone?: string,
    public mail?: string,
    public lyceesTechniques?: ILyceesTechniques | null,
    public directeur?: IProviseur | null
  ) {}
}

export function getPersonnelAppuiIdentifier(personnelAppui: IPersonnelAppui): number | undefined {
  return personnelAppui.id;
}
