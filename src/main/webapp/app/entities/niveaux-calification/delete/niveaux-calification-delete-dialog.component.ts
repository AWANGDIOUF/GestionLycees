import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INiveauxCalification } from '../niveaux-calification.model';
import { NiveauxCalificationService } from '../service/niveaux-calification.service';

@Component({
  templateUrl: './niveaux-calification-delete-dialog.component.html',
})
export class NiveauxCalificationDeleteDialogComponent {
  niveauxCalification?: INiveauxCalification;

  constructor(protected niveauxCalificationService: NiveauxCalificationService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.niveauxCalificationService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
