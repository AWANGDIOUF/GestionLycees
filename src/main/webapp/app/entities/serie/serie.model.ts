import { IEnseignant } from 'app/entities/enseignant/enseignant.model';
import { INiveauxEtudes } from 'app/entities/niveaux-etudes/niveaux-etudes.model';
import { IExamen } from 'app/entities/examen/examen.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';
import { Series } from 'app/entities/enumerations/series.model';

export interface ISerie {
  id?: number;
  nomSerie?: Series;
  autreSerie?: string | null;
  enseignants?: IEnseignant[] | null;
  niveaus?: INiveauxEtudes[] | null;
  examen?: IExamen[] | null;
  lyceesTechniques?: ILyceesTechniques | null;
  directeur?: IDirecteurEtude | null;
}

export class Serie implements ISerie {
  constructor(
    public id?: number,
    public nomSerie?: Series,
    public autreSerie?: string | null,
    public enseignants?: IEnseignant[] | null,
    public niveaus?: INiveauxEtudes[] | null,
    public examen?: IExamen[] | null,
    public lyceesTechniques?: ILyceesTechniques | null,
    public directeur?: IDirecteurEtude | null
  ) {}
}

export function getSerieIdentifier(serie: ISerie): number | undefined {
  return serie.id;
}
