import * as dayjs from 'dayjs';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { TypeO } from 'app/entities/enumerations/type-o.model';
import { Fonctionnment } from 'app/entities/enumerations/fonctionnment.model';

export interface IOrganeGestion {
  id?: number;
  type?: TypeO;
  autreType?: string | null;
  fonctionnel?: Fonctionnment | null;
  activite?: string;
  dateActivite?: dayjs.Dayjs;
  rapportContentType?: string | null;
  rapport?: string | null;
  lyceesTechniques?: ILyceesTechniques | null;
  proviseur?: IProviseur | null;
}

export class OrganeGestion implements IOrganeGestion {
  constructor(
    public id?: number,
    public type?: TypeO,
    public autreType?: string | null,
    public fonctionnel?: Fonctionnment | null,
    public activite?: string,
    public dateActivite?: dayjs.Dayjs,
    public rapportContentType?: string | null,
    public rapport?: string | null,
    public lyceesTechniques?: ILyceesTechniques | null,
    public proviseur?: IProviseur | null
  ) {}
}

export function getOrganeGestionIdentifier(organeGestion: IOrganeGestion): number | undefined {
  return organeGestion.id;
}
