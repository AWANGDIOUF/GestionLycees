import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ReformeMatiereComponent } from './list/reforme-matiere.component';
import { ReformeMatiereDetailComponent } from './detail/reforme-matiere-detail.component';
import { ReformeMatiereUpdateComponent } from './update/reforme-matiere-update.component';
import { ReformeMatiereDeleteDialogComponent } from './delete/reforme-matiere-delete-dialog.component';
import { ReformeMatiereRoutingModule } from './route/reforme-matiere-routing.module';

@NgModule({
  imports: [SharedModule, ReformeMatiereRoutingModule],
  declarations: [
    ReformeMatiereComponent,
    ReformeMatiereDetailComponent,
    ReformeMatiereUpdateComponent,
    ReformeMatiereDeleteDialogComponent,
  ],
  entryComponents: [ReformeMatiereDeleteDialogComponent],
})
export class ReformeMatiereModule {}
