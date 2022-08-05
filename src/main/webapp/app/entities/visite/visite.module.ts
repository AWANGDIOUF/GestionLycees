import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VisiteComponent } from './list/visite.component';
import { VisiteDetailComponent } from './detail/visite-detail.component';
import { VisiteUpdateComponent } from './update/visite-update.component';
import { VisiteDeleteDialogComponent } from './delete/visite-delete-dialog.component';
import { VisiteRoutingModule } from './route/visite-routing.module';

@NgModule({
  imports: [SharedModule, VisiteRoutingModule],
  declarations: [VisiteComponent, VisiteDetailComponent, VisiteUpdateComponent, VisiteDeleteDialogComponent],
  entryComponents: [VisiteDeleteDialogComponent],
})
export class VisiteModule {}
