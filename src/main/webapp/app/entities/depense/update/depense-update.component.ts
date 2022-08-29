import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDepense, Depense } from '../depense.model';
import { DepenseService } from '../service/depense.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IComptableFinancier } from 'app/entities/comptable-financier/comptable-financier.model';
import { ComptableFinancierService } from 'app/entities/comptable-financier/service/comptable-financier.service';

@Component({
  selector: 'jhi-depense-update',
  templateUrl: './depense-update.component.html',
  styleUrls: ['./depense-update.component.scss'],
})
export class DepenseUpdateComponent implements OnInit {
  isSaving = false;

  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  comptableFinanciersSharedCollection: IComptableFinancier[] = [];

  editForm = this.fb.group({
    id: [],
    typeDepense: [null, [Validators.required]],
    autreDepense: [],
    description: [null, [Validators.required]],
    montantDepense: [null, [Validators.required]],
    lyceesTechniques: [],
    comptableFinancier: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected depenseService: DepenseService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected comptableFinancierService: ComptableFinancierService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ depense }) => {
      this.updateForm(depense);

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('lyceeTechApp.error', { message: err.message })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const depense = this.createFromForm();
    if (depense.id !== undefined) {
      this.subscribeToSaveResponse(this.depenseService.update(depense));
    } else {
      this.subscribeToSaveResponse(this.depenseService.create(depense));
    }
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  trackComptableFinancierById(index: number, item: IComptableFinancier): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepense>>): void {
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

  protected updateForm(depense: IDepense): void {
    this.editForm.patchValue({
      id: depense.id,
      typeDepense: depense.typeDepense,
      autreDepense: depense.autreDepense,
      description: depense.description,
      montantDepense: depense.montantDepense,
      lyceesTechniques: depense.lyceesTechniques,
      comptableFinancier: depense.comptableFinancier,
    });

    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      depense.lyceesTechniques
    );
    this.comptableFinanciersSharedCollection = this.comptableFinancierService.addComptableFinancierToCollectionIfMissing(
      this.comptableFinanciersSharedCollection,
      depense.comptableFinancier
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

  protected createFromForm(): IDepense {
    return {
      ...new Depense(),
      id: this.editForm.get(['id'])!.value,
      typeDepense: this.editForm.get(['typeDepense'])!.value,
      autreDepense: this.editForm.get(['autreDepense'])!.value,
      description: this.editForm.get(['description'])!.value,
      montantDepense: this.editForm.get(['montantDepense'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      comptableFinancier: this.editForm.get(['comptableFinancier'])!.value,
    };
  }
}
