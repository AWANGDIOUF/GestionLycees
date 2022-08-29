import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';
import { IProgramme } from 'app/entities/programme/programme.model';

export interface INiveauxCalification {
  id?: number;
  niveauCalification?: string;
  lyceesTechniques?: ILyceesTechniques | null;
  directeur?: IDirecteurEtude | null;
  programme?: IProgramme | null;
}

export class NiveauxCalification implements INiveauxCalification {
  constructor(
    public id?: number,
    public niveauCalification?: string,
    public lyceesTechniques?: ILyceesTechniques | null,
    public directeur?: IDirecteurEtude | null,
    public programme?: IProgramme | null
  ) {}
}

export function getNiveauxCalificationIdentifier(niveauxCalification: INiveauxCalification): number | undefined {
  return niveauxCalification.id;
}
