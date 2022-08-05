import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';

export interface IFormation {
  id?: number;
  nomFormation?: string | null;
  typeFormation?: string | null;
  niveauFormation?: string | null;
  duree?: string | null;
  secteur?: string | null;
  modalite?: string | null;
  lyceesTechniques?: ILyceesTechniques | null;
  directeur?: IDirecteurEtude | null;
}

export class Formation implements IFormation {
  constructor(
    public id?: number,
    public nomFormation?: string | null,
    public typeFormation?: string | null,
    public niveauFormation?: string | null,
    public duree?: string | null,
    public secteur?: string | null,
    public modalite?: string | null,
    public lyceesTechniques?: ILyceesTechniques | null,
    public directeur?: IDirecteurEtude | null
  ) {}
}

export function getFormationIdentifier(formation: IFormation): number | undefined {
  return formation.id;
}
