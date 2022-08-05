import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IOrgane, Organe } from '../organe.model';
import { OrganeService } from '../service/organe.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ILyceeTechnique } from 'app/entities/lycee-technique/lycee-technique.model';
import { LyceeTechniqueService } from 'app/entities/lycee-technique/service/lycee-technique.service';

@Component({
  selector: 'jhi-organe-update',
  templateUrl: './organe-update.component.html',
})
export class OrganeUpdateComponent implements OnInit {
  isSaving = false;

  lyceeTechniquesSharedCollection: ILyceeTechnique[] = [];

  editForm = this.fb.group({
    id: [],
    type: [],
    fonctionnel: [],
    description: [],
    lyceeTechnique: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected organeService: OrganeService,
    protected lyceeTechniqueService: LyceeTechniqueService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ organe }) => {
      this.updateForm(organe);

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
    const organe = this.createFromForm();
    if (organe.id !== undefined) {
      this.subscribeToSaveResponse(this.organeService.update(organe));
    } else {
      this.subscribeToSaveResponse(this.organeService.create(organe));
    }
  }

  trackLyceeTechniqueById(index: number, item: ILyceeTechnique): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrgane>>): void {
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

  protected updateForm(organe: IOrgane): void {
    this.editForm.patchValue({
      id: organe.id,
      type: organe.type,
      fonctionnel: organe.fonctionnel,
      description: organe.description,
      lyceeTechnique: organe.lyceeTechnique,
    });

    this.lyceeTechniquesSharedCollection = this.lyceeTechniqueService.addLyceeTechniqueToCollectionIfMissing(
      this.lyceeTechniquesSharedCollection,
      organe.lyceeTechnique
    );
  }

  protected loadRelationshipsOptions(): void {
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

  protected createFromForm(): IOrgane {
    return {
      ...new Organe(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value,
      fonctionnel: this.editForm.get(['fonctionnel'])!.value,
      description: this.editForm.get(['description'])!.value,
      lyceeTechnique: this.editForm.get(['lyceeTechnique'])!.value,
    };
  }
}