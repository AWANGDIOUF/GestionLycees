import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MaterielComponent } from '../list/materiel.component';
import { MaterielDetailComponent } from '../detail/materiel-detail.component';
import { MaterielUpdateComponent } from '../update/materiel-update.component';
import { MaterielRoutingResolveService } from './materiel-routing-resolve.service';

const materielRoute: Routes = [
  {
    path: '',
    component: MaterielComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MaterielDetailComponent,
    resolve: {
      materiel: MaterielRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MaterielUpdateComponent,
    resolve: {
      materiel: MaterielRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MaterielUpdateComponent,
    resolve: {
      materiel: MaterielRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(materielRoute)],
  exports: [RouterModule],
})
export class MaterielRoutingModule {}
