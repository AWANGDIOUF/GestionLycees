import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDepense, Depense } from '../depense.model';
import { DepenseService } from '../service/depense.service';

@Injectable({ providedIn: 'root' })
export class DepenseRoutingResolveService implements Resolve<IDepense> {
  constructor(protected service: DepenseService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDepense> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((depense: HttpResponse<Depense>) => {
          if (depense.body) {
            return of(depense.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Depense());
  }
}
