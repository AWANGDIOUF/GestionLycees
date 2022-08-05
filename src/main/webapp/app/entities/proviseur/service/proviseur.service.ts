import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProviseur, getProviseurIdentifier } from '../proviseur.model';

export type EntityResponseType = HttpResponse<IProviseur>;
export type EntityArrayResponseType = HttpResponse<IProviseur[]>;

@Injectable({ providedIn: 'root' })
export class ProviseurService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/proviseurs');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(proviseur: IProviseur): Observable<EntityResponseType> {
    return this.http.post<IProviseur>(this.resourceUrl, proviseur, { observe: 'response' });
  }

  update(proviseur: IProviseur): Observable<EntityResponseType> {
    return this.http.put<IProviseur>(`${this.resourceUrl}/${getProviseurIdentifier(proviseur) as number}`, proviseur, {
      observe: 'response',
    });
  }

  partialUpdate(proviseur: IProviseur): Observable<EntityResponseType> {
    return this.http.patch<IProviseur>(`${this.resourceUrl}/${getProviseurIdentifier(proviseur) as number}`, proviseur, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProviseur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProviseur[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProviseurToCollectionIfMissing(
    proviseurCollection: IProviseur[],
    ...proviseursToCheck: (IProviseur | null | undefined)[]
  ): IProviseur[] {
    const proviseurs: IProviseur[] = proviseursToCheck.filter(isPresent);
    if (proviseurs.length > 0) {
      const proviseurCollectionIdentifiers = proviseurCollection.map(proviseurItem => getProviseurIdentifier(proviseurItem)!);
      const proviseursToAdd = proviseurs.filter(proviseurItem => {
        const proviseurIdentifier = getProviseurIdentifier(proviseurItem);
        if (proviseurIdentifier == null || proviseurCollectionIdentifiers.includes(proviseurIdentifier)) {
          return false;
        }
        proviseurCollectionIdentifiers.push(proviseurIdentifier);
        return true;
      });
      return [...proviseursToAdd, ...proviseurCollection];
    }
    return proviseurCollection;
  }
}
