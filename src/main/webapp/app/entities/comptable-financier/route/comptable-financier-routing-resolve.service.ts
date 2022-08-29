import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IComptableFinancier, ComptableFinancier } from '../comptable-financier.model';
import { ComptableFinancierService } from '../service/comptable-financier.service';

@Injectable({ providedIn: 'root' })
export class ComptableFinancierRoutingResolveService implements Resolve<IComptableFinancier> {
  constructor(protected service: ComptableFinancierService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IComptableFinancier> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((comptableFinancier: HttpResponse<ComptableFinancier>) => {
          if (comptableFinancier.body) {
            return of(comptableFinancier.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ComptableFinancier());
  }
}
