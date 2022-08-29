import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IRecette, Recette } from '../recette.model';
import { RecetteService } from '../service/recette.service';
import { IDepense } from 'app/entities/depense/depense.model';
import { DepenseService } from 'app/entities/depense/service/depense.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IComptableFinancier } from 'app/entities/comptable-financier/comptable-financier.model';
import { ComptableFinancierService } from 'app/entities/comptable-financier/service/comptable-financier.service';

@Component({
  selector: 'jhi-recette-update',
  templateUrl: './recette-update.component.html',
  styleUrls: ['./recette-update.component.scss'],
})
export class RecetteUpdateComponent implements OnInit {
  isSaving = false;

  depensesSharedCollection: IDepense[] = [];
  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  comptableFinanciersSharedCollection: IComptableFinancier[] = [];

  editForm = this.fb.group({
    id: [],
    type: [null, [Validators.required]],
    autreRecette: [],
    typeRessource: [],
    montant: [],
    date: [null, [Validators.required]],
    depense: [],
    lyceesTechniques: [],
    comptableFinancier: [],
  });

  constructor(
    protected recetteService: RecetteService,
    protected depenseService: DepenseService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected comptableFinancierService: ComptableFinancierService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recette }) => {
      this.updateForm(recette);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const recette = this.createFromForm();
    if (recette.id !== undefined) {
      this.subscribeToSaveResponse(this.recetteService.update(recette));
    } else {
      this.subscribeToSaveResponse(this.recetteService.create(recette));
    }
  }

  trackDepenseById(index: number, item: IDepense): number {
    return item.id!;
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  trackComptableFinancierById(index: number, item: IComptableFinancier): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecette>>): void {
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

  protected updateForm(recette: IRecette): void {
    this.editForm.patchValue({
      id: recette.id,
      type: recette.type,
      autreRecette: recette.autreRecette,
      typeRessource: recette.typeRessource,
      montant: recette.montant,
      date: recette.date,
      depense: recette.depense,
      lyceesTechniques: recette.lyceesTechniques,
      comptableFinancier: recette.comptableFinancier,
    });

    this.depensesSharedCollection = this.depenseService.addDepenseToCollectionIfMissing(this.depensesSharedCollection, recette.depense);
    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      recette.lyceesTechniques
    );
    this.comptableFinanciersSharedCollection = this.comptableFinancierService.addComptableFinancierToCollectionIfMissing(
      this.comptableFinanciersSharedCollection,
      recette.comptableFinancier
    );
  }

  protected loadRelationshipsOptions(): void {
    this.depenseService
      .query()
      .pipe(map((res: HttpResponse<IDepense[]>) => res.body ?? []))
      .pipe(
        map((depenses: IDepense[]) => this.depenseService.addDepenseToCollectionIfMissing(depenses, this.editForm.get('depense')!.value))
      )
      .subscribe((depenses: IDepense[]) => (this.depensesSharedCollection = depenses));

    this.lyceesTechniquesService
      .query()
      .pipe(map((res: HttpResponse<ILyceesTechniques[]>) => res.body ?? []))
      .pipe(
        map((lyceesTechniques: ILyceesTechniques[]) =>
          this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
            lyceesTechniques,
            this.editForm.get('lyceesTechniques')!.value
          )
        )
      )
      .subscribe((lyceesTechniques: ILyceesTechniques[]) => (this.lyceesTechniquesSharedCollection = lyceesTechniques));

    this.comptableFinancierService
      .query()
      .pipe(map((res: HttpResponse<IComptableFinancier[]>) => res.body ?? []))
      .pipe(
        map((comptableFinanciers: IComptableFinancier[]) =>
          this.comptableFinancierService.addComptableFinancierToCollectionIfMissing(
            comptableFinanciers,
            this.editForm.get('comptableFinancier')!.value
          )
        )
      )
      .subscribe((comptableFinanciers: IComptableFinancier[]) => (this.comptableFinanciersSharedCollection = comptableFinanciers));
  }

  protected createFromForm(): IRecette {
    return {
      ...new Recette(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value,
      autreRecette: this.editForm.get(['autreRecette'])!.value,
      typeRessource: this.editForm.get(['typeRessource'])!.value,
      montant: this.editForm.get(['montant'])!.value,
      date: this.editForm.get(['date'])!.value,
      depense: this.editForm.get(['depense'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      comptableFinancier: this.editForm.get(['comptableFinancier'])!.value,
    };
  }
}
