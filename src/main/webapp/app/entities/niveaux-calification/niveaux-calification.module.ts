import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { NiveauxCalificationComponent } from './list/niveaux-calification.component';
import { NiveauxCalificationDetailComponent } from './detail/niveaux-calification-detail.component';
import { NiveauxCalificationUpdateComponent } from './update/niveaux-calification-update.component';
import { NiveauxCalificationDeleteDialogComponent } from './delete/niveaux-calification-delete-dialog.component';
import { NiveauxCalificationRoutingModule } from './route/niveaux-calification-routing.module';

@NgModule({
  imports: [SharedModule, NiveauxCalificationRoutingModule],
  declarations: [
    NiveauxCalificationComponent,
    NiveauxCalificationDetailComponent,
    NiveauxCalificationUpdateComponent,
    NiveauxCalificationDeleteDialogComponent,
  ],
  entryComponents: [NiveauxCalificationDeleteDialogComponent],
})
export class NiveauxCalificationModule {}
