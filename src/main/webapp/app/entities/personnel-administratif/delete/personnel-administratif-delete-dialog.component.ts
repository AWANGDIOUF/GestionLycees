import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPersonnelAdministratif } from '../personnel-administratif.model';
import { PersonnelAdministratifService } from '../service/personnel-administratif.service';

@Component({
  templateUrl: './personnel-administratif-delete-dialog.component.html',
})
export class PersonnelAdministratifDeleteDialogComponent {
  personnelAdministratif?: IPersonnelAdministratif;

  constructor(protected personnelAdministratifService: PersonnelAdministratifService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.personnelAdministratifService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
