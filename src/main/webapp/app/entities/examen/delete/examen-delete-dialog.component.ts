import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IExamen } from '../examen.model';
import { ExamenService } from '../service/examen.service';

@Component({
  templateUrl: './examen-delete-dialog.component.html',
})
export class ExamenDeleteDialogComponent {
  examen?: IExamen;

  constructor(protected examenService: ExamenService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.examenService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
