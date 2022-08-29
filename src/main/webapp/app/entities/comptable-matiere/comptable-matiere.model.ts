import { IUser } from 'app/entities/user/user.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IIventaireDesMatetiere } from 'app/entities/iventaire-des-matetiere/iventaire-des-matetiere.model';
import { IMouvementMatiere } from 'app/entities/mouvement-matiere/mouvement-matiere.model';
import { IReformeMatiere } from 'app/entities/reforme-matiere/reforme-matiere.model';

export interface IComptableMatiere {
  id?: number;
  nomPrenom?: string;
  user?: IUser | null;
  nomLycee?: ILyceesTechniques | null;
  iventaireDesMatetieres?: IIventaireDesMatetiere[] | null;
  mouvementMatieres?: IMouvementMatiere[] | null;
  reformeMatieres?: IReformeMatiere[] | null;
}

export class ComptableMatiere implements IComptableMatiere {
  constructor(
    public id?: number,
    public nomPrenom?: string,
    public user?: IUser | null,
    public nomLycee?: ILyceesTechniques | null,
    public iventaireDesMatetieres?: IIventaireDesMatetiere[] | null,
    public mouvementMatieres?: IMouvementMatiere[] | null,
    public reformeMatieres?: IReformeMatiere[] | null
  ) {}
}

export function getComptableMatiereIdentifier(comptableMatiere: IComptableMatiere): number | undefined {
  return comptableMatiere.id;
}
