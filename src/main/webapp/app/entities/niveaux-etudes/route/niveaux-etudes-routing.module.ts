import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { NiveauxEtudesComponent } from '../list/niveaux-etudes.component';
import { NiveauxEtudesDetailComponent } from '../detail/niveaux-etudes-detail.component';
import { NiveauxEtudesUpdateComponent } from '../update/niveaux-etudes-update.component';
import { NiveauxEtudesRoutingResolveService } from './niveaux-etudes-routing-resolve.service';

const niveauxEtudesRoute: Routes = [
  {
    path: '',
    component: NiveauxEtudesComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NiveauxEtudesDetailComponent,
    resolve: {
      niveauxEtudes: NiveauxEtudesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NiveauxEtudesUpdateComponent,
    resolve: {
      niveauxEtudes: NiveauxEtudesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NiveauxEtudesUpdateComponent,
    resolve: {
      niveauxEtudes: NiveauxEtudesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(niveauxEtudesRoute)],
  exports: [RouterModule],
})
export class NiveauxEtudesRoutingModule {}
