import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { LyceeTechniqueComponent } from './list/lycee-technique.component';
import { LyceeTechniqueDetailComponent } from './detail/lycee-technique-detail.component';
import { LyceeTechniqueUpdateComponent } from './update/lycee-technique-update.component';
import { LyceeTechniqueDeleteDialogComponent } from './delete/lycee-technique-delete-dialog.component';
import { LyceeTechniqueRoutingModule } from './route/lycee-technique-routing.module';

@NgModule({
  imports: [SharedModule, LyceeTechniqueRoutingModule],
  declarations: [
    LyceeTechniqueComponent,
    LyceeTechniqueDetailComponent,
    LyceeTechniqueUpdateComponent,
    LyceeTechniqueDeleteDialogComponent,
  ],
  entryComponents: [LyceeTechniqueDeleteDialogComponent],
})
export class LyceeTechniqueModule {}
