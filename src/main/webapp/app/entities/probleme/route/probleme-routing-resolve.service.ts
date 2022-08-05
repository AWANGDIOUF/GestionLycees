import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProbleme, Probleme } from '../probleme.model';
import { ProblemeService } from '../service/probleme.service';

@Injectable({ providedIn: 'root' })
export class ProblemeRoutingResolveService implements Resolve<IProbleme> {
  constructor(protected service: ProblemeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProbleme> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((probleme: HttpResponse<Probleme>) => {
          if (probleme.body) {
            return of(probleme.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Probleme());
  }
}
