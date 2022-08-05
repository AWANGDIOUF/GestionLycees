import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProgramme, getProgrammeIdentifier } from '../programme.model';

export type EntityResponseType = HttpResponse<IProgramme>;
export type EntityArrayResponseType = HttpResponse<IProgramme[]>;

@Injectable({ providedIn: 'root' })
export class ProgrammeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/programmes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(programme: IProgramme): Observable<EntityResponseType> {
    return this.http.post<IProgramme>(this.resourceUrl, programme, { observe: 'response' });
  }

  update(programme: IProgramme): Observable<EntityResponseType> {
    return this.http.put<IProgramme>(`${this.resourceUrl}/${getProgrammeIdentifier(programme) as number}`, programme, {
      observe: 'response',
    });
  }

  partialUpdate(programme: IProgramme): Observable<EntityResponseType> {
    return this.http.patch<IProgramme>(`${this.resourceUrl}/${getProgrammeIdentifier(programme) as number}`, programme, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProgramme>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProgramme[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProgrammeToCollectionIfMissing(
    programmeCollection: IProgramme[],
    ...programmesToCheck: (IProgramme | null | undefined)[]
  ): IProgramme[] {
    const programmes: IProgramme[] = programmesToCheck.filter(isPresent);
    if (programmes.length > 0) {
      const programmeCollectionIdentifiers = programmeCollection.map(programmeItem => getProgrammeIdentifier(programmeItem)!);
      const programmesToAdd = programmes.filter(programmeItem => {
        const programmeIdentifier = getProgrammeIdentifier(programmeItem);
        if (programmeIdentifier == null || programmeCollectionIdentifiers.includes(programmeIdentifier)) {
          return false;
        }
        programmeCollectionIdentifiers.push(programmeIdentifier);
        return true;
      });
      return [...programmesToAdd, ...programmeCollection];
    }
    return programmeCollection;
  }
}
