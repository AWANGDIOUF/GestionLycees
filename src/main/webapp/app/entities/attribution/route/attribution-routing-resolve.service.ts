import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAttribution, Attribution } from '../attribution.model';
import { AttributionService } from '../service/attribution.service';

@Injectable({ providedIn: 'root' })
export class AttributionRoutingResolveService implements Resolve<IAttribution> {
  constructor(protected service: AttributionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAttribution> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((attribution: HttpResponse<Attribution>) => {
          if (attribution.body) {
            return of(attribution.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Attribution());
  }
}
