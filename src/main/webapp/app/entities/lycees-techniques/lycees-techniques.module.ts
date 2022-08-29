import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { LyceesTechniquesComponent } from './list/lycees-techniques.component';
import { LyceesTechniquesDetailComponent } from './detail/lycees-techniques-detail.component';
import { LyceesTechniquesUpdateComponent } from './update/lycees-techniques-update.component';
import { LyceesTechniquesDeleteDialogComponent } from './delete/lycees-techniques-delete-dialog.component';
import { LyceesTechniquesRoutingModule } from './route/lycees-techniques-routing.module';

@NgModule({
  imports: [SharedModule, LyceesTechniquesRoutingModule],
  declarations: [
    LyceesTechniquesComponent,
    LyceesTechniquesDetailComponent,
    LyceesTechniquesUpdateComponent,
    LyceesTechniquesDeleteDialogComponent,
  ],
  entryComponents: [LyceesTechniquesDeleteDialogComponent],
})
export class LyceesTechniquesModule {}
