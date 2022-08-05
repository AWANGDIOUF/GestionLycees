import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILyceesTechniques, getLyceesTechniquesIdentifier } from '../lycees-techniques.model';

export type EntityResponseType = HttpResponse<ILyceesTechniques>;
export type EntityArrayResponseType = HttpResponse<ILyceesTechniques[]>;

@Injectable({ providedIn: 'root' })
export class LyceesTechniquesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/lycees-techniques');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(lyceesTechniques: ILyceesTechniques): Observable<EntityResponseType> {
    return this.http.post<ILyceesTechniques>(this.resourceUrl, lyceesTechniques, { observe: 'response' });
  }

  update(lyceesTechniques: ILyceesTechniques): Observable<EntityResponseType> {
    return this.http.put<ILyceesTechniques>(
      `${this.resourceUrl}/${getLyceesTechniquesIdentifier(lyceesTechniques) as number}`,
      lyceesTechniques,
      { observe: 'response' }
    );
  }

  partialUpdate(lyceesTechniques: ILyceesTechniques): Observable<EntityResponseType> {
    return this.http.patch<ILyceesTechniques>(
      `${this.resourceUrl}/${getLyceesTechniquesIdentifier(lyceesTechniques) as number}`,
      lyceesTechniques,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILyceesTechniques>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILyceesTechniques[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLyceesTechniquesToCollectionIfMissing(
    lyceesTechniquesCollection: ILyceesTechniques[],
    ...lyceesTechniquesToCheck: (ILyceesTechniques | null | undefined)[]
  ): ILyceesTechniques[] {
    const lyceesTechniques: ILyceesTechniques[] = lyceesTechniquesToCheck.filter(isPresent);
    if (lyceesTechniques.length > 0) {
      const lyceesTechniquesCollectionIdentifiers = lyceesTechniquesCollection.map(
        lyceesTechniquesItem => getLyceesTechniquesIdentifier(lyceesTechniquesItem)!
      );
      const lyceesTechniquesToAdd = lyceesTechniques.filter(lyceesTechniquesItem => {
        const lyceesTechniquesIdentifier = getLyceesTechniquesIdentifier(lyceesTechniquesItem);
        if (lyceesTechniquesIdentifier == null || lyceesTechniquesCollectionIdentifiers.includes(lyceesTechniquesIdentifier)) {
          return false;
        }
        lyceesTechniquesCollectionIdentifiers.push(lyceesTechniquesIdentifier);
        return true;
      });
      return [...lyceesTechniquesToAdd, ...lyceesTechniquesCollection];
    }
    return lyceesTechniquesCollection;
  }
}
