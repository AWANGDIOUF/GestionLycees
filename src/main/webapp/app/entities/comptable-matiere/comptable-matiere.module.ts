import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ComptableMatiereComponent } from './list/comptable-matiere.component';
import { ComptableMatiereDetailComponent } from './detail/comptable-matiere-detail.component';
import { ComptableMatiereUpdateComponent } from './update/comptable-matiere-update.component';
import { ComptableMatiereDeleteDialogComponent } from './delete/comptable-matiere-delete-dialog.component';
import { ComptableMatiereRoutingModule } from './route/comptable-matiere-routing.module';

@NgModule({
  imports: [SharedModule, ComptableMatiereRoutingModule],
  declarations: [
    ComptableMatiereComponent,
    ComptableMatiereDetailComponent,
    ComptableMatiereUpdateComponent,
    ComptableMatiereDeleteDialogComponent,
  ],
  entryComponents: [ComptableMatiereDeleteDialogComponent],
})
export class ComptableMatiereModule {}
