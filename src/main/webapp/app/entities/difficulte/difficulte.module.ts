import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DifficulteComponent } from './list/difficulte.component';
import { DifficulteDetailComponent } from './detail/difficulte-detail.component';
import { DifficulteUpdateComponent } from './update/difficulte-update.component';
import { DifficulteDeleteDialogComponent } from './delete/difficulte-delete-dialog.component';
import { DifficulteRoutingModule } from './route/difficulte-routing.module';

@NgModule({
  imports: [SharedModule, DifficulteRoutingModule],
  declarations: [DifficulteComponent, DifficulteDetailComponent, DifficulteUpdateComponent, DifficulteDeleteDialogComponent],
  entryComponents: [DifficulteDeleteDialogComponent],
})
export class DifficulteModule {}
