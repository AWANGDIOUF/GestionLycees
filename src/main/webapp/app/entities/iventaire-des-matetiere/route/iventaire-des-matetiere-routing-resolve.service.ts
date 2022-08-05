import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IIventaireDesMatetiere, IventaireDesMatetiere } from '../iventaire-des-matetiere.model';
import { IventaireDesMatetiereService } from '../service/iventaire-des-matetiere.service';

@Injectable({ providedIn: 'root' })
export class IventaireDesMatetiereRoutingResolveService implements Resolve<IIventaireDesMatetiere> {
  constructor(protected service: IventaireDesMatetiereService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IIventaireDesMatetiere> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((iventaireDesMatetiere: HttpResponse<IventaireDesMatetiere>) => {
          if (iventaireDesMatetiere.body) {
            return of(iventaireDesMatetiere.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new IventaireDesMatetiere());
  }
}
