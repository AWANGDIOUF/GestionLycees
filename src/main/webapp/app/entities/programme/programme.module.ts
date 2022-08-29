import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProgrammeComponent } from './list/programme.component';
import { ProgrammeDetailComponent } from './detail/programme-detail.component';
import { ProgrammeUpdateComponent } from './update/programme-update.component';
import { ProgrammeDeleteDialogComponent } from './delete/programme-delete-dialog.component';
import { ProgrammeRoutingModule } from './route/programme-routing.module';

@NgModule({
  imports: [SharedModule, ProgrammeRoutingModule],
  declarations: [ProgrammeComponent, ProgrammeDetailComponent, ProgrammeUpdateComponent, ProgrammeDeleteDialogComponent],
  entryComponents: [ProgrammeDeleteDialogComponent],
})
export class ProgrammeModule {}
