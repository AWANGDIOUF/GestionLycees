import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IAttribution, Attribution } from '../attribution.model';
import { AttributionService } from '../service/attribution.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { ComptableMatiereService } from 'app/entities/comptable-matiere/service/comptable-matiere.service';
import { IReception } from 'app/entities/reception/reception.model';
import { ReceptionService } from 'app/entities/reception/service/reception.service';

@Component({
  selector: 'jhi-attribution-update',
  templateUrl: './attribution-update.component.html',
})
export class AttributionUpdateComponent implements OnInit {
  isSaving = false;

  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  comptableMatieresSharedCollection: IComptableMatiere[] = [];
  receptionsSharedCollection: IReception[] = [];

  editForm = this.fb.group({
    id: [],
    beneficiaire: [null, [Validators.required]],
    fonction: [null, [Validators.required]],
    date: [null, [Validators.required]],
    lyceesTechniques: [],
    comptableMatiere: [],
    reception: [],
  });

  constructor(
    protected attributionService: AttributionService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected comptableMatiereService: ComptableMatiereService,
    protected receptionService: ReceptionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ attribution }) => {
      this.updateForm(attribution);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const attribution = this.createFromForm();
    if (attribution.id !== undefined) {
      this.subscribeToSaveResponse(this.attributionService.update(attribution));
    } else {
      this.subscribeToSaveResponse(this.attributionService.create(attribution));
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttribution>>): void {
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

  protected updateForm(attribution: IAttribution): void {
    this.editForm.patchValue({
      id: attribution.id,
      beneficiaire: attribution.beneficiaire,
      fonction: attribution.fonction,
      date: attribution.date,
      lyceesTechniques: attribution.lyceesTechniques,
      comptableMatiere: attribution.comptableMatiere,
      reception: attribution.reception,
    });

    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      attribution.lyceesTechniques
    );
    this.comptableMatieresSharedCollection = this.comptableMatiereService.addComptableMatiereToCollectionIfMissing(
      this.comptableMatieresSharedCollection,
      attribution.comptableMatiere
    );
    this.receptionsSharedCollection = this.receptionService.addReceptionToCollectionIfMissing(
      this.receptionsSharedCollection,
      attribution.reception
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

  protected createFromForm(): IAttribution {
    return {
      ...new Attribution(),
      id: this.editForm.get(['id'])!.value,
      beneficiaire: this.editForm.get(['beneficiaire'])!.value,
      fonction: this.editForm.get(['fonction'])!.value,
      date: this.editForm.get(['date'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      comptableMatiere: this.editForm.get(['comptableMatiere'])!.value,
      reception: this.editForm.get(['reception'])!.value,
    };
  }
}
