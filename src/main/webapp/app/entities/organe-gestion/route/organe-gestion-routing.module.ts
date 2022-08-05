import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { OrganeGestionComponent } from '../list/organe-gestion.component';
import { OrganeGestionDetailComponent } from '../detail/organe-gestion-detail.component';
import { OrganeGestionUpdateComponent } from '../update/organe-gestion-update.component';
import { OrganeGestionRoutingResolveService } from './organe-gestion-routing-resolve.service';

const organeGestionRoute: Routes = [
  {
    path: '',
    component: OrganeGestionComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OrganeGestionDetailComponent,
    resolve: {
      organeGestion: OrganeGestionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OrganeGestionUpdateComponent,
    resolve: {
      organeGestion: OrganeGestionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OrganeGestionUpdateComponent,
    resolve: {
      organeGestion: OrganeGestionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(organeGestionRoute)],
  exports: [RouterModule],
})
export class OrganeGestionRoutingModule {}
