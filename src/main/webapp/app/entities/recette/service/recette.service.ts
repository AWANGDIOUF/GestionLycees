import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRecette, getRecetteIdentifier } from '../recette.model';

export type EntityResponseType = HttpResponse<IRecette>;
export type EntityArrayResponseType = HttpResponse<IRecette[]>;

@Injectable({ providedIn: 'root' })
export class RecetteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/recettes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(recette: IRecette): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(recette);
    return this.http
      .post<IRecette>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(recette: IRecette): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(recette);
    return this.http
      .put<IRecette>(`${this.resourceUrl}/${getRecetteIdentifier(recette) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(recette: IRecette): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(recette);
    return this.http
      .patch<IRecette>(`${this.resourceUrl}/${getRecetteIdentifier(recette) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRecette>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRecette[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRecetteToCollectionIfMissing(recetteCollection: IRecette[], ...recettesToCheck: (IRecette | null | undefined)[]): IRecette[] {
    const recettes: IRecette[] = recettesToCheck.filter(isPresent);
    if (recettes.length > 0) {
      const recetteCollectionIdentifiers = recetteCollection.map(recetteItem => getRecetteIdentifier(recetteItem)!);
      const recettesToAdd = recettes.filter(recetteItem => {
        const recetteIdentifier = getRecetteIdentifier(recetteItem);
        if (recetteIdentifier == null || recetteCollectionIdentifiers.includes(recetteIdentifier)) {
          return false;
        }
        recetteCollectionIdentifiers.push(recetteIdentifier);
        return true;
      });
      return [...recettesToAdd, ...recetteCollection];
    }
    return recetteCollection;
  }

  protected convertDateFromClient(recette: IRecette): IRecette {
    return Object.assign({}, recette, {
      date: recette.date?.isValid() ? recette.date.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? dayjs(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((recette: IRecette) => {
        recette.date = recette.date ? dayjs(recette.date) : undefined;
      });
    }
    return res;
  }
}
