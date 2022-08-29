import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { TypeB } from 'app/entities/enumerations/type-b.model';

export interface IBesoin {
  id?: number;
  type?: TypeB;
  autreBesoin?: string | null;
  designation?: string | null;
  etatActuel?: string | null;
  interventionSouhaitee?: string;
  justification?: string;
  lyceesTechniques?: ILyceesTechniques | null;
  proviseur?: IProviseur | null;
}

export class Besoin implements IBesoin {
  constructor(
    public id?: number,
    public type?: TypeB,
    public autreBesoin?: string | null,
    public designation?: string | null,
    public etatActuel?: string | null,
    public interventionSouhaitee?: string,
    public justification?: string,
    public lyceesTechniques?: ILyceesTechniques | null,
    public proviseur?: IProviseur | null
  ) {}
}

export function getBesoinIdentifier(besoin: IBesoin): number | undefined {
  return besoin.id;
}
