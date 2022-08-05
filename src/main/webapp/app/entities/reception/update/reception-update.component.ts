import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IReception, Reception } from '../reception.model';
import { ReceptionService } from '../service/reception.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { ComptableMatiereService } from 'app/entities/comptable-matiere/service/comptable-matiere.service';

@Component({
  selector: 'jhi-reception-update',
  templateUrl: './reception-update.component.html',
  styleUrls: ['./reception-update.component.scss'],
})
export class ReceptionUpdateComponent implements OnInit {
  isSaving = false;

  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  comptableMatieresSharedCollection: IComptableMatiere[] = [];

  editForm = this.fb.group({
    id: [],
    libelleMateriel: [null, [Validators.required]],
    typeGroup: [null, [Validators.required]],
    provenance: [null, [Validators.required]],
    fournisseur: [null, [Validators.required]],
    date: [null, [Validators.required]],
    lyceesTechniques: [],
    comptableMatiere: [],
  });

  constructor(
    protected receptionService: ReceptionService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected comptableMatiereService: ComptableMatiereService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reception }) => {
      this.updateForm(reception);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reception = this.createFromForm();
    if (reception.id !== undefined) {
      this.subscribeToSaveResponse(this.receptionService.update(reception));
    } else {
      this.subscribeToSaveResponse(this.receptionService.create(reception));
    }
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  trackComptableMatiereById(index: number, item: IComptableMatiere): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReception>>): void {
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

  protected updateForm(reception: IReception): void {
    this.editForm.patchValue({
      id: reception.id,
      libelleMateriel: reception.libelleMateriel,
      typeGroup: reception.typeGroup,
      provenance: reception.provenance,
      fournisseur: reception.fournisseur,
      date: reception.date,
      lyceesTechniques: reception.lyceesTechniques,
      comptableMatiere: reception.comptableMatiere,
    });

    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      reception.lyceesTechniques
    );
    this.comptableMatieresSharedCollection = this.comptableMatiereService.addComptableMatiereToCollectionIfMissing(
      this.comptableMatieresSharedCollection,
      reception.comptableMatiere
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
  }

  protected createFromForm(): IReception {
    return {
      ...new Reception(),
      id: this.editForm.get(['id'])!.value,
      libelleMateriel: this.editForm.get(['libelleMateriel'])!.value,
      typeGroup: this.editForm.get(['typeGroup'])!.value,
      provenance: this.editForm.get(['provenance'])!.value,
      fournisseur: this.editForm.get(['fournisseur'])!.value,
      date: this.editForm.get(['date'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      comptableMatiere: this.editForm.get(['comptableMatiere'])!.value,
    };
  }
}
