import * as dayjs from 'dayjs';
import { IMateriel } from 'app/entities/materiel/materiel.model';
import { IAttribution } from 'app/entities/attribution/attribution.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { Group } from 'app/entities/enumerations/group.model';
import { ProvenanceMat } from 'app/entities/enumerations/provenance-mat.model';

export interface IReception {
  id?: number;
  libelleMateriel?: string;
  typeGroup?: Group;
  provenance?: ProvenanceMat;
  fournisseur?: string;
  date?: dayjs.Dayjs;
  materiels?: IMateriel[] | null;
  attributions?: IAttribution[] | null;
  lyceesTechniques?: ILyceesTechniques | null;
  comptableMatiere?: IComptableMatiere | null;
}

export class Reception implements IReception {
  constructor(
    public id?: number,
    public libelleMateriel?: string,
    public typeGroup?: Group,
    public provenance?: ProvenanceMat,
    public fournisseur?: string,
    public date?: dayjs.Dayjs,
    public materiels?: IMateriel[] | null,
    public attributions?: IAttribution[] | null,
    public lyceesTechniques?: ILyceesTechniques | null,
    public comptableMatiere?: IComptableMatiere | null
  ) {}
}

export function getReceptionIdentifier(reception: IReception): number | undefined {
  return reception.id;
}
