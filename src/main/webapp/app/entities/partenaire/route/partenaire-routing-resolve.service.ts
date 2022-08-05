import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPartenaire, Partenaire } from '../partenaire.model';
import { PartenaireService } from '../service/partenaire.service';

@Injectable({ providedIn: 'root' })
export class PartenaireRoutingResolveService implements Resolve<IPartenaire> {
  constructor(protected service: PartenaireService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPartenaire> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((partenaire: HttpResponse<Partenaire>) => {
          if (partenaire.body) {
            return of(partenaire.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Partenaire());
  }
}
