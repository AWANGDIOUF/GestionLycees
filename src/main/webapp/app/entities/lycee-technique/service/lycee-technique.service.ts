import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILyceeTechnique, getLyceeTechniqueIdentifier } from '../lycee-technique.model';

export type EntityResponseType = HttpResponse<ILyceeTechnique>;
export type EntityArrayResponseType = HttpResponse<ILyceeTechnique[]>;

@Injectable({ providedIn: 'root' })
export class LyceeTechniqueService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/lycee-techniques');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(lyceeTechnique: ILyceeTechnique): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lyceeTechnique);
    return this.http
      .post<ILyceeTechnique>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(lyceeTechnique: ILyceeTechnique): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lyceeTechnique);
    return this.http
      .put<ILyceeTechnique>(`${this.resourceUrl}/${getLyceeTechniqueIdentifier(lyceeTechnique) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(lyceeTechnique: ILyceeTechnique): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lyceeTechnique);
    return this.http
      .patch<ILyceeTechnique>(`${this.resourceUrl}/${getLyceeTechniqueIdentifier(lyceeTechnique) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILyceeTechnique>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILyceeTechnique[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLyceeTechniqueToCollectionIfMissing(
    lyceeTechniqueCollection: ILyceeTechnique[],
    ...lyceeTechniquesToCheck: (ILyceeTechnique | null | undefined)[]
  ): ILyceeTechnique[] {
    const lyceeTechniques: ILyceeTechnique[] = lyceeTechniquesToCheck.filter(isPresent);
    if (lyceeTechniques.length > 0) {
      const lyceeTechniqueCollectionIdentifiers = lyceeTechniqueCollection.map(
        lyceeTechniqueItem => getLyceeTechniqueIdentifier(lyceeTechniqueItem)!
      );
      const lyceeTechniquesToAdd = lyceeTechniques.filter(lyceeTechniqueItem => {
        const lyceeTechniqueIdentifier = getLyceeTechniqueIdentifier(lyceeTechniqueItem);
        if (lyceeTechniqueIdentifier == null || lyceeTechniqueCollectionIdentifiers.includes(lyceeTechniqueIdentifier)) {
          return false;
        }
        lyceeTechniqueCollectionIdentifiers.push(lyceeTechniqueIdentifier);
        return true;
      });
      return [...lyceeTechniquesToAdd, ...lyceeTechniqueCollection];
    }
    return lyceeTechniqueCollection;
  }

  protected convertDateFromClient(lyceeTechnique: ILyceeTechnique): ILyceeTechnique {
    return Object.assign({}, lyceeTechnique, {
      dateCreation: lyceeTechnique.dateCreation?.isValid() ? lyceeTechnique.dateCreation.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateCreation = res.body.dateCreation ? dayjs(res.body.dateCreation) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((lyceeTechnique: ILyceeTechnique) => {
        lyceeTechnique.dateCreation = lyceeTechnique.dateCreation ? dayjs(lyceeTechnique.dateCreation) : undefined;
      });
    }
    return res;
  }
}
