import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LyceeTechniqueComponent } from '../list/lycee-technique.component';
import { LyceeTechniqueDetailComponent } from '../detail/lycee-technique-detail.component';
import { LyceeTechniqueUpdateComponent } from '../update/lycee-technique-update.component';
import { LyceeTechniqueRoutingResolveService } from './lycee-technique-routing-resolve.service';

const lyceeTechniqueRoute: Routes = [
  {
    path: '',
    component: LyceeTechniqueComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LyceeTechniqueDetailComponent,
    resolve: {
      lyceeTechnique: LyceeTechniqueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LyceeTechniqueUpdateComponent,
    resolve: {
      lyceeTechnique: LyceeTechniqueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LyceeTechniqueUpdateComponent,
    resolve: {
      lyceeTechnique: LyceeTechniqueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(lyceeTechniqueRoute)],
  exports: [RouterModule],
})
export class LyceeTechniqueRoutingModule {}
