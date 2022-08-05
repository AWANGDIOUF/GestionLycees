import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProblemeComponent } from '../list/probleme.component';
import { ProblemeDetailComponent } from '../detail/probleme-detail.component';
import { ProblemeUpdateComponent } from '../update/probleme-update.component';
import { ProblemeRoutingResolveService } from './probleme-routing-resolve.service';

const problemeRoute: Routes = [
  {
    path: '',
    component: ProblemeComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProblemeDetailComponent,
    resolve: {
      probleme: ProblemeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProblemeUpdateComponent,
    resolve: {
      probleme: ProblemeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProblemeUpdateComponent,
    resolve: {
      probleme: ProblemeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(problemeRoute)],
  exports: [RouterModule],
})
export class ProblemeRoutingModule {}
