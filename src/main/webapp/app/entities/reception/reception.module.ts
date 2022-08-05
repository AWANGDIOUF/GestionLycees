import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ReceptionComponent } from './list/reception.component';
import { ReceptionDetailComponent } from './detail/reception-detail.component';
import { ReceptionUpdateComponent } from './update/reception-update.component';
import { ReceptionDeleteDialogComponent } from './delete/reception-delete-dialog.component';
import { ReceptionRoutingModule } from './route/reception-routing.module';

@NgModule({
  imports: [SharedModule, ReceptionRoutingModule],
  declarations: [ReceptionComponent, ReceptionDetailComponent, ReceptionUpdateComponent, ReceptionDeleteDialogComponent],
  entryComponents: [ReceptionDeleteDialogComponent],
})
export class ReceptionModule {}
