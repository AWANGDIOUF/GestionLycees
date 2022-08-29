import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { IventaireDesMatetiereComponent } from './list/iventaire-des-matetiere.component';
import { IventaireDesMatetiereDetailComponent } from './detail/iventaire-des-matetiere-detail.component';
import { IventaireDesMatetiereUpdateComponent } from './update/iventaire-des-matetiere-update.component';
import { IventaireDesMatetiereDeleteDialogComponent } from './delete/iventaire-des-matetiere-delete-dialog.component';
import { IventaireDesMatetiereRoutingModule } from './route/iventaire-des-matetiere-routing.module';

@NgModule({
  imports: [SharedModule, IventaireDesMatetiereRoutingModule],
  declarations: [
    IventaireDesMatetiereComponent,
    IventaireDesMatetiereDetailComponent,
    IventaireDesMatetiereUpdateComponent,
    IventaireDesMatetiereDeleteDialogComponent,
  ],
  entryComponents: [IventaireDesMatetiereDeleteDialogComponent],
})
export class IventaireDesMatetiereModule {}
