import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOrgane, getOrganeIdentifier } from '../organe.model';

export type EntityResponseType = HttpResponse<IOrgane>;
export type EntityArrayResponseType = HttpResponse<IOrgane[]>;

@Injectable({ providedIn: 'root' })
export class OrganeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/organes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(organe: IOrgane): Observable<EntityResponseType> {
    return this.http.post<IOrgane>(this.resourceUrl, organe, { observe: 'response' });
  }

  update(organe: IOrgane): Observable<EntityResponseType> {
    return this.http.put<IOrgane>(`${this.resourceUrl}/${getOrganeIdentifier(organe) as number}`, organe, { observe: 'response' });
  }

  partialUpdate(organe: IOrgane): Observable<EntityResponseType> {
    return this.http.patch<IOrgane>(`${this.resourceUrl}/${getOrganeIdentifier(organe) as number}`, organe, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOrgane>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrgane[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addOrganeToCollectionIfMissing(organeCollection: IOrgane[], ...organesToCheck: (IOrgane | null | undefined)[]): IOrgane[] {
    const organes: IOrgane[] = organesToCheck.filter(isPresent);
    if (organes.length > 0) {
      const organeCollectionIdentifiers = organeCollection.map(organeItem => getOrganeIdentifier(organeItem)!);
      const organesToAdd = organes.filter(organeItem => {
        const organeIdentifier = getOrganeIdentifier(organeItem);
        if (organeIdentifier == null || organeCollectionIdentifiers.includes(organeIdentifier)) {
          return false;
        }
        organeCollectionIdentifiers.push(organeIdentifier);
        return true;
      });
      return [...organesToAdd, ...organeCollection];
    }
    return organeCollection;
  }
}
