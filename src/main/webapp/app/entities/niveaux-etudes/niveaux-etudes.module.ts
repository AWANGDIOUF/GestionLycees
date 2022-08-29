import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { NiveauxEtudesComponent } from './list/niveaux-etudes.component';
import { NiveauxEtudesDetailComponent } from './detail/niveaux-etudes-detail.component';
import { NiveauxEtudesUpdateComponent } from './update/niveaux-etudes-update.component';
import { NiveauxEtudesDeleteDialogComponent } from './delete/niveaux-etudes-delete-dialog.component';
import { NiveauxEtudesRoutingModule } from './route/niveaux-etudes-routing.module';

@NgModule({
  imports: [SharedModule, NiveauxEtudesRoutingModule],
  declarations: [NiveauxEtudesComponent, NiveauxEtudesDetailComponent, NiveauxEtudesUpdateComponent, NiveauxEtudesDeleteDialogComponent],
  entryComponents: [NiveauxEtudesDeleteDialogComponent],
})
export class NiveauxEtudesModule {}
