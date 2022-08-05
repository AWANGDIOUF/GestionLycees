import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IVisite } from '../visite.model';
import { VisiteService } from '../service/visite.service';

@Component({
  templateUrl: './visite-delete-dialog.component.html',
})
export class VisiteDeleteDialogComponent {
  visite?: IVisite;

  constructor(protected visiteService: VisiteService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.visiteService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
