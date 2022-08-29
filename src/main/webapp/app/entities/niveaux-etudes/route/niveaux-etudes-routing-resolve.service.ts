import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INiveauxEtudes, NiveauxEtudes } from '../niveaux-etudes.model';
import { NiveauxEtudesService } from '../service/niveaux-etudes.service';

@Injectable({ providedIn: 'root' })
export class NiveauxEtudesRoutingResolveService implements Resolve<INiveauxEtudes> {
  constructor(protected service: NiveauxEtudesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INiveauxEtudes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((niveauxEtudes: HttpResponse<NiveauxEtudes>) => {
          if (niveauxEtudes.body) {
            return of(niveauxEtudes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NiveauxEtudes());
  }
}
