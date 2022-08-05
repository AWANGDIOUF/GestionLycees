import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProbleme, getProblemeIdentifier } from '../probleme.model';

export type EntityResponseType = HttpResponse<IProbleme>;
export type EntityArrayResponseType = HttpResponse<IProbleme[]>;

@Injectable({ providedIn: 'root' })
export class ProblemeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/problemes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(probleme: IProbleme): Observable<EntityResponseType> {
    return this.http.post<IProbleme>(this.resourceUrl, probleme, { observe: 'response' });
  }

  update(probleme: IProbleme): Observable<EntityResponseType> {
    return this.http.put<IProbleme>(`${this.resourceUrl}/${getProblemeIdentifier(probleme) as number}`, probleme, { observe: 'response' });
  }

  partialUpdate(probleme: IProbleme): Observable<EntityResponseType> {
    return this.http.patch<IProbleme>(`${this.resourceUrl}/${getProblemeIdentifier(probleme) as number}`, probleme, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProbleme>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProbleme[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProblemeToCollectionIfMissing(problemeCollection: IProbleme[], ...problemesToCheck: (IProbleme | null | undefined)[]): IProbleme[] {
    const problemes: IProbleme[] = problemesToCheck.filter(isPresent);
    if (problemes.length > 0) {
      const problemeCollectionIdentifiers = problemeCollection.map(problemeItem => getProblemeIdentifier(problemeItem)!);
      const problemesToAdd = problemes.filter(problemeItem => {
        const problemeIdentifier = getProblemeIdentifier(problemeItem);
        if (problemeIdentifier == null || problemeCollectionIdentifiers.includes(problemeIdentifier)) {
          return false;
        }
        problemeCollectionIdentifiers.push(problemeIdentifier);
        return true;
      });
      return [...problemesToAdd, ...problemeCollection];
    }
    return problemeCollection;
  }
}
