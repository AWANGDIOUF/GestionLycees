import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DirecteurEtudeComponent } from './list/directeur-etude.component';
import { DirecteurEtudeDetailComponent } from './detail/directeur-etude-detail.component';
import { DirecteurEtudeUpdateComponent } from './update/directeur-etude-update.component';
import { DirecteurEtudeDeleteDialogComponent } from './delete/directeur-etude-delete-dialog.component';
import { DirecteurEtudeRoutingModule } from './route/directeur-etude-routing.module';

@NgModule({
  imports: [SharedModule, DirecteurEtudeRoutingModule],
  declarations: [
    DirecteurEtudeComponent,
    DirecteurEtudeDetailComponent,
    DirecteurEtudeUpdateComponent,
    DirecteurEtudeDeleteDialogComponent,
  ],
  entryComponents: [DirecteurEtudeDeleteDialogComponent],
})
export class DirecteurEtudeModule {}
