import { IUser } from 'app/entities/user/user.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IPersonnelAdministratif } from 'app/entities/personnel-administratif/personnel-administratif.model';
import { IPartenaire } from 'app/entities/partenaire/partenaire.model';
import { IBesoin } from 'app/entities/besoin/besoin.model';
import { IOrganeGestion } from 'app/entities/organe-gestion/organe-gestion.model';
import { IVisite } from 'app/entities/visite/visite.model';
import { IDifficulte } from 'app/entities/difficulte/difficulte.model';
import { IEnseignant } from 'app/entities/enseignant/enseignant.model';
import { IPersonnelAppui } from 'app/entities/personnel-appui/personnel-appui.model';

export interface IProviseur {
  id?: number;
  nomPrenom?: string;
  user?: IUser | null;
  nomLycee?: ILyceesTechniques | null;
  personnelAdmiistratifs?: IPersonnelAdministratif[] | null;
  partenaires?: IPartenaire[] | null;
  besoins?: IBesoin[] | null;
  organes?: IOrganeGestion[] | null;
  visites?: IVisite[] | null;
  difficultes?: IDifficulte[] | null;
  enseignants?: IEnseignant[] | null;
  personnelAppuis?: IPersonnelAppui[] | null;
}

export class Proviseur implements IProviseur {
  constructor(
    public id?: number,
    public nomPrenom?: string,
    public user?: IUser | null,
    public nomLycee?: ILyceesTechniques | null,
    public personnelAdmiistratifs?: IPersonnelAdministratif[] | null,
    public partenaires?: IPartenaire[] | null,
    public besoins?: IBesoin[] | null,
    public organes?: IOrganeGestion[] | null,
    public visites?: IVisite[] | null,
    public difficultes?: IDifficulte[] | null,
    public enseignants?: IEnseignant[] | null,
    public personnelAppuis?: IPersonnelAppui[] | null
  ) {}
}

export function getProviseurIdentifier(proviseur: IProviseur): number | undefined {
  return proviseur.id;
}
