import * as dayjs from 'dayjs';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';

export interface IConcours {
  id?: number;
  nomConcours?: string | null;
  dateOuverture?: dayjs.Dayjs | null;
  dateCloture?: dayjs.Dayjs | null;
  nbreCandidats?: number | null;
  dateConcours?: dayjs.Dayjs | null;
  dateDeliberation?: dayjs.Dayjs | null;
  nbreAdmis?: number | null;
  lyceesTechniques?: ILyceesTechniques | null;
  directeur?: IDirecteurEtude | null;
}

export class Concours implements IConcours {
  constructor(
    public id?: number,
    public nomConcours?: string | null,
    public dateOuverture?: dayjs.Dayjs | null,
    public dateCloture?: dayjs.Dayjs | null,
    public nbreCandidats?: number | null,
    public dateConcours?: dayjs.Dayjs | null,
    public dateDeliberation?: dayjs.Dayjs | null,
    public nbreAdmis?: number | null,
    public lyceesTechniques?: ILyceesTechniques | null,
    public directeur?: IDirecteurEtude | null
  ) {}
}

export function getConcoursIdentifier(concours: IConcours): number | undefined {
  return concours.id;
}
