import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IComptableMatiere, ComptableMatiere } from '../comptable-matiere.model';
import { ComptableMatiereService } from '../service/comptable-matiere.service';

@Injectable({ providedIn: 'root' })
export class ComptableMatiereRoutingResolveService implements Resolve<IComptableMatiere> {
  constructor(protected service: ComptableMatiereService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IComptableMatiere> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((comptableMatiere: HttpResponse<ComptableMatiere>) => {
          if (comptableMatiere.body) {
            return of(comptableMatiere.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ComptableMatiere());
  }
}
