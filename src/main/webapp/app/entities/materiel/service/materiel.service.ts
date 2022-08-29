import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMateriel, getMaterielIdentifier } from '../materiel.model';

export type EntityResponseType = HttpResponse<IMateriel>;
export type EntityArrayResponseType = HttpResponse<IMateriel[]>;

@Injectable({ providedIn: 'root' })
export class MaterielService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/materiels');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(materiel: IMateriel): Observable<EntityResponseType> {
    return this.http.post<IMateriel>(this.resourceUrl, materiel, { observe: 'response' });
  }

  update(materiel: IMateriel): Observable<EntityResponseType> {
    return this.http.put<IMateriel>(`${this.resourceUrl}/${getMaterielIdentifier(materiel) as number}`, materiel, { observe: 'response' });
  }

  partialUpdate(materiel: IMateriel): Observable<EntityResponseType> {
    return this.http.patch<IMateriel>(`${this.resourceUrl}/${getMaterielIdentifier(materiel) as number}`, materiel, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMateriel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMateriel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMaterielToCollectionIfMissing(materielCollection: IMateriel[], ...materielsToCheck: (IMateriel | null | undefined)[]): IMateriel[] {
    const materiels: IMateriel[] = materielsToCheck.filter(isPresent);
    if (materiels.length > 0) {
      const materielCollectionIdentifiers = materielCollection.map(materielItem => getMaterielIdentifier(materielItem)!);
      const materielsToAdd = materiels.filter(materielItem => {
        const materielIdentifier = getMaterielIdentifier(materielItem);
        if (materielIdentifier == null || materielCollectionIdentifiers.includes(materielIdentifier)) {
          return false;
        }
        materielCollectionIdentifiers.push(materielIdentifier);
        return true;
      });
      return [...materielsToAdd, ...materielCollection];
    }
    return materielCollection;
  }
}
