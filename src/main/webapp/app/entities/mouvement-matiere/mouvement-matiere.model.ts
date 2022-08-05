import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { Mouvement } from 'app/entities/enumerations/mouvement.model';
import { Group } from 'app/entities/enumerations/group.model';
import { Organisation } from 'app/entities/enumerations/organisation.model';
import { Ressouces } from 'app/entities/enumerations/ressouces.model';
import { Groupe } from 'app/entities/enumerations/groupe.model';

export interface IMouvementMatiere {
  id?: number;
  typeMouvement?: Mouvement | null;
  group?: Group | null;
  organisation?: Organisation | null;
  autreOrganisation?: string | null;
  ressource?: Ressouces | null;
  autreRessource?: string | null;
  designationContentType?: string | null;
  designation?: string | null;
  pvReceptionContentType?: string | null;
  pvReception?: string | null;
  bordeauDeLivraisonContentType?: string | null;
  bordeauDeLivraison?: string | null;
  groupe?: Groupe | null;
  bonDeSortieContentType?: string | null;
  bonDeSortie?: string | null;
  certificatAdministratifContentType?: string | null;
  certificatAdministratif?: string | null;
  lyceesTechniques?: ILyceesTechniques | null;
  comptableMatiere?: IComptableMatiere | null;
}

export class MouvementMatiere implements IMouvementMatiere {
  constructor(
    public id?: number,
    public typeMouvement?: Mouvement | null,
    public group?: Group | null,
    public organisation?: Organisation | null,
    public autreOrganisation?: string | null,
    public ressource?: Ressouces | null,
    public autreRessource?: string | null,
    public designationContentType?: string | null,
    public designation?: string | null,
    public pvReceptionContentType?: string | null,
    public pvReception?: string | null,
    public bordeauDeLivraisonContentType?: string | null,
    public bordeauDeLivraison?: string | null,
    public groupe?: Groupe | null,
    public bonDeSortieContentType?: string | null,
    public bonDeSortie?: string | null,
    public certificatAdministratifContentType?: string | null,
    public certificatAdministratif?: string | null,
    public lyceesTechniques?: ILyceesTechniques | null,
    public comptableMatiere?: IComptableMatiere | null
  ) {}
}

export function getMouvementMatiereIdentifier(mouvementMatiere: IMouvementMatiere): number | undefined {
  return mouvementMatiere.id;
}
