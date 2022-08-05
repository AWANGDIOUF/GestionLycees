import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { BesoinComponent } from '../list/besoin.component';
import { BesoinDetailComponent } from '../detail/besoin-detail.component';
import { BesoinUpdateComponent } from '../update/besoin-update.component';
import { BesoinRoutingResolveService } from './besoin-routing-resolve.service';

const besoinRoute: Routes = [
  {
    path: '',
    component: BesoinComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BesoinDetailComponent,
    resolve: {
      besoin: BesoinRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BesoinUpdateComponent,
    resolve: {
      besoin: BesoinRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BesoinUpdateComponent,
    resolve: {
      besoin: BesoinRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(besoinRoute)],
  exports: [RouterModule],
})
export class BesoinRoutingModule {}
