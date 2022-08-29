import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { LocalisationComponent } from './list/localisation.component';
import { LocalisationDetailComponent } from './detail/localisation-detail.component';
import { LocalisationUpdateComponent } from './update/localisation-update.component';
import { LocalisationDeleteDialogComponent } from './delete/localisation-delete-dialog.component';
import { LocalisationRoutingModule } from './route/localisation-routing.module';

@NgModule({
  imports: [SharedModule, LocalisationRoutingModule],
  declarations: [LocalisationComponent, LocalisationDetailComponent, LocalisationUpdateComponent, LocalisationDeleteDialogComponent],
  entryComponents: [LocalisationDeleteDialogComponent],
})
export class LocalisationModule {}
