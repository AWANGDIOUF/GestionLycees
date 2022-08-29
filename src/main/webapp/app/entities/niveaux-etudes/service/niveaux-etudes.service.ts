import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INiveauxEtudes, getNiveauxEtudesIdentifier } from '../niveaux-etudes.model';

export type EntityResponseType = HttpResponse<INiveauxEtudes>;
export type EntityArrayResponseType = HttpResponse<INiveauxEtudes[]>;

@Injectable({ providedIn: 'root' })
export class NiveauxEtudesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/niveaux-etudes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(niveauxEtudes: INiveauxEtudes): Observable<EntityResponseType> {
    return this.http.post<INiveauxEtudes>(this.resourceUrl, niveauxEtudes, { observe: 'response' });
  }

  update(niveauxEtudes: INiveauxEtudes): Observable<EntityResponseType> {
    return this.http.put<INiveauxEtudes>(`${this.resourceUrl}/${getNiveauxEtudesIdentifier(niveauxEtudes) as number}`, niveauxEtudes, {
      observe: 'response',
    });
  }

  partialUpdate(niveauxEtudes: INiveauxEtudes): Observable<EntityResponseType> {
    return this.http.patch<INiveauxEtudes>(`${this.resourceUrl}/${getNiveauxEtudesIdentifier(niveauxEtudes) as number}`, niveauxEtudes, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INiveauxEtudes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INiveauxEtudes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addNiveauxEtudesToCollectionIfMissing(
    niveauxEtudesCollection: INiveauxEtudes[],
    ...niveauxEtudesToCheck: (INiveauxEtudes | null | undefined)[]
  ): INiveauxEtudes[] {
    const niveauxEtudes: INiveauxEtudes[] = niveauxEtudesToCheck.filter(isPresent);
    if (niveauxEtudes.length > 0) {
      const niveauxEtudesCollectionIdentifiers = niveauxEtudesCollection.map(
        niveauxEtudesItem => getNiveauxEtudesIdentifier(niveauxEtudesItem)!
      );
      const niveauxEtudesToAdd = niveauxEtudes.filter(niveauxEtudesItem => {
        const niveauxEtudesIdentifier = getNiveauxEtudesIdentifier(niveauxEtudesItem);
        if (niveauxEtudesIdentifier == null || niveauxEtudesCollectionIdentifiers.includes(niveauxEtudesIdentifier)) {
          return false;
        }
        niveauxEtudesCollectionIdentifiers.push(niveauxEtudesIdentifier);
        return true;
      });
      return [...niveauxEtudesToAdd, ...niveauxEtudesCollection];
    }
    return niveauxEtudesCollection;
  }
}
