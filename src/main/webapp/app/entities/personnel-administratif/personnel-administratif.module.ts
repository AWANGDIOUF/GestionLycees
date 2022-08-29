import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PersonnelAdministratifComponent } from './list/personnel-administratif.component';
import { PersonnelAdministratifDetailComponent } from './detail/personnel-administratif-detail.component';
import { PersonnelAdministratifUpdateComponent } from './update/personnel-administratif-update.component';
import { PersonnelAdministratifDeleteDialogComponent } from './delete/personnel-administratif-delete-dialog.component';
import { PersonnelAdministratifRoutingModule } from './route/personnel-administratif-routing.module';

@NgModule({
  imports: [SharedModule, PersonnelAdministratifRoutingModule],
  declarations: [
    PersonnelAdministratifComponent,
    PersonnelAdministratifDetailComponent,
    PersonnelAdministratifUpdateComponent,
    PersonnelAdministratifDeleteDialogComponent,
  ],
  entryComponents: [PersonnelAdministratifDeleteDialogComponent],
})
export class PersonnelAdministratifModule {}
