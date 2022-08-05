import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOrganeGestion, getOrganeGestionIdentifier } from '../organe-gestion.model';

export type EntityResponseType = HttpResponse<IOrganeGestion>;
export type EntityArrayResponseType = HttpResponse<IOrganeGestion[]>;

@Injectable({ providedIn: 'root' })
export class OrganeGestionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/organe-gestions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(organeGestion: IOrganeGestion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(organeGestion);
    return this.http
      .post<IOrganeGestion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(organeGestion: IOrganeGestion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(organeGestion);
    return this.http
      .put<IOrganeGestion>(`${this.resourceUrl}/${getOrganeGestionIdentifier(organeGestion) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(organeGestion: IOrganeGestion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(organeGestion);
    return this.http
      .patch<IOrganeGestion>(`${this.resourceUrl}/${getOrganeGestionIdentifier(organeGestion) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrganeGestion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrganeGestion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addOrganeGestionToCollectionIfMissing(
    organeGestionCollection: IOrganeGestion[],
    ...organeGestionsToCheck: (IOrganeGestion | null | undefined)[]
  ): IOrganeGestion[] {
    const organeGestions: IOrganeGestion[] = organeGestionsToCheck.filter(isPresent);
    if (organeGestions.length > 0) {
      const organeGestionCollectionIdentifiers = organeGestionCollection.map(
        organeGestionItem => getOrganeGestionIdentifier(organeGestionItem)!
      );
      const organeGestionsToAdd = organeGestions.filter(organeGestionItem => {
        const organeGestionIdentifier = getOrganeGestionIdentifier(organeGestionItem);
        if (organeGestionIdentifier == null || organeGestionCollectionIdentifiers.includes(organeGestionIdentifier)) {
          return false;
        }
        organeGestionCollectionIdentifiers.push(organeGestionIdentifier);
        return true;
      });
      return [...organeGestionsToAdd, ...organeGestionCollection];
    }
    return organeGestionCollection;
  }

  protected convertDateFromClient(organeGestion: IOrganeGestion): IOrganeGestion {
    return Object.assign({}, organeGestion, {
      dateActivite: organeGestion.dateActivite?.isValid() ? organeGestion.dateActivite.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateActivite = res.body.dateActivite ? dayjs(res.body.dateActivite) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((organeGestion: IOrganeGestion) => {
        organeGestion.dateActivite = organeGestion.dateActivite ? dayjs(organeGestion.dateActivite) : undefined;
      });
    }
    return res;
  }
}
