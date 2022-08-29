import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMateriel, Materiel } from '../materiel.model';
import { MaterielService } from '../service/materiel.service';

@Injectable({ providedIn: 'root' })
export class MaterielRoutingResolveService implements Resolve<IMateriel> {
  constructor(protected service: MaterielService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMateriel> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((materiel: HttpResponse<Materiel>) => {
          if (materiel.body) {
            return of(materiel.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Materiel());
  }
}
