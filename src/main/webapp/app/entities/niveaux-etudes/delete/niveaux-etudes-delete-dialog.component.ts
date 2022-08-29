import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INiveauxEtudes } from '../niveaux-etudes.model';
import { NiveauxEtudesService } from '../service/niveaux-etudes.service';

@Component({
  templateUrl: './niveaux-etudes-delete-dialog.component.html',
})
export class NiveauxEtudesDeleteDialogComponent {
  niveauxEtudes?: INiveauxEtudes;

  constructor(protected niveauxEtudesService: NiveauxEtudesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.niveauxEtudesService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
