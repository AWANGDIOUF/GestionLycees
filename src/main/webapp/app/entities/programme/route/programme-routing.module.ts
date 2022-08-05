import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProgrammeComponent } from '../list/programme.component';
import { ProgrammeDetailComponent } from '../detail/programme-detail.component';
import { ProgrammeUpdateComponent } from '../update/programme-update.component';
import { ProgrammeRoutingResolveService } from './programme-routing-resolve.service';

const programmeRoute: Routes = [
  {
    path: '',
    component: ProgrammeComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProgrammeDetailComponent,
    resolve: {
      programme: ProgrammeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProgrammeUpdateComponent,
    resolve: {
      programme: ProgrammeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProgrammeUpdateComponent,
    resolve: {
      programme: ProgrammeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(programmeRoute)],
  exports: [RouterModule],
})
export class ProgrammeRoutingModule {}
