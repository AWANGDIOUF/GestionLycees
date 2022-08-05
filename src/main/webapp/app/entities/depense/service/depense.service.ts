import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDepense, getDepenseIdentifier } from '../depense.model';

export type EntityResponseType = HttpResponse<IDepense>;
export type EntityArrayResponseType = HttpResponse<IDepense[]>;

@Injectable({ providedIn: 'root' })
export class DepenseService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/depenses');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(depense: IDepense): Observable<EntityResponseType> {
    return this.http.post<IDepense>(this.resourceUrl, depense, { observe: 'response' });
  }

  update(depense: IDepense): Observable<EntityResponseType> {
    return this.http.put<IDepense>(`${this.resourceUrl}/${getDepenseIdentifier(depense) as number}`, depense, { observe: 'response' });
  }

  partialUpdate(depense: IDepense): Observable<EntityResponseType> {
    return this.http.patch<IDepense>(`${this.resourceUrl}/${getDepenseIdentifier(depense) as number}`, depense, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDepense>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepense[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDepenseToCollectionIfMissing(depenseCollection: IDepense[], ...depensesToCheck: (IDepense | null | undefined)[]): IDepense[] {
    const depenses: IDepense[] = depensesToCheck.filter(isPresent);
    if (depenses.length > 0) {
      const depenseCollectionIdentifiers = depenseCollection.map(depenseItem => getDepenseIdentifier(depenseItem)!);
      const depensesToAdd = depenses.filter(depenseItem => {
        const depenseIdentifier = getDepenseIdentifier(depenseItem);
        if (depenseIdentifier == null || depenseCollectionIdentifiers.includes(depenseIdentifier)) {
          return false;
        }
        depenseCollectionIdentifiers.push(depenseIdentifier);
        return true;
      });
      return [...depensesToAdd, ...depenseCollection];
    }
    return depenseCollection;
  }
}
