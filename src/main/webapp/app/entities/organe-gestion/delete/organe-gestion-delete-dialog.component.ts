import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrganeGestion } from '../organe-gestion.model';
import { OrganeGestionService } from '../service/organe-gestion.service';

@Component({
  templateUrl: './organe-gestion-delete-dialog.component.html',
})
export class OrganeGestionDeleteDialogComponent {
  organeGestion?: IOrganeGestion;

  constructor(protected organeGestionService: OrganeGestionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.organeGestionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
