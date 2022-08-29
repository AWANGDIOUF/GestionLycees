import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IMateriel, Materiel } from '../materiel.model';
import { MaterielService } from '../service/materiel.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { ComptableMatiereService } from 'app/entities/comptable-matiere/service/comptable-matiere.service';
import { IReception } from 'app/entities/reception/reception.model';
import { ReceptionService } from 'app/entities/reception/service/reception.service';

@Component({
  selector: 'jhi-materiel-update',
  templateUrl: './materiel-update.component.html',
  styleUrls: ['./materiel-update.component.scss'],
})
export class MaterielUpdateComponent implements OnInit {
  isSaving = false;

  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  comptableMatieresSharedCollection: IComptableMatiere[] = [];
  receptionsSharedCollection: IReception[] = [];

  editForm = this.fb.group({
    id: [],
    categorieMateriel: [null, [Validators.required]],
    etatMateriel: [null, [Validators.required]],
    lyceesTechniques: [],
    comptableMatiere: [],
    reception: [],
  });

  constructor(
    protected materielService: MaterielService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected comptableMatiereService: ComptableMatiereService,
    protected receptionService: ReceptionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ materiel }) => {
      this.updateForm(materiel);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const materiel = this.createFromForm();
    if (materiel.id !== undefined) {
      this.subscribeToSaveResponse(this.materielService.update(materiel));
    } else {
      this.subscribeToSaveResponse(this.materielService.create(materiel));
    }
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  trackComptableMatiereById(index: number, item: IComptableMatiere): number {
    return item.id!;
  }

  trackReceptionById(index: number, item: IReception): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMateriel>>): void {
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

  protected updateForm(materiel: IMateriel): void {
    this.editForm.patchValue({
      id: materiel.id,
      categorieMateriel: materiel.categorieMateriel,
      etatMateriel: materiel.etatMateriel,
      lyceesTechniques: materiel.lyceesTechniques,
      comptableMatiere: materiel.comptableMatiere,
      reception: materiel.reception,
    });

    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      materiel.lyceesTechniques
    );
    this.comptableMatieresSharedCollection = this.comptableMatiereService.addComptableMatiereToCollectionIfMissing(
      this.comptableMatieresSharedCollection,
      materiel.comptableMatiere
    );
    this.receptionsSharedCollection = this.receptionService.addReceptionToCollectionIfMissing(
      this.receptionsSharedCollection,
      materiel.reception
    );
  }

  protected loadRelationshipsOptions(): void {
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

    this.comptableMatiereService
      .query()
      .pipe(map((res: HttpResponse<IComptableMatiere[]>) => res.body ?? []))
      .pipe(
        map((comptableMatieres: IComptableMatiere[]) =>
          this.comptableMatiereService.addComptableMatiereToCollectionIfMissing(
            comptableMatieres,
            this.editForm.get('comptableMatiere')!.value
          )
        )
      )
      .subscribe((comptableMatieres: IComptableMatiere[]) => (this.comptableMatieresSharedCollection = comptableMatieres));

    this.receptionService
      .query()
      .pipe(map((res: HttpResponse<IReception[]>) => res.body ?? []))
      .pipe(
        map((receptions: IReception[]) =>
          this.receptionService.addReceptionToCollectionIfMissing(receptions, this.editForm.get('reception')!.value)
        )
      )
      .subscribe((receptions: IReception[]) => (this.receptionsSharedCollection = receptions));
  }

  protected createFromForm(): IMateriel {
    return {
      ...new Materiel(),
      id: this.editForm.get(['id'])!.value,
      categorieMateriel: this.editForm.get(['categorieMateriel'])!.value,
      etatMateriel: this.editForm.get(['etatMateriel'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      comptableMatiere: this.editForm.get(['comptableMatiere'])!.value,
      reception: this.editForm.get(['reception'])!.value,
    };
  }
}
