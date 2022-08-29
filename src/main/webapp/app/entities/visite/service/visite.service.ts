import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVisite, getVisiteIdentifier } from '../visite.model';

export type EntityResponseType = HttpResponse<IVisite>;
export type EntityArrayResponseType = HttpResponse<IVisite[]>;

@Injectable({ providedIn: 'root' })
export class VisiteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/visites');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(visite: IVisite): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(visite);
    return this.http
      .post<IVisite>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(visite: IVisite): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(visite);
    return this.http
      .put<IVisite>(`${this.resourceUrl}/${getVisiteIdentifier(visite) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(visite: IVisite): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(visite);
    return this.http
      .patch<IVisite>(`${this.resourceUrl}/${getVisiteIdentifier(visite) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVisite>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVisite[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addVisiteToCollectionIfMissing(visiteCollection: IVisite[], ...visitesToCheck: (IVisite | null | undefined)[]): IVisite[] {
    const visites: IVisite[] = visitesToCheck.filter(isPresent);
    if (visites.length > 0) {
      const visiteCollectionIdentifiers = visiteCollection.map(visiteItem => getVisiteIdentifier(visiteItem)!);
      const visitesToAdd = visites.filter(visiteItem => {
        const visiteIdentifier = getVisiteIdentifier(visiteItem);
        if (visiteIdentifier == null || visiteCollectionIdentifiers.includes(visiteIdentifier)) {
          return false;
        }
        visiteCollectionIdentifiers.push(visiteIdentifier);
        return true;
      });
      return [...visitesToAdd, ...visiteCollection];
    }
    return visiteCollection;
  }

  protected convertDateFromClient(visite: IVisite): IVisite {
    return Object.assign({}, visite, {
      periode: visite.periode?.isValid() ? visite.periode.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.periode = res.body.periode ? dayjs(res.body.periode) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((visite: IVisite) => {
        visite.periode = visite.periode ? dayjs(visite.periode) : undefined;
      });
    }
    return res;
  }
}
