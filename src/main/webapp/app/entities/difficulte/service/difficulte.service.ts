import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDifficulte, getDifficulteIdentifier } from '../difficulte.model';

export type EntityResponseType = HttpResponse<IDifficulte>;
export type EntityArrayResponseType = HttpResponse<IDifficulte[]>;

@Injectable({ providedIn: 'root' })
export class DifficulteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/difficultes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(difficulte: IDifficulte): Observable<EntityResponseType> {
    return this.http.post<IDifficulte>(this.resourceUrl, difficulte, { observe: 'response' });
  }

  update(difficulte: IDifficulte): Observable<EntityResponseType> {
    return this.http.put<IDifficulte>(`${this.resourceUrl}/${getDifficulteIdentifier(difficulte) as number}`, difficulte, {
      observe: 'response',
    });
  }

  partialUpdate(difficulte: IDifficulte): Observable<EntityResponseType> {
    return this.http.patch<IDifficulte>(`${this.resourceUrl}/${getDifficulteIdentifier(difficulte) as number}`, difficulte, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDifficulte>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDifficulte[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDifficulteToCollectionIfMissing(
    difficulteCollection: IDifficulte[],
    ...difficultesToCheck: (IDifficulte | null | undefined)[]
  ): IDifficulte[] {
    const difficultes: IDifficulte[] = difficultesToCheck.filter(isPresent);
    if (difficultes.length > 0) {
      const difficulteCollectionIdentifiers = difficulteCollection.map(difficulteItem => getDifficulteIdentifier(difficulteItem)!);
      const difficultesToAdd = difficultes.filter(difficulteItem => {
        const difficulteIdentifier = getDifficulteIdentifier(difficulteItem);
        if (difficulteIdentifier == null || difficulteCollectionIdentifiers.includes(difficulteIdentifier)) {
          return false;
        }
        difficulteCollectionIdentifiers.push(difficulteIdentifier);
        return true;
      });
      return [...difficultesToAdd, ...difficulteCollection];
    }
    return difficulteCollection;
  }
}
