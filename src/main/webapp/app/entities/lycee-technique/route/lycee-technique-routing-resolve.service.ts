import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILyceeTechnique, LyceeTechnique } from '../lycee-technique.model';
import { LyceeTechniqueService } from '../service/lycee-technique.service';

@Injectable({ providedIn: 'root' })
export class LyceeTechniqueRoutingResolveService implements Resolve<ILyceeTechnique> {
  constructor(protected service: LyceeTechniqueService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILyceeTechnique> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((lyceeTechnique: HttpResponse<LyceeTechnique>) => {
          if (lyceeTechnique.body) {
            return of(lyceeTechnique.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LyceeTechnique());
  }
}
