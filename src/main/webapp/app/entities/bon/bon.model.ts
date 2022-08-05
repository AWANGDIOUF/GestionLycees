import * as dayjs from 'dayjs';
import { IMateriel } from 'app/entities/materiel/materiel.model';
import { TypeBon } from 'app/entities/enumerations/type-bon.model';

export interface IBon {
  id?: number;
  typeBon?: TypeBon | null;
  beneficiaire?: string | null;
  fonction?: string | null;
  fournisseur?: string | null;
  numeroFacture?: string | null;
  date?: dayjs.Dayjs | null;
  materiel?: IMateriel | null;
}

export class Bon implements IBon {
  constructor(
    public id?: number,
    public typeBon?: TypeBon | null,
    public beneficiaire?: string | null,
    public fonction?: string | null,
    public fournisseur?: string | null,
    public numeroFacture?: string | null,
    public date?: dayjs.Dayjs | null,
    public materiel?: IMateriel | null
  ) {}
}

export function getBonIdentifier(bon: IBon): number | undefined {
  return bon.id;
}
