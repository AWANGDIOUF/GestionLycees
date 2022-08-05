import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProviseurComponent } from '../list/proviseur.component';
import { ProviseurDetailComponent } from '../detail/proviseur-detail.component';
import { ProviseurUpdateComponent } from '../update/proviseur-update.component';
import { ProviseurRoutingResolveService } from './proviseur-routing-resolve.service';

const proviseurRoute: Routes = [
  {
    path: '',
    component: ProviseurComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProviseurDetailComponent,
    resolve: {
      proviseur: ProviseurRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProviseurUpdateComponent,
    resolve: {
      proviseur: ProviseurRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProviseurUpdateComponent,
    resolve: {
      proviseur: ProviseurRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(proviseurRoute)],
  exports: [RouterModule],
})
export class ProviseurRoutingModule {}
