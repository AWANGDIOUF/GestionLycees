import { ILyceeTechnique } from 'app/entities/lycee-technique/lycee-technique.model';
import { Nature } from 'app/entities/enumerations/nature.model';

export interface IProbleme {
  id?: number;
  nature?: Nature | null;
  description?: string | null;
  solution?: string | null;
  lyceeTechnique?: ILyceeTechnique | null;
}

export class Probleme implements IProbleme {
  constructor(
    public id?: number,
    public nature?: Nature | null,
    public description?: string | null,
    public solution?: string | null,
    public lyceeTechnique?: ILyceeTechnique | null
  ) {}
}

export function getProblemeIdentifier(probleme: IProbleme): number | undefined {
  return probleme.id;
}
