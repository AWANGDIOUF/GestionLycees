import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ConcoursComponent } from './list/concours.component';
import { ConcoursDetailComponent } from './detail/concours-detail.component';
import { ConcoursUpdateComponent } from './update/concours-update.component';
import { ConcoursDeleteDialogComponent } from './delete/concours-delete-dialog.component';
import { ConcoursRoutingModule } from './route/concours-routing.module';

@NgModule({
  imports: [SharedModule, ConcoursRoutingModule],
  declarations: [ConcoursComponent, ConcoursDetailComponent, ConcoursUpdateComponent, ConcoursDeleteDialogComponent],
  entryComponents: [ConcoursDeleteDialogComponent],
})
export class ConcoursModule {}
