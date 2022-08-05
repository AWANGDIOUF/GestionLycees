import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProgramme, Programme } from '../programme.model';
import { ProgrammeService } from '../service/programme.service';

@Injectable({ providedIn: 'root' })
export class ProgrammeRoutingResolveService implements Resolve<IProgramme> {
  constructor(protected service: ProgrammeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProgramme> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((programme: HttpResponse<Programme>) => {
          if (programme.body) {
            return of(programme.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Programme());
  }
}
