import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILyceeTechnique } from '../lycee-technique.model';
import { LyceeTechniqueService } from '../service/lycee-technique.service';

@Component({
  templateUrl: './lycee-technique-delete-dialog.component.html',
})
export class LyceeTechniqueDeleteDialogComponent {
  lyceeTechnique?: ILyceeTechnique;

  constructor(protected lyceeTechniqueService: LyceeTechniqueService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.lyceeTechniqueService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
