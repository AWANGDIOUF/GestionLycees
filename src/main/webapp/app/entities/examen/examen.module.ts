import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ExamenComponent } from './list/examen.component';
import { ExamenDetailComponent } from './detail/examen-detail.component';
import { ExamenUpdateComponent } from './update/examen-update.component';
import { ExamenDeleteDialogComponent } from './delete/examen-delete-dialog.component';
import { ExamenRoutingModule } from './route/examen-routing.module';

@NgModule({
  imports: [SharedModule, ExamenRoutingModule],
  declarations: [ExamenComponent, ExamenDetailComponent, ExamenUpdateComponent, ExamenDeleteDialogComponent],
  entryComponents: [ExamenDeleteDialogComponent],
})
export class ExamenModule {}
