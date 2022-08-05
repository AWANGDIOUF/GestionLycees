import * as dayjs from 'dayjs';
import { IDepense } from 'app/entities/depense/depense.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IComptableFinancier } from 'app/entities/comptable-financier/comptable-financier.model';
import { TypeR } from 'app/entities/enumerations/type-r.model';

export interface IRecette {
  id?: number;
  type?: TypeR;
  autreRecette?: string | null;
  typeRessource?: string | null;
  montant?: string | null;
  date?: dayjs.Dayjs;
  depense?: IDepense | null;
  lyceesTechniques?: ILyceesTechniques | null;
  comptableFinancier?: IComptableFinancier | null;
}

export class Recette implements IRecette {
  constructor(
    public id?: number,
    public type?: TypeR,
    public autreRecette?: string | null,
    public typeRessource?: string | null,
    public montant?: string | null,
    public date?: dayjs.Dayjs,
    public depense?: IDepense | null,
    public lyceesTechniques?: ILyceesTechniques | null,
    public comptableFinancier?: IComptableFinancier | null
  ) {}
}

export function getRecetteIdentifier(recette: IRecette): number | undefined {
  return recette.id;
}
