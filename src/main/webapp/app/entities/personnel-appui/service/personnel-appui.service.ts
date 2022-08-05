import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPersonnelAppui, getPersonnelAppuiIdentifier } from '../personnel-appui.model';

export type EntityResponseType = HttpResponse<IPersonnelAppui>;
export type EntityArrayResponseType = HttpResponse<IPersonnelAppui[]>;

@Injectable({ providedIn: 'root' })
export class PersonnelAppuiService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/personnel-appuis');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(personnelAppui: IPersonnelAppui): Observable<EntityResponseType> {
    return this.http.post<IPersonnelAppui>(this.resourceUrl, personnelAppui, { observe: 'response' });
  }

  update(personnelAppui: IPersonnelAppui): Observable<EntityResponseType> {
    return this.http.put<IPersonnelAppui>(`${this.resourceUrl}/${getPersonnelAppuiIdentifier(personnelAppui) as number}`, personnelAppui, {
      observe: 'response',
    });
  }

  partialUpdate(personnelAppui: IPersonnelAppui): Observable<EntityResponseType> {
    return this.http.patch<IPersonnelAppui>(
      `${this.resourceUrl}/${getPersonnelAppuiIdentifier(personnelAppui) as number}`,
      personnelAppui,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPersonnelAppui>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPersonnelAppui[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPersonnelAppuiToCollectionIfMissing(
    personnelAppuiCollection: IPersonnelAppui[],
    ...personnelAppuisToCheck: (IPersonnelAppui | null | undefined)[]
  ): IPersonnelAppui[] {
    const personnelAppuis: IPersonnelAppui[] = personnelAppuisToCheck.filter(isPresent);
    if (personnelAppuis.length > 0) {
      const personnelAppuiCollectionIdentifiers = personnelAppuiCollection.map(
        personnelAppuiItem => getPersonnelAppuiIdentifier(personnelAppuiItem)!
      );
      const personnelAppuisToAdd = personnelAppuis.filter(personnelAppuiItem => {
        const personnelAppuiIdentifier = getPersonnelAppuiIdentifier(personnelAppuiItem);
        if (personnelAppuiIdentifier == null || personnelAppuiCollectionIdentifiers.includes(personnelAppuiIdentifier)) {
          return false;
        }
        personnelAppuiCollectionIdentifiers.push(personnelAppuiIdentifier);
        return true;
      });
      return [...personnelAppuisToAdd, ...personnelAppuiCollection];
    }
    return personnelAppuiCollection;
  }
}
