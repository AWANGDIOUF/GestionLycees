import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PartenaireComponent } from '../list/partenaire.component';
import { PartenaireDetailComponent } from '../detail/partenaire-detail.component';
import { PartenaireUpdateComponent } from '../update/partenaire-update.component';
import { PartenaireRoutingResolveService } from './partenaire-routing-resolve.service';

const partenaireRoute: Routes = [
  {
    path: '',
    component: PartenaireComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PartenaireDetailComponent,
    resolve: {
      partenaire: PartenaireRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PartenaireUpdateComponent,
    resolve: {
      partenaire: PartenaireRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PartenaireUpdateComponent,
    resolve: {
      partenaire: PartenaireRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(partenaireRoute)],
  exports: [RouterModule],
})
export class PartenaireRoutingModule {}
