import * as dayjs from 'dayjs';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { NatureV } from 'app/entities/enumerations/nature-v.model';
import { ProvenanceV } from 'app/entities/enumerations/provenance-v.model';

export interface IVisite {
  id?: number;
  nature?: NatureV;
  autreNature?: string | null;
  provenance?: ProvenanceV;
  autreProvenance?: string | null;
  objet?: string;
  resultats?: string;
  periode?: dayjs.Dayjs;
  lyceesTechniques?: ILyceesTechniques | null;
  proviseur?: IProviseur | null;
}

export class Visite implements IVisite {
  constructor(
    public id?: number,
    public nature?: NatureV,
    public autreNature?: string | null,
    public provenance?: ProvenanceV,
    public autreProvenance?: string | null,
    public objet?: string,
    public resultats?: string,
    public periode?: dayjs.Dayjs,
    public lyceesTechniques?: ILyceesTechniques | null,
    public proviseur?: IProviseur | null
  ) {}
}

export function getVisiteIdentifier(visite: IVisite): number | undefined {
  return visite.id;
}
