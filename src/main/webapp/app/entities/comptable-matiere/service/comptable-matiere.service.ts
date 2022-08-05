import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IComptableMatiere, getComptableMatiereIdentifier } from '../comptable-matiere.model';

export type EntityResponseType = HttpResponse<IComptableMatiere>;
export type EntityArrayResponseType = HttpResponse<IComptableMatiere[]>;

@Injectable({ providedIn: 'root' })
export class ComptableMatiereService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/comptable-matieres');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(comptableMatiere: IComptableMatiere): Observable<EntityResponseType> {
    return this.http.post<IComptableMatiere>(this.resourceUrl, comptableMatiere, { observe: 'response' });
  }

  update(comptableMatiere: IComptableMatiere): Observable<EntityResponseType> {
    return this.http.put<IComptableMatiere>(
      `${this.resourceUrl}/${getComptableMatiereIdentifier(comptableMatiere) as number}`,
      comptableMatiere,
      { observe: 'response' }
    );
  }

  partialUpdate(comptableMatiere: IComptableMatiere): Observable<EntityResponseType> {
    return this.http.patch<IComptableMatiere>(
      `${this.resourceUrl}/${getComptableMatiereIdentifier(comptableMatiere) as number}`,
      comptableMatiere,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IComptableMatiere>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IComptableMatiere[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addComptableMatiereToCollectionIfMissing(
    comptableMatiereCollection: IComptableMatiere[],
    ...comptableMatieresToCheck: (IComptableMatiere | null | undefined)[]
  ): IComptableMatiere[] {
    const comptableMatieres: IComptableMatiere[] = comptableMatieresToCheck.filter(isPresent);
    if (comptableMatieres.length > 0) {
      const comptableMatiereCollectionIdentifiers = comptableMatiereCollection.map(
        comptableMatiereItem => getComptableMatiereIdentifier(comptableMatiereItem)!
      );
      const comptableMatieresToAdd = comptableMatieres.filter(comptableMatiereItem => {
        const comptableMatiereIdentifier = getComptableMatiereIdentifier(comptableMatiereItem);
        if (comptableMatiereIdentifier == null || comptableMatiereCollectionIdentifiers.includes(comptableMatiereIdentifier)) {
          return false;
        }
        comptableMatiereCollectionIdentifiers.push(comptableMatiereIdentifier);
        return true;
      });
      return [...comptableMatieresToAdd, ...comptableMatiereCollection];
    }
    return comptableMatiereCollection;
  }
}
