import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { OrganeGestionComponent } from './list/organe-gestion.component';
import { OrganeGestionDetailComponent } from './detail/organe-gestion-detail.component';
import { OrganeGestionUpdateComponent } from './update/organe-gestion-update.component';
import { OrganeGestionDeleteDialogComponent } from './delete/organe-gestion-delete-dialog.component';
import { OrganeGestionRoutingModule } from './route/organe-gestion-routing.module';

@NgModule({
  imports: [SharedModule, OrganeGestionRoutingModule],
  declarations: [OrganeGestionComponent, OrganeGestionDetailComponent, OrganeGestionUpdateComponent, OrganeGestionDeleteDialogComponent],
  entryComponents: [OrganeGestionDeleteDialogComponent],
})
export class OrganeGestionModule {}
