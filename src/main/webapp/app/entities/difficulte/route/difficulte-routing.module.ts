import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DifficulteComponent } from '../list/difficulte.component';
import { DifficulteDetailComponent } from '../detail/difficulte-detail.component';
import { DifficulteUpdateComponent } from '../update/difficulte-update.component';
import { DifficulteRoutingResolveService } from './difficulte-routing-resolve.service';

const difficulteRoute: Routes = [
  {
    path: '',
    component: DifficulteComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DifficulteDetailComponent,
    resolve: {
      difficulte: DifficulteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DifficulteUpdateComponent,
    resolve: {
      difficulte: DifficulteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DifficulteUpdateComponent,
    resolve: {
      difficulte: DifficulteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(difficulteRoute)],
  exports: [RouterModule],
})
export class DifficulteRoutingModule {}
