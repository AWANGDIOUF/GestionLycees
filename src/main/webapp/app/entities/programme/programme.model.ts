import { INiveauxCalification } from 'app/entities/niveaux-calification/niveaux-calification.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';
import { IFiliere } from 'app/entities/filiere/filiere.model';

export interface IProgramme {
  id?: number;
  nomProgramme?: string | null;
  niveauCalifications?: INiveauxCalification[] | null;
  lyceesTechniques?: ILyceesTechniques | null;
  directeur?: IDirecteurEtude | null;
  filiere?: IFiliere | null;
}

export class Programme implements IProgramme {
  constructor(
    public id?: number,
    public nomProgramme?: string | null,
    public niveauCalifications?: INiveauxCalification[] | null,
    public lyceesTechniques?: ILyceesTechniques | null,
    public directeur?: IDirecteurEtude | null,
    public filiere?: IFiliere | null
  ) {}
}

export function getProgrammeIdentifier(programme: IProgramme): number | undefined {
  return programme.id;
}
