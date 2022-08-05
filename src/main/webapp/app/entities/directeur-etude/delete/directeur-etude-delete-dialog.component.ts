import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDirecteurEtude } from '../directeur-etude.model';
import { DirecteurEtudeService } from '../service/directeur-etude.service';

@Component({
  templateUrl: './directeur-etude-delete-dialog.component.html',
})
export class DirecteurEtudeDeleteDialogComponent {
  directeurEtude?: IDirecteurEtude;

  constructor(protected directeurEtudeService: DirecteurEtudeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.directeurEtudeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
