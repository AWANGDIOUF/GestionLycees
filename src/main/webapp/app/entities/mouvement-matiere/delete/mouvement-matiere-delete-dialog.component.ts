import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMouvementMatiere } from '../mouvement-matiere.model';
import { MouvementMatiereService } from '../service/mouvement-matiere.service';

@Component({
  templateUrl: './mouvement-matiere-delete-dialog.component.html',
})
export class MouvementMatiereDeleteDialogComponent {
  mouvementMatiere?: IMouvementMatiere;

  constructor(protected mouvementMatiereService: MouvementMatiereService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.mouvementMatiereService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
