import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISalle, getSalleIdentifier } from '../salle.model';

export type EntityResponseType = HttpResponse<ISalle>;
export type EntityArrayResponseType = HttpResponse<ISalle[]>;

@Injectable({ providedIn: 'root' })
export class SalleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/salles');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(salle: ISalle): Observable<EntityResponseType> {
    return this.http.post<ISalle>(this.resourceUrl, salle, { observe: 'response' });
  }

  update(salle: ISalle): Observable<EntityResponseType> {
    return this.http.put<ISalle>(`${this.resourceUrl}/${getSalleIdentifier(salle) as number}`, salle, { observe: 'response' });
  }

  partialUpdate(salle: ISalle): Observable<EntityResponseType> {
    return this.http.patch<ISalle>(`${this.resourceUrl}/${getSalleIdentifier(salle) as number}`, salle, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISalle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISalle[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSalleToCollectionIfMissing(salleCollection: ISalle[], ...sallesToCheck: (ISalle | null | undefined)[]): ISalle[] {
    const salles: ISalle[] = sallesToCheck.filter(isPresent);
    if (salles.length > 0) {
      const salleCollectionIdentifiers = salleCollection.map(salleItem => getSalleIdentifier(salleItem)!);
      const sallesToAdd = salles.filter(salleItem => {
        const salleIdentifier = getSalleIdentifier(salleItem);
        if (salleIdentifier == null || salleCollectionIdentifiers.includes(salleIdentifier)) {
          return false;
        }
        salleCollectionIdentifiers.push(salleIdentifier);
        return true;
      });
      return [...sallesToAdd, ...salleCollection];
    }
    return salleCollection;
  }
}
