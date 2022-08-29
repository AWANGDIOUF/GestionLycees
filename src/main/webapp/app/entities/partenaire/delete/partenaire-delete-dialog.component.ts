import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPartenaire } from '../partenaire.model';
import { PartenaireService } from '../service/partenaire.service';

@Component({
  templateUrl: './partenaire-delete-dialog.component.html',
})
export class PartenaireDeleteDialogComponent {
  partenaire?: IPartenaire;

  constructor(protected partenaireService: PartenaireService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.partenaireService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
