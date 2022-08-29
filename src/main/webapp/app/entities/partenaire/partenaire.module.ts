import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PartenaireComponent } from './list/partenaire.component';
import { PartenaireDetailComponent } from './detail/partenaire-detail.component';
import { PartenaireUpdateComponent } from './update/partenaire-update.component';
import { PartenaireDeleteDialogComponent } from './delete/partenaire-delete-dialog.component';
import { PartenaireRoutingModule } from './route/partenaire-routing.module';

@NgModule({
  imports: [SharedModule, PartenaireRoutingModule],
  declarations: [PartenaireComponent, PartenaireDetailComponent, PartenaireUpdateComponent, PartenaireDeleteDialogComponent],
  entryComponents: [PartenaireDeleteDialogComponent],
})
export class PartenaireModule {}
