import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { Region } from 'app/entities/enumerations/region.model';
import { DAKAR } from 'app/entities/enumerations/dakar.model';
import { DIOURBEL } from 'app/entities/enumerations/diourbel.model';
import { FATICK } from 'app/entities/enumerations/fatick.model';
import { KAFFRINE } from 'app/entities/enumerations/kaffrine.model';
import { KAOLACK } from 'app/entities/enumerations/kaolack.model';
import { KEDOUGOU } from 'app/entities/enumerations/kedougou.model';
import { KOLDA } from 'app/entities/enumerations/kolda.model';
import { LOUGA } from 'app/entities/enumerations/louga.model';
import { MATAM } from 'app/entities/enumerations/matam.model';
import { SAINTLOUIS } from 'app/entities/enumerations/saintlouis.model';
import { SEDHIOU } from 'app/entities/enumerations/sedhiou.model';
import { TAMBACOUNDA } from 'app/entities/enumerations/tambacounda.model';
import { THIES } from 'app/entities/enumerations/thies.model';
import { ZIGINCHOR } from 'app/entities/enumerations/ziginchor.model';

export interface ILocalisation {
  id?: number;
  region?: Region | null;
  departementDakar?: DAKAR | null;
  departementDiourbel?: DIOURBEL | null;
  departementFatick?: FATICK | null;
  departementKaffrine?: KAFFRINE | null;
  departementKaolack?: KAOLACK | null;
  departementKedougou?: KEDOUGOU | null;
  departementKolda?: KOLDA | null;
  departementLouga?: LOUGA | null;
  departementMatam?: MATAM | null;
  departementSaint?: SAINTLOUIS | null;
  departementSedhiou?: SEDHIOU | null;
  departementTambacounda?: TAMBACOUNDA | null;
  departementThis?: THIES | null;
  departementZic?: ZIGINCHOR | null;
  ia?: string | null;
  lyceesTechniques?: ILyceesTechniques | null;
  proviseur?: IProviseur | null;
}

export class Localisation implements ILocalisation {
  constructor(
    public id?: number,
    public region?: Region | null,
    public departementDakar?: DAKAR | null,
    public departementDiourbel?: DIOURBEL | null,
    public departementFatick?: FATICK | null,
    public departementKaffrine?: KAFFRINE | null,
    public departementKaolack?: KAOLACK | null,
    public departementKedougou?: KEDOUGOU | null,
    public departementKolda?: KOLDA | null,
    public departementLouga?: LOUGA | null,
    public departementMatam?: MATAM | null,
    public departementSaint?: SAINTLOUIS | null,
    public departementSedhiou?: SEDHIOU | null,
    public departementTambacounda?: TAMBACOUNDA | null,
    public departementThis?: THIES | null,
    public departementZic?: ZIGINCHOR | null,
    public ia?: string | null,
    public lyceesTechniques?: ILyceesTechniques | null,
    public proviseur?: IProviseur | null
  ) {}
}

export function getLocalisationIdentifier(localisation: ILocalisation): number | undefined {
  return localisation.id;
}
