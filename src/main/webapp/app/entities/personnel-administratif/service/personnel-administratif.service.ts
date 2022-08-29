import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPersonnelAdministratif, getPersonnelAdministratifIdentifier } from '../personnel-administratif.model';

export type EntityResponseType = HttpResponse<IPersonnelAdministratif>;
export type EntityArrayResponseType = HttpResponse<IPersonnelAdministratif[]>;

@Injectable({ providedIn: 'root' })
export class PersonnelAdministratifService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/personnel-administratifs');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(personnelAdministratif: IPersonnelAdministratif): Observable<EntityResponseType> {
    return this.http.post<IPersonnelAdministratif>(this.resourceUrl, personnelAdministratif, { observe: 'response' });
  }

  update(personnelAdministratif: IPersonnelAdministratif): Observable<EntityResponseType> {
    return this.http.put<IPersonnelAdministratif>(
      `${this.resourceUrl}/${getPersonnelAdministratifIdentifier(personnelAdministratif) as number}`,
      personnelAdministratif,
      { observe: 'response' }
    );
  }

  partialUpdate(personnelAdministratif: IPersonnelAdministratif): Observable<EntityResponseType> {
    return this.http.patch<IPersonnelAdministratif>(
      `${this.resourceUrl}/${getPersonnelAdministratifIdentifier(personnelAdministratif) as number}`,
      personnelAdministratif,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPersonnelAdministratif>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPersonnelAdministratif[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPersonnelAdministratifToCollectionIfMissing(
    personnelAdministratifCollection: IPersonnelAdministratif[],
    ...personnelAdministratifsToCheck: (IPersonnelAdministratif | null | undefined)[]
  ): IPersonnelAdministratif[] {
    const personnelAdministratifs: IPersonnelAdministratif[] = personnelAdministratifsToCheck.filter(isPresent);
    if (personnelAdministratifs.length > 0) {
      const personnelAdministratifCollectionIdentifiers = personnelAdministratifCollection.map(
        personnelAdministratifItem => getPersonnelAdministratifIdentifier(personnelAdministratifItem)!
      );
      const personnelAdministratifsToAdd = personnelAdministratifs.filter(personnelAdministratifItem => {
        const personnelAdministratifIdentifier = getPersonnelAdministratifIdentifier(personnelAdministratifItem);
        if (
          personnelAdministratifIdentifier == null ||
          personnelAdministratifCollectionIdentifiers.includes(personnelAdministratifIdentifier)
        ) {
          return false;
        }
        personnelAdministratifCollectionIdentifiers.push(personnelAdministratifIdentifier);
        return true;
      });
      return [...personnelAdministratifsToAdd, ...personnelAdministratifCollection];
    }
    return personnelAdministratifCollection;
  }
}
