import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { NatureDif } from 'app/entities/enumerations/nature-dif.model';

export interface IDifficulte {
  id?: number;
  nature?: NatureDif;
  autreNature?: string | null;
  description?: string;
  solution?: string;
  observation?: string;
  lyceesTechniques?: ILyceesTechniques | null;
  proviseur?: IProviseur | null;
}

export class Difficulte implements IDifficulte {
  constructor(
    public id?: number,
    public nature?: NatureDif,
    public autreNature?: string | null,
    public description?: string,
    public solution?: string,
    public observation?: string,
    public lyceesTechniques?: ILyceesTechniques | null,
    public proviseur?: IProviseur | null
  ) {}
}

export function getDifficulteIdentifier(difficulte: IDifficulte): number | undefined {
  return difficulte.id;
}
