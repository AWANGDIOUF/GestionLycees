import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DepenseComponent } from './list/depense.component';
import { DepenseDetailComponent } from './detail/depense-detail.component';
import { DepenseUpdateComponent } from './update/depense-update.component';
import { DepenseDeleteDialogComponent } from './delete/depense-delete-dialog.component';
import { DepenseRoutingModule } from './route/depense-routing.module';

@NgModule({
  imports: [SharedModule, DepenseRoutingModule],
  declarations: [DepenseComponent, DepenseDetailComponent, DepenseUpdateComponent, DepenseDeleteDialogComponent],
  entryComponents: [DepenseDeleteDialogComponent],
})
export class DepenseModule {}
