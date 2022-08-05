import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPartenaire, getPartenaireIdentifier } from '../partenaire.model';

export type EntityResponseType = HttpResponse<IPartenaire>;
export type EntityArrayResponseType = HttpResponse<IPartenaire[]>;

@Injectable({ providedIn: 'root' })
export class PartenaireService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/partenaires');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(partenaire: IPartenaire): Observable<EntityResponseType> {
    return this.http.post<IPartenaire>(this.resourceUrl, partenaire, { observe: 'response' });
  }

  update(partenaire: IPartenaire): Observable<EntityResponseType> {
    return this.http.put<IPartenaire>(`${this.resourceUrl}/${getPartenaireIdentifier(partenaire) as number}`, partenaire, {
      observe: 'response',
    });
  }

  partialUpdate(partenaire: IPartenaire): Observable<EntityResponseType> {
    return this.http.patch<IPartenaire>(`${this.resourceUrl}/${getPartenaireIdentifier(partenaire) as number}`, partenaire, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPartenaire>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPartenaire[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPartenaireToCollectionIfMissing(
    partenaireCollection: IPartenaire[],
    ...partenairesToCheck: (IPartenaire | null | undefined)[]
  ): IPartenaire[] {
    const partenaires: IPartenaire[] = partenairesToCheck.filter(isPresent);
    if (partenaires.length > 0) {
      const partenaireCollectionIdentifiers = partenaireCollection.map(partenaireItem => getPartenaireIdentifier(partenaireItem)!);
      const partenairesToAdd = partenaires.filter(partenaireItem => {
        const partenaireIdentifier = getPartenaireIdentifier(partenaireItem);
        if (partenaireIdentifier == null || partenaireCollectionIdentifiers.includes(partenaireIdentifier)) {
          return false;
        }
        partenaireCollectionIdentifiers.push(partenaireIdentifier);
        return true;
      });
      return [...partenairesToAdd, ...partenaireCollection];
    }
    return partenaireCollection;
  }
}
