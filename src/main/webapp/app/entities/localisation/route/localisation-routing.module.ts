import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LocalisationComponent } from '../list/localisation.component';
import { LocalisationDetailComponent } from '../detail/localisation-detail.component';
import { LocalisationUpdateComponent } from '../update/localisation-update.component';
import { LocalisationRoutingResolveService } from './localisation-routing-resolve.service';

const localisationRoute: Routes = [
  {
    path: '',
    component: LocalisationComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LocalisationDetailComponent,
    resolve: {
      localisation: LocalisationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LocalisationUpdateComponent,
    resolve: {
      localisation: LocalisationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LocalisationUpdateComponent,
    resolve: {
      localisation: LocalisationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(localisationRoute)],
  exports: [RouterModule],
})
export class LocalisationRoutingModule {}
