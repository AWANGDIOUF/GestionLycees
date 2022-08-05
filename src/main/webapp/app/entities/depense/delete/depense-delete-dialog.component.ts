import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepense } from '../depense.model';
import { DepenseService } from '../service/depense.service';

@Component({
  templateUrl: './depense-delete-dialog.component.html',
})
export class DepenseDeleteDialogComponent {
  depense?: IDepense;

  constructor(protected depenseService: DepenseService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.depenseService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
