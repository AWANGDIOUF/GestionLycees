import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRecette, Recette } from '../recette.model';
import { RecetteService } from '../service/recette.service';

@Injectable({ providedIn: 'root' })
export class RecetteRoutingResolveService implements Resolve<IRecette> {
  constructor(protected service: RecetteService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRecette> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((recette: HttpResponse<Recette>) => {
          if (recette.body) {
            return of(recette.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Recette());
  }
}
