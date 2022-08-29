import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMouvementMatiere, MouvementMatiere } from '../mouvement-matiere.model';
import { MouvementMatiereService } from '../service/mouvement-matiere.service';

@Injectable({ providedIn: 'root' })
export class MouvementMatiereRoutingResolveService implements Resolve<IMouvementMatiere> {
  constructor(protected service: MouvementMatiereService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMouvementMatiere> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((mouvementMatiere: HttpResponse<MouvementMatiere>) => {
          if (mouvementMatiere.body) {
            return of(mouvementMatiere.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MouvementMatiere());
  }
}
