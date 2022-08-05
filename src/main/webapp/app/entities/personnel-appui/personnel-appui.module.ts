import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PersonnelAppuiComponent } from './list/personnel-appui.component';
import { PersonnelAppuiDetailComponent } from './detail/personnel-appui-detail.component';
import { PersonnelAppuiUpdateComponent } from './update/personnel-appui-update.component';
import { PersonnelAppuiDeleteDialogComponent } from './delete/personnel-appui-delete-dialog.component';
import { PersonnelAppuiRoutingModule } from './route/personnel-appui-routing.module';

@NgModule({
  imports: [SharedModule, PersonnelAppuiRoutingModule],
  declarations: [
    PersonnelAppuiComponent,
    PersonnelAppuiDetailComponent,
    PersonnelAppuiUpdateComponent,
    PersonnelAppuiDeleteDialogComponent,
  ],
  entryComponents: [PersonnelAppuiDeleteDialogComponent],
})
export class PersonnelAppuiModule {}
