import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PersonnelAdministratifComponent } from '../list/personnel-administratif.component';
import { PersonnelAdministratifDetailComponent } from '../detail/personnel-administratif-detail.component';
import { PersonnelAdministratifUpdateComponent } from '../update/personnel-administratif-update.component';
import { PersonnelAdministratifRoutingResolveService } from './personnel-administratif-routing-resolve.service';

const personnelAdministratifRoute: Routes = [
  {
    path: '',
    component: PersonnelAdministratifComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PersonnelAdministratifDetailComponent,
    resolve: {
      personnelAdministratif: PersonnelAdministratifRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PersonnelAdministratifUpdateComponent,
    resolve: {
      personnelAdministratif: PersonnelAdministratifRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PersonnelAdministratifUpdateComponent,
    resolve: {
      personnelAdministratif: PersonnelAdministratifRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(personnelAdministratifRoute)],
  exports: [RouterModule],
})
export class PersonnelAdministratifRoutingModule {}
