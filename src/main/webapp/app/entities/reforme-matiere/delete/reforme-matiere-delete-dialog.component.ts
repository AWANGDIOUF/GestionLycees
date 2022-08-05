import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IReformeMatiere } from '../reforme-matiere.model';
import { ReformeMatiereService } from '../service/reforme-matiere.service';

@Component({
  templateUrl: './reforme-matiere-delete-dialog.component.html',
})
export class ReformeMatiereDeleteDialogComponent {
  reformeMatiere?: IReformeMatiere;

  constructor(protected reformeMatiereService: ReformeMatiereService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.reformeMatiereService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
