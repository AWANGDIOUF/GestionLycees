import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MaterielComponent } from './list/materiel.component';
import { MaterielDetailComponent } from './detail/materiel-detail.component';
import { MaterielUpdateComponent } from './update/materiel-update.component';
import { MaterielDeleteDialogComponent } from './delete/materiel-delete-dialog.component';
import { MaterielRoutingModule } from './route/materiel-routing.module';

@NgModule({
  imports: [SharedModule, MaterielRoutingModule],
  declarations: [MaterielComponent, MaterielDetailComponent, MaterielUpdateComponent, MaterielDeleteDialogComponent],
  entryComponents: [MaterielDeleteDialogComponent],
})
export class MaterielModule {}
