import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBesoin, Besoin } from '../besoin.model';
import { BesoinService } from '../service/besoin.service';

@Injectable({ providedIn: 'root' })
export class BesoinRoutingResolveService implements Resolve<IBesoin> {
  constructor(protected service: BesoinService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBesoin> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((besoin: HttpResponse<Besoin>) => {
          if (besoin.body) {
            return of(besoin.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Besoin());
  }
}
