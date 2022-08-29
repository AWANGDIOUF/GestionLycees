import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MouvementMatiereComponent } from './list/mouvement-matiere.component';
import { MouvementMatiereDetailComponent } from './detail/mouvement-matiere-detail.component';
import { MouvementMatiereUpdateComponent } from './update/mouvement-matiere-update.component';
import { MouvementMatiereDeleteDialogComponent } from './delete/mouvement-matiere-delete-dialog.component';
import { MouvementMatiereRoutingModule } from './route/mouvement-matiere-routing.module';

@NgModule({
  imports: [SharedModule, MouvementMatiereRoutingModule],
  declarations: [
    MouvementMatiereComponent,
    MouvementMatiereDetailComponent,
    MouvementMatiereUpdateComponent,
    MouvementMatiereDeleteDialogComponent,
  ],
  entryComponents: [MouvementMatiereDeleteDialogComponent],
})
export class MouvementMatiereModule {}
