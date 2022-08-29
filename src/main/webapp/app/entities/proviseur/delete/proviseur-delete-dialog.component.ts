import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProviseur } from '../proviseur.model';
import { ProviseurService } from '../service/proviseur.service';

@Component({
  templateUrl: './proviseur-delete-dialog.component.html',
})
export class ProviseurDeleteDialogComponent {
  proviseur?: IProviseur;

  constructor(protected proviseurService: ProviseurService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.proviseurService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
