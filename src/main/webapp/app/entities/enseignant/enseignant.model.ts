import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { ISerie } from 'app/entities/serie/serie.model';
import { IFiliere } from 'app/entities/filiere/filiere.model';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { Genre } from 'app/entities/enumerations/genre.model';
import { Option } from 'app/entities/enumerations/option.model';
import { Situation } from 'app/entities/enumerations/situation.model';
import { StatusEns } from 'app/entities/enumerations/status-ens.model';

export interface IEnseignant {
  id?: number;
  matriculeEns?: string;
  nomPrenom?: string;
  sexe?: Genre;
  telephone?: string;
  mail?: string;
  grade?: string;
  option?: Option | null;
  situationMatrimoniale?: Situation;
  status?: StatusEns | null;
  fonction?: string;
  lyceesTechniques?: ILyceesTechniques | null;
  serie?: ISerie | null;
  filiere?: IFiliere | null;
  proviseur?: IProviseur | null;
}

export class Enseignant implements IEnseignant {
  constructor(
    public id?: number,
    public matriculeEns?: string,
    public nomPrenom?: string,
    public sexe?: Genre,
    public telephone?: string,
    public mail?: string,
    public grade?: string,
    public option?: Option | null,
    public situationMatrimoniale?: Situation,
    public status?: StatusEns | null,
    public fonction?: string,
    public lyceesTechniques?: ILyceesTechniques | null,
    public serie?: ISerie | null,
    public filiere?: IFiliere | null,
    public proviseur?: IProviseur | null
  ) {}
}

export function getEnseignantIdentifier(enseignant: IEnseignant): number | undefined {
  return enseignant.id;
}
