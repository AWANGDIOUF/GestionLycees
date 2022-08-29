import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEnseignant } from '../enseignant.model';
import { EnseignantService } from '../service/enseignant.service';

@Component({
  templateUrl: './enseignant-delete-dialog.component.html',
})
export class EnseignantDeleteDialogComponent {
  enseignant?: IEnseignant;

  constructor(protected enseignantService: EnseignantService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.enseignantService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
