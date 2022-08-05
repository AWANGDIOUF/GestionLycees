import { IApprenant } from 'app/entities/apprenant/apprenant.model';
import { ILyceeTechnique } from 'app/entities/lycee-technique/lycee-technique.model';
import { StatusApp } from 'app/entities/enumerations/status-app.model';

export interface IStatus {
  id?: number;
  status?: StatusApp | null;
  apprenant?: IApprenant | null;
  lyceeTechnique?: ILyceeTechnique | null;
}

export class Status implements IStatus {
  constructor(
    public id?: number,
    public status?: StatusApp | null,
    public apprenant?: IApprenant | null,
    public lyceeTechnique?: ILyceeTechnique | null
  ) {}
}

export function getStatusIdentifier(status: IStatus): number | undefined {
  return status.id;
}
