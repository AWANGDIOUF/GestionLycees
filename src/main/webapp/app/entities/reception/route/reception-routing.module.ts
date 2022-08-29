import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ReceptionComponent } from '../list/reception.component';
import { ReceptionDetailComponent } from '../detail/reception-detail.component';
import { ReceptionUpdateComponent } from '../update/reception-update.component';
import { ReceptionRoutingResolveService } from './reception-routing-resolve.service';

const receptionRoute: Routes = [
  {
    path: '',
    component: ReceptionComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReceptionDetailComponent,
    resolve: {
      reception: ReceptionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ReceptionUpdateComponent,
    resolve: {
      reception: ReceptionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReceptionUpdateComponent,
    resolve: {
      reception: ReceptionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(receptionRoute)],
  exports: [RouterModule],
})
export class ReceptionRoutingModule {}
