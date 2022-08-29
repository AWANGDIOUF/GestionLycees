import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IReformeMatiere, getReformeMatiereIdentifier } from '../reforme-matiere.model';

export type EntityResponseType = HttpResponse<IReformeMatiere>;
export type EntityArrayResponseType = HttpResponse<IReformeMatiere[]>;

@Injectable({ providedIn: 'root' })
export class ReformeMatiereService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/reforme-matieres');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(reformeMatiere: IReformeMatiere): Observable<EntityResponseType> {
    return this.http.post<IReformeMatiere>(this.resourceUrl, reformeMatiere, { observe: 'response' });
  }

  update(reformeMatiere: IReformeMatiere): Observable<EntityResponseType> {
    return this.http.put<IReformeMatiere>(`${this.resourceUrl}/${getReformeMatiereIdentifier(reformeMatiere) as number}`, reformeMatiere, {
      observe: 'response',
    });
  }

  partialUpdate(reformeMatiere: IReformeMatiere): Observable<EntityResponseType> {
    return this.http.patch<IReformeMatiere>(
      `${this.resourceUrl}/${getReformeMatiereIdentifier(reformeMatiere) as number}`,
      reformeMatiere,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReformeMatiere>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReformeMatiere[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addReformeMatiereToCollectionIfMissing(
    reformeMatiereCollection: IReformeMatiere[],
    ...reformeMatieresToCheck: (IReformeMatiere | null | undefined)[]
  ): IReformeMatiere[] {
    const reformeMatieres: IReformeMatiere[] = reformeMatieresToCheck.filter(isPresent);
    if (reformeMatieres.length > 0) {
      const reformeMatiereCollectionIdentifiers = reformeMatiereCollection.map(
        reformeMatiereItem => getReformeMatiereIdentifier(reformeMatiereItem)!
      );
      const reformeMatieresToAdd = reformeMatieres.filter(reformeMatiereItem => {
        const reformeMatiereIdentifier = getReformeMatiereIdentifier(reformeMatiereItem);
        if (reformeMatiereIdentifier == null || reformeMatiereCollectionIdentifiers.includes(reformeMatiereIdentifier)) {
          return false;
        }
        reformeMatiereCollectionIdentifiers.push(reformeMatiereIdentifier);
        return true;
      });
      return [...reformeMatieresToAdd, ...reformeMatiereCollection];
    }
    return reformeMatiereCollection;
  }
}
