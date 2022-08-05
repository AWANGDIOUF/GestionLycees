import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RecetteComponent } from '../list/recette.component';
import { RecetteDetailComponent } from '../detail/recette-detail.component';
import { RecetteUpdateComponent } from '../update/recette-update.component';
import { RecetteRoutingResolveService } from './recette-routing-resolve.service';

const recetteRoute: Routes = [
  {
    path: '',
    component: RecetteComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RecetteDetailComponent,
    resolve: {
      recette: RecetteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RecetteUpdateComponent,
    resolve: {
      recette: RecetteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RecetteUpdateComponent,
    resolve: {
      recette: RecetteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(recetteRoute)],
  exports: [RouterModule],
})
export class RecetteRoutingModule {}
