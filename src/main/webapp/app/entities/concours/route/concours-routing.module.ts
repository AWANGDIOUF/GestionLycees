import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ConcoursComponent } from '../list/concours.component';
import { ConcoursDetailComponent } from '../detail/concours-detail.component';
import { ConcoursUpdateComponent } from '../update/concours-update.component';
import { ConcoursRoutingResolveService } from './concours-routing-resolve.service';

const concoursRoute: Routes = [
  {
    path: '',
    component: ConcoursComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConcoursDetailComponent,
    resolve: {
      concours: ConcoursRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConcoursUpdateComponent,
    resolve: {
      concours: ConcoursRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConcoursUpdateComponent,
    resolve: {
      concours: ConcoursRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(concoursRoute)],
  exports: [RouterModule],
})
export class ConcoursRoutingModule {}
