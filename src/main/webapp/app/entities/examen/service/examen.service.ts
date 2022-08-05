import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IExamen, getExamenIdentifier } from '../examen.model';

export type EntityResponseType = HttpResponse<IExamen>;
export type EntityArrayResponseType = HttpResponse<IExamen[]>;

@Injectable({ providedIn: 'root' })
export class ExamenService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/examen');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(examen: IExamen): Observable<EntityResponseType> {
    return this.http.post<IExamen>(this.resourceUrl, examen, { observe: 'response' });
  }

  update(examen: IExamen): Observable<EntityResponseType> {
    return this.http.put<IExamen>(`${this.resourceUrl}/${getExamenIdentifier(examen) as number}`, examen, { observe: 'response' });
  }

  partialUpdate(examen: IExamen): Observable<EntityResponseType> {
    return this.http.patch<IExamen>(`${this.resourceUrl}/${getExamenIdentifier(examen) as number}`, examen, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExamen>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExamen[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addExamenToCollectionIfMissing(examenCollection: IExamen[], ...examenToCheck: (IExamen | null | undefined)[]): IExamen[] {
    const examen: IExamen[] = examenToCheck.filter(isPresent);
    if (examen.length > 0) {
      const examenCollectionIdentifiers = examenCollection.map(examenItem => getExamenIdentifier(examenItem)!);
      const examenToAdd = examen.filter(examenItem => {
        const examenIdentifier = getExamenIdentifier(examenItem);
        if (examenIdentifier == null || examenCollectionIdentifiers.includes(examenIdentifier)) {
          return false;
        }
        examenCollectionIdentifiers.push(examenIdentifier);
        return true;
      });
      return [...examenToAdd, ...examenCollection];
    }
    return examenCollection;
  }
}
