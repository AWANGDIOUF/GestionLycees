import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILyceesTechniques, LyceesTechniques } from '../lycees-techniques.model';
import { LyceesTechniquesService } from '../service/lycees-techniques.service';

@Injectable({ providedIn: 'root' })
export class LyceesTechniquesRoutingResolveService implements Resolve<ILyceesTechniques> {
  constructor(protected service: LyceesTechniquesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILyceesTechniques> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((lyceesTechniques: HttpResponse<LyceesTechniques>) => {
          if (lyceesTechniques.body) {
            return of(lyceesTechniques.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LyceesTechniques());
  }
}
