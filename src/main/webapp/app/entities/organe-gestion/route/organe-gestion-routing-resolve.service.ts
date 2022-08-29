import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOrganeGestion, OrganeGestion } from '../organe-gestion.model';
import { OrganeGestionService } from '../service/organe-gestion.service';

@Injectable({ providedIn: 'root' })
export class OrganeGestionRoutingResolveService implements Resolve<IOrganeGestion> {
  constructor(protected service: OrganeGestionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrganeGestion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((organeGestion: HttpResponse<OrganeGestion>) => {
          if (organeGestion.body) {
            return of(organeGestion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OrganeGestion());
  }
}
