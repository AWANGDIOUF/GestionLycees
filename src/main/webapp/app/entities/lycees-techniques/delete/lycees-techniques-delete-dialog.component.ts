import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILyceesTechniques } from '../lycees-techniques.model';
import { LyceesTechniquesService } from '../service/lycees-techniques.service';

@Component({
  templateUrl: './lycees-techniques-delete-dialog.component.html',
})
export class LyceesTechniquesDeleteDialogComponent {
  lyceesTechniques?: ILyceesTechniques;

  constructor(protected lyceesTechniquesService: LyceesTechniquesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.lyceesTechniquesService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
