import { ILyceeTechnique } from 'app/entities/lycee-technique/lycee-technique.model';
import { TypeO } from 'app/entities/enumerations/type-o.model';
import { Fonctionnment } from 'app/entities/enumerations/fonctionnment.model';

export interface IOrgane {
  id?: number;
  type?: TypeO | null;
  fonctionnel?: Fonctionnment | null;
  description?: string | null;
  lyceeTechnique?: ILyceeTechnique | null;
}

export class Organe implements IOrgane {
  constructor(
    public id?: number,
    public type?: TypeO | null,
    public fonctionnel?: Fonctionnment | null,
    public description?: string | null,
    public lyceeTechnique?: ILyceeTechnique | null
  ) {}
}

export function getOrganeIdentifier(organe: IOrgane): number | undefined {
  return organe.id;
}
