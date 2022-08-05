import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IBon, Bon } from '../bon.model';
import { BonService } from '../service/bon.service';
import { IMateriel } from 'app/entities/materiel/materiel.model';
import { MaterielService } from 'app/entities/materiel/service/materiel.service';

@Component({
  selector: 'jhi-bon-update',
  templateUrl: './bon-update.component.html',
})
export class BonUpdateComponent implements OnInit {
  isSaving = false;

  materielsSharedCollection: IMateriel[] = [];

  editForm = this.fb.group({
    id: [],
    typeBon: [],
    beneficiaire: [],
    fonction: [],
    fournisseur: [],
    numeroFacture: [],
    date: [],
    materiel: [],
  });

  constructor(
    protected bonService: BonService,
    protected materielService: MaterielService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bon }) => {
      this.updateForm(bon);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bon = this.createFromForm();
    if (bon.id !== undefined) {
      this.subscribeToSaveResponse(this.bonService.update(bon));
    } else {
      this.subscribeToSaveResponse(this.bonService.create(bon));
    }
  }

  trackMaterielById(index: number, item: IMateriel): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBon>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(bon: IBon): void {
    this.editForm.patchValue({
      id: bon.id,
      typeBon: bon.typeBon,
      beneficiaire: bon.beneficiaire,
      fonction: bon.fonction,
      fournisseur: bon.fournisseur,
      numeroFacture: bon.numeroFacture,
      date: bon.date,
      materiel: bon.materiel,
    });

    this.materielsSharedCollection = this.materielService.addMaterielToCollectionIfMissing(this.materielsSharedCollection, bon.materiel);
  }

  protected loadRelationshipsOptions(): void {
    this.materielService
      .query()
      .pipe(map((res: HttpResponse<IMateriel[]>) => res.body ?? []))
      .pipe(
        map((materiels: IMateriel[]) =>
          this.materielService.addMaterielToCollectionIfMissing(materiels, this.editForm.get('materiel')!.value)
        )
      )
      .subscribe((materiels: IMateriel[]) => (this.materielsSharedCollection = materiels));
  }

  protected createFromForm(): IBon {
    return {
      ...new Bon(),
      id: this.editForm.get(['id'])!.value,
      typeBon: this.editForm.get(['typeBon'])!.value,
      beneficiaire: this.editForm.get(['beneficiaire'])!.value,
      fonction: this.editForm.get(['fonction'])!.value,
      fournisseur: this.editForm.get(['fournisseur'])!.value,
      numeroFacture: this.editForm.get(['numeroFacture'])!.value,
      date: this.editForm.get(['date'])!.value,
      materiel: this.editForm.get(['materiel'])!.value,
    };
  }
}
