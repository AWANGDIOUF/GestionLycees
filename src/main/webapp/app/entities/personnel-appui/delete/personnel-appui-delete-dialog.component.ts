import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPersonnelAppui } from '../personnel-appui.model';
import { PersonnelAppuiService } from '../service/personnel-appui.service';

@Component({
  templateUrl: './personnel-appui-delete-dialog.component.html',
})
export class PersonnelAppuiDeleteDialogComponent {
  personnelAppui?: IPersonnelAppui;

  constructor(protected personnelAppuiService: PersonnelAppuiService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.personnelAppuiService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
