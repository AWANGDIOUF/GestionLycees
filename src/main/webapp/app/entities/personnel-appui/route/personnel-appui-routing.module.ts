import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PersonnelAppuiComponent } from '../list/personnel-appui.component';
import { PersonnelAppuiDetailComponent } from '../detail/personnel-appui-detail.component';
import { PersonnelAppuiUpdateComponent } from '../update/personnel-appui-update.component';
import { PersonnelAppuiRoutingResolveService } from './personnel-appui-routing-resolve.service';

const personnelAppuiRoute: Routes = [
  {
    path: '',
    component: PersonnelAppuiComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PersonnelAppuiDetailComponent,
    resolve: {
      personnelAppui: PersonnelAppuiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PersonnelAppuiUpdateComponent,
    resolve: {
      personnelAppui: PersonnelAppuiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PersonnelAppuiUpdateComponent,
    resolve: {
      personnelAppui: PersonnelAppuiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(personnelAppuiRoute)],
  exports: [RouterModule],
})
export class PersonnelAppuiRoutingModule {}
