import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INiveauxCalification, getNiveauxCalificationIdentifier } from '../niveaux-calification.model';

export type EntityResponseType = HttpResponse<INiveauxCalification>;
export type EntityArrayResponseType = HttpResponse<INiveauxCalification[]>;

@Injectable({ providedIn: 'root' })
export class NiveauxCalificationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/niveaux-califications');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(niveauxCalification: INiveauxCalification): Observable<EntityResponseType> {
    return this.http.post<INiveauxCalification>(this.resourceUrl, niveauxCalification, { observe: 'response' });
  }

  update(niveauxCalification: INiveauxCalification): Observable<EntityResponseType> {
    return this.http.put<INiveauxCalification>(
      `${this.resourceUrl}/${getNiveauxCalificationIdentifier(niveauxCalification) as number}`,
      niveauxCalification,
      { observe: 'response' }
    );
  }

  partialUpdate(niveauxCalification: INiveauxCalification): Observable<EntityResponseType> {
    return this.http.patch<INiveauxCalification>(
      `${this.resourceUrl}/${getNiveauxCalificationIdentifier(niveauxCalification) as number}`,
      niveauxCalification,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INiveauxCalification>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INiveauxCalification[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addNiveauxCalificationToCollectionIfMissing(
    niveauxCalificationCollection: INiveauxCalification[],
    ...niveauxCalificationsToCheck: (INiveauxCalification | null | undefined)[]
  ): INiveauxCalification[] {
    const niveauxCalifications: INiveauxCalification[] = niveauxCalificationsToCheck.filter(isPresent);
    if (niveauxCalifications.length > 0) {
      const niveauxCalificationCollectionIdentifiers = niveauxCalificationCollection.map(
        niveauxCalificationItem => getNiveauxCalificationIdentifier(niveauxCalificationItem)!
      );
      const niveauxCalificationsToAdd = niveauxCalifications.filter(niveauxCalificationItem => {
        const niveauxCalificationIdentifier = getNiveauxCalificationIdentifier(niveauxCalificationItem);
        if (niveauxCalificationIdentifier == null || niveauxCalificationCollectionIdentifiers.includes(niveauxCalificationIdentifier)) {
          return false;
        }
        niveauxCalificationCollectionIdentifiers.push(niveauxCalificationIdentifier);
        return true;
      });
      return [...niveauxCalificationsToAdd, ...niveauxCalificationCollection];
    }
    return niveauxCalificationCollection;
  }
}
