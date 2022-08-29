import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IConcours } from '../concours.model';
import { ConcoursService } from '../service/concours.service';

@Component({
  templateUrl: './concours-delete-dialog.component.html',
})
export class ConcoursDeleteDialogComponent {
  concours?: IConcours;

  constructor(protected concoursService: ConcoursService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.concoursService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
