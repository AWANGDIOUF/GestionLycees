import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';
import { ISerie } from 'app/entities/serie/serie.model';
import { IFiliere } from 'app/entities/filiere/filiere.model';
import { IApprenant } from 'app/entities/apprenant/apprenant.model';
import { TypeExam } from 'app/entities/enumerations/type-exam.model';
import { Option } from 'app/entities/enumerations/option.model';
import { StatusApp } from 'app/entities/enumerations/status-app.model';

export interface IExamen {
  id?: number;
  type?: TypeExam;
  autres?: string | null;
  option?: Option | null;
  status?: StatusApp | null;
  lyceesTechniques?: ILyceesTechniques | null;
  directeur?: IDirecteurEtude | null;
  serie?: ISerie | null;
  filiere?: IFiliere | null;
  apprenant?: IApprenant | null;
}

export class Examen implements IExamen {
  constructor(
    public id?: number,
    public type?: TypeExam,
    public autres?: string | null,
    public option?: Option | null,
    public status?: StatusApp | null,
    public lyceesTechniques?: ILyceesTechniques | null,
    public directeur?: IDirecteurEtude | null,
    public serie?: ISerie | null,
    public filiere?: IFiliere | null,
    public apprenant?: IApprenant | null
  ) {}
}

export function getExamenIdentifier(examen: IExamen): number | undefined {
  return examen.id;
}
