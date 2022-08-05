import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MouvementMatiereComponent } from '../list/mouvement-matiere.component';
import { MouvementMatiereDetailComponent } from '../detail/mouvement-matiere-detail.component';
import { MouvementMatiereUpdateComponent } from '../update/mouvement-matiere-update.component';
import { MouvementMatiereRoutingResolveService } from './mouvement-matiere-routing-resolve.service';

const mouvementMatiereRoute: Routes = [
  {
    path: '',
    component: MouvementMatiereComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MouvementMatiereDetailComponent,
    resolve: {
      mouvementMatiere: MouvementMatiereRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MouvementMatiereUpdateComponent,
    resolve: {
      mouvementMatiere: MouvementMatiereRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MouvementMatiereUpdateComponent,
    resolve: {
      mouvementMatiere: MouvementMatiereRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mouvementMatiereRoute)],
  exports: [RouterModule],
})
export class MouvementMatiereRoutingModule {}
