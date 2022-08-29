import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMouvementMatiere, getMouvementMatiereIdentifier } from '../mouvement-matiere.model';

export type EntityResponseType = HttpResponse<IMouvementMatiere>;
export type EntityArrayResponseType = HttpResponse<IMouvementMatiere[]>;

@Injectable({ providedIn: 'root' })
export class MouvementMatiereService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/mouvement-matieres');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(mouvementMatiere: IMouvementMatiere): Observable<EntityResponseType> {
    return this.http.post<IMouvementMatiere>(this.resourceUrl, mouvementMatiere, { observe: 'response' });
  }

  update(mouvementMatiere: IMouvementMatiere): Observable<EntityResponseType> {
    return this.http.put<IMouvementMatiere>(
      `${this.resourceUrl}/${getMouvementMatiereIdentifier(mouvementMatiere) as number}`,
      mouvementMatiere,
      { observe: 'response' }
    );
  }

  partialUpdate(mouvementMatiere: IMouvementMatiere): Observable<EntityResponseType> {
    return this.http.patch<IMouvementMatiere>(
      `${this.resourceUrl}/${getMouvementMatiereIdentifier(mouvementMatiere) as number}`,
      mouvementMatiere,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMouvementMatiere>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMouvementMatiere[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMouvementMatiereToCollectionIfMissing(
    mouvementMatiereCollection: IMouvementMatiere[],
    ...mouvementMatieresToCheck: (IMouvementMatiere | null | undefined)[]
  ): IMouvementMatiere[] {
    const mouvementMatieres: IMouvementMatiere[] = mouvementMatieresToCheck.filter(isPresent);
    if (mouvementMatieres.length > 0) {
      const mouvementMatiereCollectionIdentifiers = mouvementMatiereCollection.map(
        mouvementMatiereItem => getMouvementMatiereIdentifier(mouvementMatiereItem)!
      );
      const mouvementMatieresToAdd = mouvementMatieres.filter(mouvementMatiereItem => {
        const mouvementMatiereIdentifier = getMouvementMatiereIdentifier(mouvementMatiereItem);
        if (mouvementMatiereIdentifier == null || mouvementMatiereCollectionIdentifiers.includes(mouvementMatiereIdentifier)) {
          return false;
        }
        mouvementMatiereCollectionIdentifiers.push(mouvementMatiereIdentifier);
        return true;
      });
      return [...mouvementMatieresToAdd, ...mouvementMatiereCollection];
    }
    return mouvementMatiereCollection;
  }
}
