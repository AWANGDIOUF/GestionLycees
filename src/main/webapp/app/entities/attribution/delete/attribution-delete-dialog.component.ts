import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAttribution } from '../attribution.model';
import { AttributionService } from '../service/attribution.service';

@Component({
  templateUrl: './attribution-delete-dialog.component.html',
})
export class AttributionDeleteDialogComponent {
  attribution?: IAttribution;

  constructor(protected attributionService: AttributionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.attributionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
