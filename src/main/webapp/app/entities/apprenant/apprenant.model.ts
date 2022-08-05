import * as dayjs from 'dayjs';
import { ISerie } from 'app/entities/serie/serie.model';
import { IFiliere } from 'app/entities/filiere/filiere.model';
import { IExamen } from 'app/entities/examen/examen.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';
import { Genre } from 'app/entities/enumerations/genre.model';
import { Option } from 'app/entities/enumerations/option.model';
import { Situation } from 'app/entities/enumerations/situation.model';

export interface IApprenant {
  id?: number;
  nomPrenom?: string;
  dateNaissance?: dayjs.Dayjs;
  lieuNaissance?: string;
  telephone?: string;
  adresse?: string;
  sexe?: Genre;
  option?: Option | null;
  situationMatrimoniale?: Situation;
  tuteur?: string;
  contactTuteur?: string;
  serie?: ISerie | null;
  filiere?: IFiliere | null;
  examen?: IExamen[] | null;
  lyceesTechniques?: ILyceesTechniques | null;
  directeur?: IDirecteurEtude | null;
}

export class Apprenant implements IApprenant {
  constructor(
    public id?: number,
    public nomPrenom?: string,
    public dateNaissance?: dayjs.Dayjs,
    public lieuNaissance?: string,
    public telephone?: string,
    public adresse?: string,
    public sexe?: Genre,
    public option?: Option | null,
    public situationMatrimoniale?: Situation,
    public tuteur?: string,
    public contactTuteur?: string,
    public serie?: ISerie | null,
    public filiere?: IFiliere | null,
    public examen?: IExamen[] | null,
    public lyceesTechniques?: ILyceesTechniques | null,
    public directeur?: IDirecteurEtude | null
  ) {}
}

export function getApprenantIdentifier(apprenant: IApprenant): number | undefined {
  return apprenant.id;
}
