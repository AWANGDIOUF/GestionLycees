import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPersonnelAdministratif, PersonnelAdministratif } from '../personnel-administratif.model';
import { PersonnelAdministratifService } from '../service/personnel-administratif.service';

@Injectable({ providedIn: 'root' })
export class PersonnelAdministratifRoutingResolveService implements Resolve<IPersonnelAdministratif> {
  constructor(protected service: PersonnelAdministratifService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPersonnelAdministratif> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((personnelAdministratif: HttpResponse<PersonnelAdministratif>) => {
          if (personnelAdministratif.body) {
            return of(personnelAdministratif.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PersonnelAdministratif());
  }
}
