import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IComptableFinancier, getComptableFinancierIdentifier } from '../comptable-financier.model';

export type EntityResponseType = HttpResponse<IComptableFinancier>;
export type EntityArrayResponseType = HttpResponse<IComptableFinancier[]>;

@Injectable({ providedIn: 'root' })
export class ComptableFinancierService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/comptable-financiers');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(comptableFinancier: IComptableFinancier): Observable<EntityResponseType> {
    return this.http.post<IComptableFinancier>(this.resourceUrl, comptableFinancier, { observe: 'response' });
  }

  update(comptableFinancier: IComptableFinancier): Observable<EntityResponseType> {
    return this.http.put<IComptableFinancier>(
      `${this.resourceUrl}/${getComptableFinancierIdentifier(comptableFinancier) as number}`,
      comptableFinancier,
      { observe: 'response' }
    );
  }

  partialUpdate(comptableFinancier: IComptableFinancier): Observable<EntityResponseType> {
    return this.http.patch<IComptableFinancier>(
      `${this.resourceUrl}/${getComptableFinancierIdentifier(comptableFinancier) as number}`,
      comptableFinancier,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IComptableFinancier>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IComptableFinancier[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addComptableFinancierToCollectionIfMissing(
    comptableFinancierCollection: IComptableFinancier[],
    ...comptableFinanciersToCheck: (IComptableFinancier | null | undefined)[]
  ): IComptableFinancier[] {
    const comptableFinanciers: IComptableFinancier[] = comptableFinanciersToCheck.filter(isPresent);
    if (comptableFinanciers.length > 0) {
      const comptableFinancierCollectionIdentifiers = comptableFinancierCollection.map(
        comptableFinancierItem => getComptableFinancierIdentifier(comptableFinancierItem)!
      );
      const comptableFinanciersToAdd = comptableFinanciers.filter(comptableFinancierItem => {
        const comptableFinancierIdentifier = getComptableFinancierIdentifier(comptableFinancierItem);
        if (comptableFinancierIdentifier == null || comptableFinancierCollectionIdentifiers.includes(comptableFinancierIdentifier)) {
          return false;
        }
        comptableFinancierCollectionIdentifiers.push(comptableFinancierIdentifier);
        return true;
      });
      return [...comptableFinanciersToAdd, ...comptableFinancierCollection];
    }
    return comptableFinancierCollection;
  }
}
