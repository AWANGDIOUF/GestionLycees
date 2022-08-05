import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IStatus, Status } from '../status.model';
import { StatusService } from '../service/status.service';
import { IApprenant } from 'app/entities/apprenant/apprenant.model';
import { ApprenantService } from 'app/entities/apprenant/service/apprenant.service';
import { ILyceeTechnique } from 'app/entities/lycee-technique/lycee-technique.model';
import { LyceeTechniqueService } from 'app/entities/lycee-technique/service/lycee-technique.service';

@Component({
  selector: 'jhi-status-update',
  templateUrl: './status-update.component.html',
})
export class StatusUpdateComponent implements OnInit {
  isSaving = false;

  apprenantsCollection: IApprenant[] = [];
  lyceeTechniquesSharedCollection: ILyceeTechnique[] = [];

  editForm = this.fb.group({
    id: [],
    status: [],
    apprenant: [],
    lyceeTechnique: [],
  });

  constructor(
    protected statusService: StatusService,
    protected apprenantService: ApprenantService,
    protected lyceeTechniqueService: LyceeTechniqueService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ status }) => {
      this.updateForm(status);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const status = this.createFromForm();
    if (status.id !== undefined) {
      this.subscribeToSaveResponse(this.statusService.update(status));
    } else {
      this.subscribeToSaveResponse(this.statusService.create(status));
    }
  }

  trackApprenantById(index: number, item: IApprenant): number {
    return item.id!;
  }

  trackLyceeTechniqueById(index: number, item: ILyceeTechnique): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStatus>>): void {
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

  protected updateForm(status: IStatus): void {
    this.editForm.patchValue({
      id: status.id,
      status: status.status,
      apprenant: status.apprenant,
      lyceeTechnique: status.lyceeTechnique,
    });

    this.apprenantsCollection = this.apprenantService.addApprenantToCollectionIfMissing(this.apprenantsCollection, status.apprenant);
    this.lyceeTechniquesSharedCollection = this.lyceeTechniqueService.addLyceeTechniqueToCollectionIfMissing(
      this.lyceeTechniquesSharedCollection,
      status.lyceeTechnique
    );
  }

  protected loadRelationshipsOptions(): void {
    this.apprenantService
      .query({ filter: 'status-is-null' })
      .pipe(map((res: HttpResponse<IApprenant[]>) => res.body ?? []))
      .pipe(
        map((apprenants: IApprenant[]) =>
          this.apprenantService.addApprenantToCollectionIfMissing(apprenants, this.editForm.get('apprenant')!.value)
        )
      )
      .subscribe((apprenants: IApprenant[]) => (this.apprenantsCollection = apprenants));

    this.lyceeTechniqueService
      .query()
      .pipe(map((res: HttpResponse<ILyceeTechnique[]>) => res.body ?? []))
      .pipe(
        map((lyceeTechniques: ILyceeTechnique[]) =>
          this.lyceeTechniqueService.addLyceeTechniqueToCollectionIfMissing(lyceeTechniques, this.editForm.get('lyceeTechnique')!.value)
        )
      )
      .subscribe((lyceeTechniques: ILyceeTechnique[]) => (this.lyceeTechniquesSharedCollection = lyceeTechniques));
  }

  protected createFromForm(): IStatus {
    return {
      ...new Status(),
      id: this.editForm.get(['id'])!.value,
      status: this.editForm.get(['status'])!.value,
      apprenant: this.editForm.get(['apprenant'])!.value,
      lyceeTechnique: this.editForm.get(['lyceeTechnique'])!.value,
    };
  }
}
