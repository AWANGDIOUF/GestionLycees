import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { BesoinComponent } from './list/besoin.component';
import { BesoinDetailComponent } from './detail/besoin-detail.component';
import { BesoinUpdateComponent } from './update/besoin-update.component';
import { BesoinDeleteDialogComponent } from './delete/besoin-delete-dialog.component';
import { BesoinRoutingModule } from './route/besoin-routing.module';

@NgModule({
  imports: [SharedModule, BesoinRoutingModule],
  declarations: [BesoinComponent, BesoinDetailComponent, BesoinUpdateComponent, BesoinDeleteDialogComponent],
  entryComponents: [BesoinDeleteDialogComponent],
})
export class BesoinModule {}
