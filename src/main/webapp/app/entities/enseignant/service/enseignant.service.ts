import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEnseignant, getEnseignantIdentifier } from '../enseignant.model';

export type EntityResponseType = HttpResponse<IEnseignant>;
export type EntityArrayResponseType = HttpResponse<IEnseignant[]>;

@Injectable({ providedIn: 'root' })
export class EnseignantService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/enseignants');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(enseignant: IEnseignant): Observable<EntityResponseType> {
    return this.http.post<IEnseignant>(this.resourceUrl, enseignant, { observe: 'response' });
  }

  update(enseignant: IEnseignant): Observable<EntityResponseType> {
    return this.http.put<IEnseignant>(`${this.resourceUrl}/${getEnseignantIdentifier(enseignant) as number}`, enseignant, {
      observe: 'response',
    });
  }

  partialUpdate(enseignant: IEnseignant): Observable<EntityResponseType> {
    return this.http.patch<IEnseignant>(`${this.resourceUrl}/${getEnseignantIdentifier(enseignant) as number}`, enseignant, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEnseignant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEnseignant[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEnseignantToCollectionIfMissing(
    enseignantCollection: IEnseignant[],
    ...enseignantsToCheck: (IEnseignant | null | undefined)[]
  ): IEnseignant[] {
    const enseignants: IEnseignant[] = enseignantsToCheck.filter(isPresent);
    if (enseignants.length > 0) {
      const enseignantCollectionIdentifiers = enseignantCollection.map(enseignantItem => getEnseignantIdentifier(enseignantItem)!);
      const enseignantsToAdd = enseignants.filter(enseignantItem => {
        const enseignantIdentifier = getEnseignantIdentifier(enseignantItem);
        if (enseignantIdentifier == null || enseignantCollectionIdentifiers.includes(enseignantIdentifier)) {
          return false;
        }
        enseignantCollectionIdentifiers.push(enseignantIdentifier);
        return true;
      });
      return [...enseignantsToAdd, ...enseignantCollection];
    }
    return enseignantCollection;
  }
}
