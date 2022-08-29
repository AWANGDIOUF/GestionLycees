import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { Group } from 'app/entities/enumerations/group.model';

export interface IIventaireDesMatetiere {
  id?: number;
  group?: Group | null;
  designationMembreContentType?: string | null;
  designationMembre?: string | null;
  pvDinventaireContentType?: string | null;
  pvDinventaire?: string | null;
  lyceesTechniques?: ILyceesTechniques | null;
  comptableMatiere?: IComptableMatiere | null;
}

export class IventaireDesMatetiere implements IIventaireDesMatetiere {
  constructor(
    public id?: number,
    public group?: Group | null,
    public designationMembreContentType?: string | null,
    public designationMembre?: string | null,
    public pvDinventaireContentType?: string | null,
    public pvDinventaire?: string | null,
    public lyceesTechniques?: ILyceesTechniques | null,
    public comptableMatiere?: IComptableMatiere | null
  ) {}
}

export function getIventaireDesMatetiereIdentifier(iventaireDesMatetiere: IIventaireDesMatetiere): number | undefined {
  return iventaireDesMatetiere.id;
}
