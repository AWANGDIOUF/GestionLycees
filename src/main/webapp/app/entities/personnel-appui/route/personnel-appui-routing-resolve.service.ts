import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPersonnelAppui, PersonnelAppui } from '../personnel-appui.model';
import { PersonnelAppuiService } from '../service/personnel-appui.service';

@Injectable({ providedIn: 'root' })
export class PersonnelAppuiRoutingResolveService implements Resolve<IPersonnelAppui> {
  constructor(protected service: PersonnelAppuiService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPersonnelAppui> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((personnelAppui: HttpResponse<PersonnelAppui>) => {
          if (personnelAppui.body) {
            return of(personnelAppui.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PersonnelAppui());
  }
}
