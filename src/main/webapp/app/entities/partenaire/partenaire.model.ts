import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { Provenance } from 'app/entities/enumerations/provenance.model';
import { NaturePart } from 'app/entities/enumerations/nature-part.model';

export interface IPartenaire {
  id?: number;
  denominationPartenaire?: string;
  categorieProvenaire?: Provenance;
  autreCategorie?: string | null;
  nature?: NaturePart;
  autreNature?: string | null;
  lyceesTechniques?: ILyceesTechniques | null;
  proviseur?: IProviseur | null;
}

export class Partenaire implements IPartenaire {
  constructor(
    public id?: number,
    public denominationPartenaire?: string,
    public categorieProvenaire?: Provenance,
    public autreCategorie?: string | null,
    public nature?: NaturePart,
    public autreNature?: string | null,
    public lyceesTechniques?: ILyceesTechniques | null,
    public proviseur?: IProviseur | null
  ) {}
}

export function getPartenaireIdentifier(partenaire: IPartenaire): number | undefined {
  return partenaire.id;
}
