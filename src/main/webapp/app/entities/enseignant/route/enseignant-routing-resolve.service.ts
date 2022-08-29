import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEnseignant, Enseignant } from '../enseignant.model';
import { EnseignantService } from '../service/enseignant.service';

@Injectable({ providedIn: 'root' })
export class EnseignantRoutingResolveService implements Resolve<IEnseignant> {
  constructor(protected service: EnseignantService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEnseignant> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((enseignant: HttpResponse<Enseignant>) => {
          if (enseignant.body) {
            return of(enseignant.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Enseignant());
  }
}
