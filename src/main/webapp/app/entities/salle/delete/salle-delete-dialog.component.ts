import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISalle } from '../salle.model';
import { SalleService } from '../service/salle.service';

@Component({
  templateUrl: './salle-delete-dialog.component.html',
})
export class SalleDeleteDialogComponent {
  salle?: ISalle;

  constructor(protected salleService: SalleService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.salleService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
