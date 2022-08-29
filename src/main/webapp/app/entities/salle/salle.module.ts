import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SalleComponent } from './list/salle.component';
import { SalleDetailComponent } from './detail/salle-detail.component';
import { SalleUpdateComponent } from './update/salle-update.component';
import { SalleDeleteDialogComponent } from './delete/salle-delete-dialog.component';
import { SalleRoutingModule } from './route/salle-routing.module';

@NgModule({
  imports: [SharedModule, SalleRoutingModule],
  declarations: [SalleComponent, SalleDetailComponent, SalleUpdateComponent, SalleDeleteDialogComponent],
  entryComponents: [SalleDeleteDialogComponent],
})
export class SalleModule {}
