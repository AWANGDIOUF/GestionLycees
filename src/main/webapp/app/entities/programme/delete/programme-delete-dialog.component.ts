import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProgramme } from '../programme.model';
import { ProgrammeService } from '../service/programme.service';

@Component({
  templateUrl: './programme-delete-dialog.component.html',
})
export class ProgrammeDeleteDialogComponent {
  programme?: IProgramme;

  constructor(protected programmeService: ProgrammeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.programmeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
