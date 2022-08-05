import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDifficulte, Difficulte } from '../difficulte.model';
import { DifficulteService } from '../service/difficulte.service';

@Injectable({ providedIn: 'root' })
export class DifficulteRoutingResolveService implements Resolve<IDifficulte> {
  constructor(protected service: DifficulteService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDifficulte> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((difficulte: HttpResponse<Difficulte>) => {
          if (difficulte.body) {
            return of(difficulte.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Difficulte());
  }
}
