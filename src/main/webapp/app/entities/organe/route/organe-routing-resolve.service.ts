import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOrgane, Organe } from '../organe.model';
import { OrganeService } from '../service/organe.service';

@Injectable({ providedIn: 'root' })
export class OrganeRoutingResolveService implements Resolve<IOrgane> {
  constructor(protected service: OrganeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrgane> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((organe: HttpResponse<Organe>) => {
          if (organe.body) {
            return of(organe.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Organe());
  }
}
