import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DirecteurEtudeComponent } from '../list/directeur-etude.component';
import { DirecteurEtudeDetailComponent } from '../detail/directeur-etude-detail.component';
import { DirecteurEtudeUpdateComponent } from '../update/directeur-etude-update.component';
import { DirecteurEtudeRoutingResolveService } from './directeur-etude-routing-resolve.service';

const directeurEtudeRoute: Routes = [
  {
    path: '',
    component: DirecteurEtudeComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DirecteurEtudeDetailComponent,
    resolve: {
      directeurEtude: DirecteurEtudeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DirecteurEtudeUpdateComponent,
    resolve: {
      directeurEtude: DirecteurEtudeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DirecteurEtudeUpdateComponent,
    resolve: {
      directeurEtude: DirecteurEtudeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(directeurEtudeRoute)],
  exports: [RouterModule],
})
export class DirecteurEtudeRoutingModule {}
