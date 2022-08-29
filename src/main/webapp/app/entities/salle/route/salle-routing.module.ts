import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SalleComponent } from '../list/salle.component';
import { SalleDetailComponent } from '../detail/salle-detail.component';
import { SalleUpdateComponent } from '../update/salle-update.component';
import { SalleRoutingResolveService } from './salle-routing-resolve.service';

const salleRoute: Routes = [
  {
    path: '',
    component: SalleComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SalleDetailComponent,
    resolve: {
      salle: SalleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SalleUpdateComponent,
    resolve: {
      salle: SalleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SalleUpdateComponent,
    resolve: {
      salle: SalleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(salleRoute)],
  exports: [RouterModule],
})
export class SalleRoutingModule {}
