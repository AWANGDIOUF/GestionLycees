import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDirecteurEtude, getDirecteurEtudeIdentifier } from '../directeur-etude.model';

export type EntityResponseType = HttpResponse<IDirecteurEtude>;
export type EntityArrayResponseType = HttpResponse<IDirecteurEtude[]>;

@Injectable({ providedIn: 'root' })
export class DirecteurEtudeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/directeur-etudes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(directeurEtude: IDirecteurEtude): Observable<EntityResponseType> {
    return this.http.post<IDirecteurEtude>(this.resourceUrl, directeurEtude, { observe: 'response' });
  }

  update(directeurEtude: IDirecteurEtude): Observable<EntityResponseType> {
    return this.http.put<IDirecteurEtude>(`${this.resourceUrl}/${getDirecteurEtudeIdentifier(directeurEtude) as number}`, directeurEtude, {
      observe: 'response',
    });
  }

  partialUpdate(directeurEtude: IDirecteurEtude): Observable<EntityResponseType> {
    return this.http.patch<IDirecteurEtude>(
      `${this.resourceUrl}/${getDirecteurEtudeIdentifier(directeurEtude) as number}`,
      directeurEtude,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDirecteurEtude>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDirecteurEtude[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDirecteurEtudeToCollectionIfMissing(
    directeurEtudeCollection: IDirecteurEtude[],
    ...directeurEtudesToCheck: (IDirecteurEtude | null | undefined)[]
  ): IDirecteurEtude[] {
    const directeurEtudes: IDirecteurEtude[] = directeurEtudesToCheck.filter(isPresent);
    if (directeurEtudes.length > 0) {
      const directeurEtudeCollectionIdentifiers = directeurEtudeCollection.map(
        directeurEtudeItem => getDirecteurEtudeIdentifier(directeurEtudeItem)!
      );
      const directeurEtudesToAdd = directeurEtudes.filter(directeurEtudeItem => {
        const directeurEtudeIdentifier = getDirecteurEtudeIdentifier(directeurEtudeItem);
        if (directeurEtudeIdentifier == null || directeurEtudeCollectionIdentifiers.includes(directeurEtudeIdentifier)) {
          return false;
        }
        directeurEtudeCollectionIdentifiers.push(directeurEtudeIdentifier);
        return true;
      });
      return [...directeurEtudesToAdd, ...directeurEtudeCollection];
    }
    return directeurEtudeCollection;
  }
}
