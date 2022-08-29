import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ComptableMatiereComponent } from '../list/comptable-matiere.component';
import { ComptableMatiereDetailComponent } from '../detail/comptable-matiere-detail.component';
import { ComptableMatiereUpdateComponent } from '../update/comptable-matiere-update.component';
import { ComptableMatiereRoutingResolveService } from './comptable-matiere-routing-resolve.service';

const comptableMatiereRoute: Routes = [
  {
    path: '',
    component: ComptableMatiereComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ComptableMatiereDetailComponent,
    resolve: {
      comptableMatiere: ComptableMatiereRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ComptableMatiereUpdateComponent,
    resolve: {
      comptableMatiere: ComptableMatiereRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ComptableMatiereUpdateComponent,
    resolve: {
      comptableMatiere: ComptableMatiereRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(comptableMatiereRoute)],
  exports: [RouterModule],
})
export class ComptableMatiereRoutingModule {}
