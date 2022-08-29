import { IUser } from 'app/entities/user/user.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IRecette } from 'app/entities/recette/recette.model';
import { IDepense } from 'app/entities/depense/depense.model';

export interface IComptableFinancier {
  id?: number;
  nomPrenom?: string;
  user?: IUser | null;
  nomLycee?: ILyceesTechniques | null;
  recettes?: IRecette[] | null;
  depenses?: IDepense[] | null;
}

export class ComptableFinancier implements IComptableFinancier {
  constructor(
    public id?: number,
    public nomPrenom?: string,
    public user?: IUser | null,
    public nomLycee?: ILyceesTechniques | null,
    public recettes?: IRecette[] | null,
    public depenses?: IDepense[] | null
  ) {}
}

export function getComptableFinancierIdentifier(comptableFinancier: IComptableFinancier): number | undefined {
  return comptableFinancier.id;
}
