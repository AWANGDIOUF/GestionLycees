import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RecetteComponent } from './list/recette.component';
import { RecetteDetailComponent } from './detail/recette-detail.component';
import { RecetteUpdateComponent } from './update/recette-update.component';
import { RecetteDeleteDialogComponent } from './delete/recette-delete-dialog.component';
import { RecetteRoutingModule } from './route/recette-routing.module';

@NgModule({
  imports: [SharedModule, RecetteRoutingModule],
  declarations: [RecetteComponent, RecetteDetailComponent, RecetteUpdateComponent, RecetteDeleteDialogComponent],
  entryComponents: [RecetteDeleteDialogComponent],
})
export class RecetteModule {}
