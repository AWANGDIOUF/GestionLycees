import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IComptableFinancier } from '../comptable-financier.model';
import { ComptableFinancierService } from '../service/comptable-financier.service';

@Component({
  templateUrl: './comptable-financier-delete-dialog.component.html',
})
export class ComptableFinancierDeleteDialogComponent {
  comptableFinancier?: IComptableFinancier;

  constructor(protected comptableFinancierService: ComptableFinancierService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.comptableFinancierService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
