import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProviseurComponent } from './list/proviseur.component';
import { ProviseurDetailComponent } from './detail/proviseur-detail.component';
import { ProviseurUpdateComponent } from './update/proviseur-update.component';
import { ProviseurDeleteDialogComponent } from './delete/proviseur-delete-dialog.component';
import { ProviseurRoutingModule } from './route/proviseur-routing.module';

@NgModule({
  imports: [SharedModule, ProviseurRoutingModule],
  declarations: [ProviseurComponent, ProviseurDetailComponent, ProviseurUpdateComponent, ProviseurDeleteDialogComponent],
  entryComponents: [ProviseurDeleteDialogComponent],
})
export class ProviseurModule {}
