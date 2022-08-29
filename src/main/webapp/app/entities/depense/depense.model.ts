import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IComptableFinancier } from 'app/entities/comptable-financier/comptable-financier.model';
import { IRecette } from 'app/entities/recette/recette.model';
import { TypeDepense } from 'app/entities/enumerations/type-depense.model';

export interface IDepense {
  id?: number;
  typeDepense?: TypeDepense;
  autreDepense?: string | null;
  description?: string;
  montantDepense?: string;
  lyceesTechniques?: ILyceesTechniques | null;
  comptableFinancier?: IComptableFinancier | null;
  recettes?: IRecette[] | null;
}

export class Depense implements IDepense {
  constructor(
    public id?: number,
    public typeDepense?: TypeDepense,
    public autreDepense?: string | null,
    public description?: string,
    public montantDepense?: string,
    public lyceesTechniques?: ILyceesTechniques | null,
    public comptableFinancier?: IComptableFinancier | null,
    public recettes?: IRecette[] | null
  ) {}
}

export function getDepenseIdentifier(depense: IDepense): number | undefined {
  return depense.id;
}
