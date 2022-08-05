import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProviseur, Proviseur } from '../proviseur.model';
import { ProviseurService } from '../service/proviseur.service';

@Injectable({ providedIn: 'root' })
export class ProviseurRoutingResolveService implements Resolve<IProviseur> {
  constructor(protected service: ProviseurService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProviseur> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((proviseur: HttpResponse<Proviseur>) => {
          if (proviseur.body) {
            return of(proviseur.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Proviseur());
  }
}
