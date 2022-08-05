import * as dayjs from 'dayjs';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
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

export interface ILyceeTechnique {
  id?: number;
  prenomNom?: string;
  adresse?: string;
  mail?: string;
  tel1?: string;
  tel2?: string;
  boitePostal?: string;
  decretCreation?: string;
  dateCreation?: dayjs.Dayjs;
  region?: Region;
  autreRegion?: string | null;
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
  departementZiguinchor?: ZIGINCHOR | null;
  autredepartementDakar?: string | null;
  autredepartementDiourbel?: string | null;
  autredepartementFatick?: string | null;
  autredepartementKaffrine?: string | null;
  autredepartementKaolack?: string | null;
  autredepartementKedougou?: string | null;
  autredepartementKolda?: string | null;
  autredepartementLouga?: string | null;
  autredepartementMatam?: string | null;
  autredepartementSaint?: string | null;
  autredepartementSedhiou?: string | null;
  autredepartementTambacounda?: string | null;
  autredepartementThis?: string | null;
  autredepartementZiguinchor?: string | null;
  commune?: string;
  ia?: string;
  proviseur?: IProviseur | null;
  nomLycee?: ILyceesTechniques | null;
}

export class LyceeTechnique implements ILyceeTechnique {
  constructor(
    public id?: number,
    public prenomNom?: string,
    public adresse?: string,
    public mail?: string,
    public tel1?: string,
    public tel2?: string,
    public boitePostal?: string,
    public decretCreation?: string,
    public dateCreation?: dayjs.Dayjs,
    public region?: Region,
    public autreRegion?: string | null,
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
    public departementZiguinchor?: ZIGINCHOR | null,
    public autredepartementDakar?: string | null,
    public autredepartementDiourbel?: string | null,
    public autredepartementFatick?: string | null,
    public autredepartementKaffrine?: string | null,
    public autredepartementKaolack?: string | null,
    public autredepartementKedougou?: string | null,
    public autredepartementKolda?: string | null,
    public autredepartementLouga?: string | null,
    public autredepartementMatam?: string | null,
    public autredepartementSaint?: string | null,
    public autredepartementSedhiou?: string | null,
    public autredepartementTambacounda?: string | null,
    public autredepartementThis?: string | null,
    public autredepartementZiguinchor?: string | null,
    public commune?: string,
    public ia?: string,
    public proviseur?: IProviseur | null,
    public nomLycee?: ILyceesTechniques | null
  ) {}
}

export function getLyceeTechniqueIdentifier(lyceeTechnique: ILyceeTechnique): number | undefined {
  return lyceeTechnique.id;
}
