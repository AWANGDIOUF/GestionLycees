import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VisiteComponent } from '../list/visite.component';
import { VisiteDetailComponent } from '../detail/visite-detail.component';
import { VisiteUpdateComponent } from '../update/visite-update.component';
import { VisiteRoutingResolveService } from './visite-routing-resolve.service';

const visiteRoute: Routes = [
  {
    path: '',
    component: VisiteComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VisiteDetailComponent,
    resolve: {
      visite: VisiteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VisiteUpdateComponent,
    resolve: {
      visite: VisiteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VisiteUpdateComponent,
    resolve: {
      visite: VisiteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(visiteRoute)],
  exports: [RouterModule],
})
export class VisiteRoutingModule {}
