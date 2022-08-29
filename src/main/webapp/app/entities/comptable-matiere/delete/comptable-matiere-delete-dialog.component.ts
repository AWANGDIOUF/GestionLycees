import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IComptableMatiere } from '../comptable-matiere.model';
import { ComptableMatiereService } from '../service/comptable-matiere.service';

@Component({
  templateUrl: './comptable-matiere-delete-dialog.component.html',
})
export class ComptableMatiereDeleteDialogComponent {
  comptableMatiere?: IComptableMatiere;

  constructor(protected comptableMatiereService: ComptableMatiereService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.comptableMatiereService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
