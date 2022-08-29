import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVisite, Visite } from '../visite.model';
import { VisiteService } from '../service/visite.service';

@Injectable({ providedIn: 'root' })
export class VisiteRoutingResolveService implements Resolve<IVisite> {
  constructor(protected service: VisiteService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVisite> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((visite: HttpResponse<Visite>) => {
          if (visite.body) {
            return of(visite.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Visite());
  }
}
