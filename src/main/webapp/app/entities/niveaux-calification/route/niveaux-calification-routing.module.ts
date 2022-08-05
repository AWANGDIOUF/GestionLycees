import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { NiveauxCalificationComponent } from '../list/niveaux-calification.component';
import { NiveauxCalificationDetailComponent } from '../detail/niveaux-calification-detail.component';
import { NiveauxCalificationUpdateComponent } from '../update/niveaux-calification-update.component';
import { NiveauxCalificationRoutingResolveService } from './niveaux-calification-routing-resolve.service';

const niveauxCalificationRoute: Routes = [
  {
    path: '',
    component: NiveauxCalificationComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NiveauxCalificationDetailComponent,
    resolve: {
      niveauxCalification: NiveauxCalificationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NiveauxCalificationUpdateComponent,
    resolve: {
      niveauxCalification: NiveauxCalificationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NiveauxCalificationUpdateComponent,
    resolve: {
      niveauxCalification: NiveauxCalificationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(niveauxCalificationRoute)],
  exports: [RouterModule],
})
export class NiveauxCalificationRoutingModule {}
