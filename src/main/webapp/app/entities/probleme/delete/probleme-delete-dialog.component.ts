import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProbleme } from '../probleme.model';
import { ProblemeService } from '../service/probleme.service';

@Component({
  templateUrl: './probleme-delete-dialog.component.html',
})
export class ProblemeDeleteDialogComponent {
  probleme?: IProbleme;

  constructor(protected problemeService: ProblemeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.problemeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
