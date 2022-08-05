import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRecette } from '../recette.model';
import { RecetteService } from '../service/recette.service';

@Component({
  templateUrl: './recette-delete-dialog.component.html',
})
export class RecetteDeleteDialogComponent {
  recette?: IRecette;

  constructor(protected recetteService: RecetteService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.recetteService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
