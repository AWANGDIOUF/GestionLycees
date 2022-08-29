import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ComptableFinancierComponent } from './list/comptable-financier.component';
import { ComptableFinancierDetailComponent } from './detail/comptable-financier-detail.component';
import { ComptableFinancierUpdateComponent } from './update/comptable-financier-update.component';
import { ComptableFinancierDeleteDialogComponent } from './delete/comptable-financier-delete-dialog.component';
import { ComptableFinancierRoutingModule } from './route/comptable-financier-routing.module';

@NgModule({
  imports: [SharedModule, ComptableFinancierRoutingModule],
  declarations: [
    ComptableFinancierComponent,
    ComptableFinancierDetailComponent,
    ComptableFinancierUpdateComponent,
    ComptableFinancierDeleteDialogComponent,
  ],
  entryComponents: [ComptableFinancierDeleteDialogComponent],
})
export class ComptableFinancierModule {}
