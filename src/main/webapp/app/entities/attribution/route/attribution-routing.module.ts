import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AttributionComponent } from '../list/attribution.component';
import { AttributionDetailComponent } from '../detail/attribution-detail.component';
import { AttributionUpdateComponent } from '../update/attribution-update.component';
import { AttributionRoutingResolveService } from './attribution-routing-resolve.service';

const attributionRoute: Routes = [
  {
    path: '',
    component: AttributionComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AttributionDetailComponent,
    resolve: {
      attribution: AttributionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AttributionUpdateComponent,
    resolve: {
      attribution: AttributionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AttributionUpdateComponent,
    resolve: {
      attribution: AttributionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(attributionRoute)],
  exports: [RouterModule],
})
export class AttributionRoutingModule {}
