import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProbleme, Probleme } from '../probleme.model';
import { ProblemeService } from '../service/probleme.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ILyceeTechnique } from 'app/entities/lycee-technique/lycee-technique.model';
import { LyceeTechniqueService } from 'app/entities/lycee-technique/service/lycee-technique.service';

@Component({
  selector: 'jhi-probleme-update',
  templateUrl: './probleme-update.component.html',
})
export class ProblemeUpdateComponent implements OnInit {
  isSaving = false;

  lyceeTechniquesSharedCollection: ILyceeTechnique[] = [];

  editForm = this.fb.group({
    id: [],
    nature: [],
    description: [],
    solution: [],
    lyceeTechnique: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected problemeService: ProblemeService,
    protected lyceeTechniqueService: LyceeTechniqueService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ probleme }) => {
      this.updateForm(probleme);

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
    const probleme = this.createFromForm();
    if (probleme.id !== undefined) {
      this.subscribeToSaveResponse(this.problemeService.update(probleme));
    } else {
      this.subscribeToSaveResponse(this.problemeService.create(probleme));
    }
  }

  trackLyceeTechniqueById(index: number, item: ILyceeTechnique): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProbleme>>): void {
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

  protected updateForm(probleme: IProbleme): void {
    this.editForm.patchValue({
      id: probleme.id,
      nature: probleme.nature,
      description: probleme.description,
      solution: probleme.solution,
      lyceeTechnique: probleme.lyceeTechnique,
    });

    this.lyceeTechniquesSharedCollection = this.lyceeTechniqueService.addLyceeTechniqueToCollectionIfMissing(
      this.lyceeTechniquesSharedCollection,
      probleme.lyceeTechnique
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

  protected createFromForm(): IProbleme {
    return {
      ...new Probleme(),
      id: this.editForm.get(['id'])!.value,
      nature: this.editForm.get(['nature'])!.value,
      description: this.editForm.get(['description'])!.value,
      solution: this.editForm.get(['solution'])!.value,
      lyceeTechnique: this.editForm.get(['lyceeTechnique'])!.value,
    };
  }
}
