import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ExamenComponent } from '../list/examen.component';
import { ExamenDetailComponent } from '../detail/examen-detail.component';
import { ExamenUpdateComponent } from '../update/examen-update.component';
import { ExamenRoutingResolveService } from './examen-routing-resolve.service';

const examenRoute: Routes = [
  {
    path: '',
    component: ExamenComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ExamenDetailComponent,
    resolve: {
      examen: ExamenRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ExamenUpdateComponent,
    resolve: {
      examen: ExamenRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ExamenUpdateComponent,
    resolve: {
      examen: ExamenRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(examenRoute)],
  exports: [RouterModule],
})
export class ExamenRoutingModule {}
