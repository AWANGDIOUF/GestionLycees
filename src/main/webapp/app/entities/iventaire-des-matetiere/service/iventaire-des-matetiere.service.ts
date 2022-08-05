import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IIventaireDesMatetiere, getIventaireDesMatetiereIdentifier } from '../iventaire-des-matetiere.model';

export type EntityResponseType = HttpResponse<IIventaireDesMatetiere>;
export type EntityArrayResponseType = HttpResponse<IIventaireDesMatetiere[]>;

@Injectable({ providedIn: 'root' })
export class IventaireDesMatetiereService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/iventaire-des-matetieres');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(iventaireDesMatetiere: IIventaireDesMatetiere): Observable<EntityResponseType> {
    return this.http.post<IIventaireDesMatetiere>(this.resourceUrl, iventaireDesMatetiere, { observe: 'response' });
  }

  update(iventaireDesMatetiere: IIventaireDesMatetiere): Observable<EntityResponseType> {
    return this.http.put<IIventaireDesMatetiere>(
      `${this.resourceUrl}/${getIventaireDesMatetiereIdentifier(iventaireDesMatetiere) as number}`,
      iventaireDesMatetiere,
      { observe: 'response' }
    );
  }

  partialUpdate(iventaireDesMatetiere: IIventaireDesMatetiere): Observable<EntityResponseType> {
    return this.http.patch<IIventaireDesMatetiere>(
      `${this.resourceUrl}/${getIventaireDesMatetiereIdentifier(iventaireDesMatetiere) as number}`,
      iventaireDesMatetiere,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IIventaireDesMatetiere>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIventaireDesMatetiere[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addIventaireDesMatetiereToCollectionIfMissing(
    iventaireDesMatetiereCollection: IIventaireDesMatetiere[],
    ...iventaireDesMatetieresToCheck: (IIventaireDesMatetiere | null | undefined)[]
  ): IIventaireDesMatetiere[] {
    const iventaireDesMatetieres: IIventaireDesMatetiere[] = iventaireDesMatetieresToCheck.filter(isPresent);
    if (iventaireDesMatetieres.length > 0) {
      const iventaireDesMatetiereCollectionIdentifiers = iventaireDesMatetiereCollection.map(
        iventaireDesMatetiereItem => getIventaireDesMatetiereIdentifier(iventaireDesMatetiereItem)!
      );
      const iventaireDesMatetieresToAdd = iventaireDesMatetieres.filter(iventaireDesMatetiereItem => {
        const iventaireDesMatetiereIdentifier = getIventaireDesMatetiereIdentifier(iventaireDesMatetiereItem);
        if (
          iventaireDesMatetiereIdentifier == null ||
          iventaireDesMatetiereCollectionIdentifiers.includes(iventaireDesMatetiereIdentifier)
        ) {
          return false;
        }
        iventaireDesMatetiereCollectionIdentifiers.push(iventaireDesMatetiereIdentifier);
        return true;
      });
      return [...iventaireDesMatetieresToAdd, ...iventaireDesMatetiereCollection];
    }
    return iventaireDesMatetiereCollection;
  }
}
