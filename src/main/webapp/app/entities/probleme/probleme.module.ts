import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProblemeComponent } from './list/probleme.component';
import { ProblemeDetailComponent } from './detail/probleme-detail.component';
import { ProblemeUpdateComponent } from './update/probleme-update.component';
import { ProblemeDeleteDialogComponent } from './delete/probleme-delete-dialog.component';
import { ProblemeRoutingModule } from './route/probleme-routing.module';

@NgModule({
  imports: [SharedModule, ProblemeRoutingModule],
  declarations: [ProblemeComponent, ProblemeDetailComponent, ProblemeUpdateComponent, ProblemeDeleteDialogComponent],
  entryComponents: [ProblemeDeleteDialogComponent],
})
export class ProblemeModule {}
