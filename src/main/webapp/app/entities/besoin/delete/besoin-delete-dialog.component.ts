import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IBesoin } from '../besoin.model';
import { BesoinService } from '../service/besoin.service';

@Component({
  templateUrl: './besoin-delete-dialog.component.html',
})
export class BesoinDeleteDialogComponent {
  besoin?: IBesoin;

  constructor(protected besoinService: BesoinService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.besoinService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
