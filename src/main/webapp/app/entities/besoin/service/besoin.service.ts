import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBesoin, getBesoinIdentifier } from '../besoin.model';

export type EntityResponseType = HttpResponse<IBesoin>;
export type EntityArrayResponseType = HttpResponse<IBesoin[]>;

@Injectable({ providedIn: 'root' })
export class BesoinService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/besoins');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(besoin: IBesoin): Observable<EntityResponseType> {
    return this.http.post<IBesoin>(this.resourceUrl, besoin, { observe: 'response' });
  }

  update(besoin: IBesoin): Observable<EntityResponseType> {
    return this.http.put<IBesoin>(`${this.resourceUrl}/${getBesoinIdentifier(besoin) as number}`, besoin, { observe: 'response' });
  }

  partialUpdate(besoin: IBesoin): Observable<EntityResponseType> {
    return this.http.patch<IBesoin>(`${this.resourceUrl}/${getBesoinIdentifier(besoin) as number}`, besoin, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBesoin>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBesoin[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addBesoinToCollectionIfMissing(besoinCollection: IBesoin[], ...besoinsToCheck: (IBesoin | null | undefined)[]): IBesoin[] {
    const besoins: IBesoin[] = besoinsToCheck.filter(isPresent);
    if (besoins.length > 0) {
      const besoinCollectionIdentifiers = besoinCollection.map(besoinItem => getBesoinIdentifier(besoinItem)!);
      const besoinsToAdd = besoins.filter(besoinItem => {
        const besoinIdentifier = getBesoinIdentifier(besoinItem);
        if (besoinIdentifier == null || besoinCollectionIdentifiers.includes(besoinIdentifier)) {
          return false;
        }
        besoinCollectionIdentifiers.push(besoinIdentifier);
        return true;
      });
      return [...besoinsToAdd, ...besoinCollection];
    }
    return besoinCollection;
  }
}
