import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ReformeMatiereComponent } from '../list/reforme-matiere.component';
import { ReformeMatiereDetailComponent } from '../detail/reforme-matiere-detail.component';
import { ReformeMatiereUpdateComponent } from '../update/reforme-matiere-update.component';
import { ReformeMatiereRoutingResolveService } from './reforme-matiere-routing-resolve.service';

const reformeMatiereRoute: Routes = [
  {
    path: '',
    component: ReformeMatiereComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReformeMatiereDetailComponent,
    resolve: {
      reformeMatiere: ReformeMatiereRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ReformeMatiereUpdateComponent,
    resolve: {
      reformeMatiere: ReformeMatiereRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReformeMatiereUpdateComponent,
    resolve: {
      reformeMatiere: ReformeMatiereRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(reformeMatiereRoute)],
  exports: [RouterModule],
})
export class ReformeMatiereRoutingModule {}
