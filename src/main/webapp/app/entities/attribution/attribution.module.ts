import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AttributionComponent } from './list/attribution.component';
import { AttributionDetailComponent } from './detail/attribution-detail.component';
import { AttributionUpdateComponent } from './update/attribution-update.component';
import { AttributionDeleteDialogComponent } from './delete/attribution-delete-dialog.component';
import { AttributionRoutingModule } from './route/attribution-routing.module';

@NgModule({
  imports: [SharedModule, AttributionRoutingModule],
  declarations: [AttributionComponent, AttributionDetailComponent, AttributionUpdateComponent, AttributionDeleteDialogComponent],
  entryComponents: [AttributionDeleteDialogComponent],
})
export class AttributionModule {}
