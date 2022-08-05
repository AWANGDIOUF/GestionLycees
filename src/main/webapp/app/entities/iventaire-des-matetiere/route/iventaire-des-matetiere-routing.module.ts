import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { IventaireDesMatetiereComponent } from '../list/iventaire-des-matetiere.component';
import { IventaireDesMatetiereDetailComponent } from '../detail/iventaire-des-matetiere-detail.component';
import { IventaireDesMatetiereUpdateComponent } from '../update/iventaire-des-matetiere-update.component';
import { IventaireDesMatetiereRoutingResolveService } from './iventaire-des-matetiere-routing-resolve.service';

const iventaireDesMatetiereRoute: Routes = [
  {
    path: '',
    component: IventaireDesMatetiereComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: IventaireDesMatetiereDetailComponent,
    resolve: {
      iventaireDesMatetiere: IventaireDesMatetiereRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: IventaireDesMatetiereUpdateComponent,
    resolve: {
      iventaireDesMatetiere: IventaireDesMatetiereRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: IventaireDesMatetiereUpdateComponent,
    resolve: {
      iventaireDesMatetiere: IventaireDesMatetiereRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(iventaireDesMatetiereRoute)],
  exports: [RouterModule],
})
export class IventaireDesMatetiereRoutingModule {}
