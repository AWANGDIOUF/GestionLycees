import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IReception } from '../reception.model';
import { ReceptionService } from '../service/reception.service';

@Component({
  templateUrl: './reception-delete-dialog.component.html',
})
export class ReceptionDeleteDialogComponent {
  reception?: IReception;

  constructor(protected receptionService: ReceptionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.receptionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
