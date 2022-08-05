import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IReception, Reception } from '../reception.model';
import { ReceptionService } from '../service/reception.service';

@Injectable({ providedIn: 'root' })
export class ReceptionRoutingResolveService implements Resolve<IReception> {
  constructor(protected service: ReceptionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReception> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((reception: HttpResponse<Reception>) => {
          if (reception.body) {
            return of(reception.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Reception());
  }
}
