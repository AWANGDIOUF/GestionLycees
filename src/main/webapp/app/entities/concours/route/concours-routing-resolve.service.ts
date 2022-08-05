import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConcours, Concours } from '../concours.model';
import { ConcoursService } from '../service/concours.service';

@Injectable({ providedIn: 'root' })
export class ConcoursRoutingResolveService implements Resolve<IConcours> {
  constructor(protected service: ConcoursService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConcours> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((concours: HttpResponse<Concours>) => {
          if (concours.body) {
            return of(concours.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Concours());
  }
}
