import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IIventaireDesMatetiere } from '../iventaire-des-matetiere.model';
import { IventaireDesMatetiereService } from '../service/iventaire-des-matetiere.service';

@Component({
  templateUrl: './iventaire-des-matetiere-delete-dialog.component.html',
})
export class IventaireDesMatetiereDeleteDialogComponent {
  iventaireDesMatetiere?: IIventaireDesMatetiere;

  constructor(protected iventaireDesMatetiereService: IventaireDesMatetiereService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.iventaireDesMatetiereService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
