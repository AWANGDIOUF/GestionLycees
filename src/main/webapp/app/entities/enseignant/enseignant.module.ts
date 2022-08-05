import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EnseignantComponent } from './list/enseignant.component';
import { EnseignantDetailComponent } from './detail/enseignant-detail.component';
import { EnseignantUpdateComponent } from './update/enseignant-update.component';
import { EnseignantDeleteDialogComponent } from './delete/enseignant-delete-dialog.component';
import { EnseignantRoutingModule } from './route/enseignant-routing.module';

@NgModule({
  imports: [SharedModule, EnseignantRoutingModule],
  declarations: [EnseignantComponent, EnseignantDetailComponent, EnseignantUpdateComponent, EnseignantDeleteDialogComponent],
  entryComponents: [EnseignantDeleteDialogComponent],
})
export class EnseignantModule {}
