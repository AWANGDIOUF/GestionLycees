import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { Group } from 'app/entities/enumerations/group.model';

export interface IReformeMatiere {
  id?: number;
  group?: Group | null;
  designationDesmembreContentType?: string | null;
  designationDesmembre?: string | null;
  pvReformeContentType?: string | null;
  pvReforme?: string | null;
  sortieDefinitiveContentType?: string | null;
  sortieDefinitive?: string | null;
  certificatAdministratifContentType?: string | null;
  certificatAdministratif?: string | null;
  lyceesTechniques?: ILyceesTechniques | null;
  comptableMatiere?: IComptableMatiere | null;
}

export class ReformeMatiere implements IReformeMatiere {
  constructor(
    public id?: number,
    public group?: Group | null,
    public designationDesmembreContentType?: string | null,
    public designationDesmembre?: string | null,
    public pvReformeContentType?: string | null,
    public pvReforme?: string | null,
    public sortieDefinitiveContentType?: string | null,
    public sortieDefinitive?: string | null,
    public certificatAdministratifContentType?: string | null,
    public certificatAdministratif?: string | null,
    public lyceesTechniques?: ILyceesTechniques | null,
    public comptableMatiere?: IComptableMatiere | null
  ) {}
}

export function getReformeMatiereIdentifier(reformeMatiere: IReformeMatiere): number | undefined {
  return reformeMatiere.id;
}
