import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LyceesTechniquesComponent } from '../list/lycees-techniques.component';
import { LyceesTechniquesDetailComponent } from '../detail/lycees-techniques-detail.component';
import { LyceesTechniquesUpdateComponent } from '../update/lycees-techniques-update.component';
import { LyceesTechniquesRoutingResolveService } from './lycees-techniques-routing-resolve.service';

const lyceesTechniquesRoute: Routes = [
  {
    path: '',
    component: LyceesTechniquesComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LyceesTechniquesDetailComponent,
    resolve: {
      lyceesTechniques: LyceesTechniquesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LyceesTechniquesUpdateComponent,
    resolve: {
      lyceesTechniques: LyceesTechniquesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LyceesTechniquesUpdateComponent,
    resolve: {
      lyceesTechniques: LyceesTechniquesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(lyceesTechniquesRoute)],
  exports: [RouterModule],
})
export class LyceesTechniquesRoutingModule {}
