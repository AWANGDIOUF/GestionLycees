import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { IReception } from 'app/entities/reception/reception.model';
import { Categorie } from 'app/entities/enumerations/categorie.model';
import { EtatMateriel } from 'app/entities/enumerations/etat-materiel.model';

export interface IMateriel {
  id?: number;
  categorieMateriel?: Categorie;
  etatMateriel?: EtatMateriel;
  lyceesTechniques?: ILyceesTechniques | null;
  comptableMatiere?: IComptableMatiere | null;
  reception?: IReception | null;
}

export class Materiel implements IMateriel {
  constructor(
    public id?: number,
    public categorieMateriel?: Categorie,
    public etatMateriel?: EtatMateriel,
    public lyceesTechniques?: ILyceesTechniques | null,
    public comptableMatiere?: IComptableMatiere | null,
    public reception?: IReception | null
  ) {}
}

export function getMaterielIdentifier(materiel: IMateriel): number | undefined {
  return materiel.id;
}
