import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INiveauxCalification, NiveauxCalification } from '../niveaux-calification.model';
import { NiveauxCalificationService } from '../service/niveaux-calification.service';

@Injectable({ providedIn: 'root' })
export class NiveauxCalificationRoutingResolveService implements Resolve<INiveauxCalification> {
  constructor(protected service: NiveauxCalificationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INiveauxCalification> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((niveauxCalification: HttpResponse<NiveauxCalification>) => {
          if (niveauxCalification.body) {
            return of(niveauxCalification.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NiveauxCalification());
  }
}
