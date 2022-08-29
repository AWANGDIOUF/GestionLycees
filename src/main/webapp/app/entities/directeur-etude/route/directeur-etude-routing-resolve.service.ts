import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDirecteurEtude, DirecteurEtude } from '../directeur-etude.model';
import { DirecteurEtudeService } from '../service/directeur-etude.service';

@Injectable({ providedIn: 'root' })
export class DirecteurEtudeRoutingResolveService implements Resolve<IDirecteurEtude> {
  constructor(protected service: DirecteurEtudeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDirecteurEtude> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((directeurEtude: HttpResponse<DirecteurEtude>) => {
          if (directeurEtude.body) {
            return of(directeurEtude.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DirecteurEtude());
  }
}
