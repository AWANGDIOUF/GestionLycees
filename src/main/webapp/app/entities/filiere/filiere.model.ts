import { IEnseignant } from 'app/entities/enseignant/enseignant.model';
import { IProgramme } from 'app/entities/programme/programme.model';
import { IExamen } from 'app/entities/examen/examen.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';
import { Filieres } from 'app/entities/enumerations/filieres.model';

export interface IFiliere {
  id?: number;
  nomFiliere?: Filieres;
  nomAutre?: string | null;
  enseignants?: IEnseignant[] | null;
  programmes?: IProgramme[] | null;
  examen?: IExamen[] | null;
  lyceesTechniques?: ILyceesTechniques | null;
  directeur?: IDirecteurEtude | null;
}

export class Filiere implements IFiliere {
  constructor(
    public id?: number,
    public nomFiliere?: Filieres,
    public nomAutre?: string | null,
    public enseignants?: IEnseignant[] | null,
    public programmes?: IProgramme[] | null,
    public examen?: IExamen[] | null,
    public lyceesTechniques?: ILyceesTechniques | null,
    public directeur?: IDirecteurEtude | null
  ) {}
}

export function getFiliereIdentifier(filiere: IFiliere): number | undefined {
  return filiere.id;
}
