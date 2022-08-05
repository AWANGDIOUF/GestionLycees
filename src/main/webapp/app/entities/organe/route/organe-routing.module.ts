import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { OrganeComponent } from '../list/organe.component';
import { OrganeDetailComponent } from '../detail/organe-detail.component';
import { OrganeUpdateComponent } from '../update/organe-update.component';
import { OrganeRoutingResolveService } from './organe-routing-resolve.service';

const organeRoute: Routes = [
  {
    path: '',
    component: OrganeComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OrganeDetailComponent,
    resolve: {
      organe: OrganeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OrganeUpdateComponent,
    resolve: {
      organe: OrganeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OrganeUpdateComponent,
    resolve: {
      organe: OrganeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(organeRoute)],
  exports: [RouterModule],
})
export class OrganeRoutingModule {}
