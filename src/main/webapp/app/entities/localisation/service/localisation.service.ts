import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILocalisation, getLocalisationIdentifier } from '../localisation.model';

export type EntityResponseType = HttpResponse<ILocalisation>;
export type EntityArrayResponseType = HttpResponse<ILocalisation[]>;

@Injectable({ providedIn: 'root' })
export class LocalisationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/localisations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(localisation: ILocalisation): Observable<EntityResponseType> {
    return this.http.post<ILocalisation>(this.resourceUrl, localisation, { observe: 'response' });
  }

  update(localisation: ILocalisation): Observable<EntityResponseType> {
    return this.http.put<ILocalisation>(`${this.resourceUrl}/${getLocalisationIdentifier(localisation) as number}`, localisation, {
      observe: 'response',
    });
  }

  partialUpdate(localisation: ILocalisation): Observable<EntityResponseType> {
    return this.http.patch<ILocalisation>(`${this.resourceUrl}/${getLocalisationIdentifier(localisation) as number}`, localisation, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocalisation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocalisation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLocalisationToCollectionIfMissing(
    localisationCollection: ILocalisation[],
    ...localisationsToCheck: (ILocalisation | null | undefined)[]
  ): ILocalisation[] {
    const localisations: ILocalisation[] = localisationsToCheck.filter(isPresent);
    if (localisations.length > 0) {
      const localisationCollectionIdentifiers = localisationCollection.map(
        localisationItem => getLocalisationIdentifier(localisationItem)!
      );
      const localisationsToAdd = localisations.filter(localisationItem => {
        const localisationIdentifier = getLocalisationIdentifier(localisationItem);
        if (localisationIdentifier == null || localisationCollectionIdentifiers.includes(localisationIdentifier)) {
          return false;
        }
        localisationCollectionIdentifiers.push(localisationIdentifier);
        return true;
      });
      return [...localisationsToAdd, ...localisationCollection];
    }
    return localisationCollection;
  }
}
