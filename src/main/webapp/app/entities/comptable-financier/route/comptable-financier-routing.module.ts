import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ComptableFinancierComponent } from '../list/comptable-financier.component';
import { ComptableFinancierDetailComponent } from '../detail/comptable-financier-detail.component';
import { ComptableFinancierUpdateComponent } from '../update/comptable-financier-update.component';
import { ComptableFinancierRoutingResolveService } from './comptable-financier-routing-resolve.service';

const comptableFinancierRoute: Routes = [
  {
    path: '',
    component: ComptableFinancierComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ComptableFinancierDetailComponent,
    resolve: {
      comptableFinancier: ComptableFinancierRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ComptableFinancierUpdateComponent,
    resolve: {
      comptableFinancier: ComptableFinancierRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ComptableFinancierUpdateComponent,
    resolve: {
      comptableFinancier: ComptableFinancierRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(comptableFinancierRoute)],
  exports: [RouterModule],
})
export class ComptableFinancierRoutingModule {}
