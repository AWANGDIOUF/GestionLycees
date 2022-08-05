import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IReformeMatiere, ReformeMatiere } from '../reforme-matiere.model';
import { ReformeMatiereService } from '../service/reforme-matiere.service';

@Injectable({ providedIn: 'root' })
export class ReformeMatiereRoutingResolveService implements Resolve<IReformeMatiere> {
  constructor(protected service: ReformeMatiereService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReformeMatiere> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((reformeMatiere: HttpResponse<ReformeMatiere>) => {
          if (reformeMatiere.body) {
            return of(reformeMatiere.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ReformeMatiere());
  }
}
