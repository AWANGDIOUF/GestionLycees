import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDifficulte } from '../difficulte.model';
import { DifficulteService } from '../service/difficulte.service';

@Component({
  templateUrl: './difficulte-delete-dialog.component.html',
})
export class DifficulteDeleteDialogComponent {
  difficulte?: IDifficulte;

  constructor(protected difficulteService: DifficulteService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.difficulteService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
