import * as dayjs from 'dayjs';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { IReception } from 'app/entities/reception/reception.model';

export interface IAttribution {
  id?: number;
  beneficiaire?: string;
  fonction?: string;
  date?: dayjs.Dayjs;
  lyceesTechniques?: ILyceesTechniques | null;
  comptableMatiere?: IComptableMatiere | null;
  reception?: IReception | null;
}

export class Attribution implements IAttribution {
  constructor(
    public id?: number,
    public beneficiaire?: string,
    public fonction?: string,
    public date?: dayjs.Dayjs,
    public lyceesTechniques?: ILyceesTechniques | null,
    public comptableMatiere?: IComptableMatiere | null,
    public reception?: IReception | null
  ) {}
}

export function getAttributionIdentifier(attribution: IAttribution): number | undefined {
  return attribution.id;
}
