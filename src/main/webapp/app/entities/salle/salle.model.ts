import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';
import { Specialise } from 'app/entities/enumerations/specialise.model';
import { Cdi } from 'app/entities/enumerations/cdi.model';
import { Jum } from 'app/entities/enumerations/jum.model';

export interface ISalle {
  id?: number;
  nombreSalleclasse?: string;
  nombreAteliers?: string;
  specialiase?: Specialise | null;
  nombreSalleSpecialise?: string;
  justificationSalleSpe?: string | null;
  cdi?: Cdi | null;
  nombreCDI?: string | null;
  justifiactifSalleCDI?: string | null;
  jum?: Jum | null;
  salleJum?: string | null;
  justifiactifSalleJum?: string | null;
  autreSalle?: string | null;
  lyceesTechniques?: ILyceesTechniques | null;
  directeur?: IDirecteurEtude | null;
}

export class Salle implements ISalle {
  constructor(
    public id?: number,
    public nombreSalleclasse?: string,
    public nombreAteliers?: string,
    public specialiase?: Specialise | null,
    public nombreSalleSpecialise?: string,
    public justificationSalleSpe?: string | null,
    public cdi?: Cdi | null,
    public nombreCDI?: string | null,
    public justifiactifSalleCDI?: string | null,
    public jum?: Jum | null,
    public salleJum?: string | null,
    public justifiactifSalleJum?: string | null,
    public autreSalle?: string | null,
    public lyceesTechniques?: ILyceesTechniques | null,
    public directeur?: IDirecteurEtude | null
  ) {}
}

export function getSalleIdentifier(salle: ISalle): number | undefined {
  return salle.id;
}
