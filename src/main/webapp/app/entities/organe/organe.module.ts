import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { OrganeComponent } from './list/organe.component';
import { OrganeDetailComponent } from './detail/organe-detail.component';
import { OrganeUpdateComponent } from './update/organe-update.component';
import { OrganeDeleteDialogComponent } from './delete/organe-delete-dialog.component';
import { OrganeRoutingModule } from './route/organe-routing.module';

@NgModule({
  imports: [SharedModule, OrganeRoutingModule],
  declarations: [OrganeComponent, OrganeDetailComponent, OrganeUpdateComponent, OrganeDeleteDialogComponent],
  entryComponents: [OrganeDeleteDialogComponent],
})
export class OrganeModule {}
