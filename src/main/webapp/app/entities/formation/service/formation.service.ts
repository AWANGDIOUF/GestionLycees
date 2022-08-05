import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFormation, getFormationIdentifier } from '../formation.model';

export type EntityResponseType = HttpResponse<IFormation>;
export type EntityArrayResponseType = HttpResponse<IFormation[]>;

@Injectable({ providedIn: 'root' })
export class FormationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/formations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(formation: IFormation): Observable<EntityResponseType> {
    return this.http.post<IFormation>(this.resourceUrl, formation, { observe: 'response' });
  }

  update(formation: IFormation): Observable<EntityResponseType> {
    return this.http.put<IFormation>(`${this.resourceUrl}/${getFormationIdentifier(formation) as number}`, formation, {
      observe: 'response',
    });
  }

  partialUpdate(formation: IFormation): Observable<EntityResponseType> {
    return this.http.patch<IFormation>(`${this.resourceUrl}/${getFormationIdentifier(formation) as number}`, formation, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFormation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addFormationToCollectionIfMissing(
    formationCollection: IFormation[],
    ...formationsToCheck: (IFormation | null | undefined)[]
  ): IFormation[] {
    const formations: IFormation[] = formationsToCheck.filter(isPresent);
    if (formations.length > 0) {
      const formationCollectionIdentifiers = formationCollection.map(formationItem => getFormationIdentifier(formationItem)!);
      const formationsToAdd = formations.filter(formationItem => {
        const formationIdentifier = getFormationIdentifier(formationItem);
        if (formationIdentifier == null || formationCollectionIdentifiers.includes(formationIdentifier)) {
          return false;
        }
        formationCollectionIdentifiers.push(formationIdentifier);
        return true;
      });
      return [...formationsToAdd, ...formationCollection];
    }
    return formationCollection;
  }
}
