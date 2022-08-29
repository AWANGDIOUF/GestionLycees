import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IReformeMatiere, ReformeMatiere } from '../reforme-matiere.model';
import { ReformeMatiereService } from '../service/reforme-matiere.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { ComptableMatiereService } from 'app/entities/comptable-matiere/service/comptable-matiere.service';

@Component({
  selector: 'jhi-reforme-matiere-update',
  templateUrl: './reforme-matiere-update.component.html',
  styleUrls: ['./reforme-matiere-update.component.scss'],
})
export class ReformeMatiereUpdateComponent implements OnInit {
  isSaving = false;

  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  comptableMatieresSharedCollection: IComptableMatiere[] = [];

  editForm = this.fb.group({
    id: [],
    group: [],
    designationDesmembre: [],
    designationDesmembreContentType: [],
    pvReforme: [],
    pvReformeContentType: [],
    sortieDefinitive: [],
    sortieDefinitiveContentType: [],
    certificatAdministratif: [],
    certificatAdministratifContentType: [],
    lyceesTechniques: [],
    comptableMatiere: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected reformeMatiereService: ReformeMatiereService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected comptableMatiereService: ComptableMatiereService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reformeMatiere }) => {
      this.updateForm(reformeMatiere);

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
    const reformeMatiere = this.createFromForm();
    if (reformeMatiere.id !== undefined) {
      this.subscribeToSaveResponse(this.reformeMatiereService.update(reformeMatiere));
    } else {
      this.subscribeToSaveResponse(this.reformeMatiereService.create(reformeMatiere));
    }
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  trackComptableMatiereById(index: number, item: IComptableMatiere): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReformeMatiere>>): void {
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

  protected updateForm(reformeMatiere: IReformeMatiere): void {
    this.editForm.patchValue({
      id: reformeMatiere.id,
      group: reformeMatiere.group,
      designationDesmembre: reformeMatiere.designationDesmembre,
      designationDesmembreContentType: reformeMatiere.designationDesmembreContentType,
      pvReforme: reformeMatiere.pvReforme,
      pvReformeContentType: reformeMatiere.pvReformeContentType,
      sortieDefinitive: reformeMatiere.sortieDefinitive,
      sortieDefinitiveContentType: reformeMatiere.sortieDefinitiveContentType,
      certificatAdministratif: reformeMatiere.certificatAdministratif,
      certificatAdministratifContentType: reformeMatiere.certificatAdministratifContentType,
      lyceesTechniques: reformeMatiere.lyceesTechniques,
      comptableMatiere: reformeMatiere.comptableMatiere,
    });

    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      reformeMatiere.lyceesTechniques
    );
    this.comptableMatieresSharedCollection = this.comptableMatiereService.addComptableMatiereToCollectionIfMissing(
      this.comptableMatieresSharedCollection,
      reformeMatiere.comptableMatiere
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

  protected createFromForm(): IReformeMatiere {
    return {
      ...new ReformeMatiere(),
      id: this.editForm.get(['id'])!.value,
      group: this.editForm.get(['group'])!.value,
      designationDesmembreContentType: this.editForm.get(['designationDesmembreContentType'])!.value,
      designationDesmembre: this.editForm.get(['designationDesmembre'])!.value,
      pvReformeContentType: this.editForm.get(['pvReformeContentType'])!.value,
      pvReforme: this.editForm.get(['pvReforme'])!.value,
      sortieDefinitiveContentType: this.editForm.get(['sortieDefinitiveContentType'])!.value,
      sortieDefinitive: this.editForm.get(['sortieDefinitive'])!.value,
      certificatAdministratifContentType: this.editForm.get(['certificatAdministratifContentType'])!.value,
      certificatAdministratif: this.editForm.get(['certificatAdministratif'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      comptableMatiere: this.editForm.get(['comptableMatiere'])!.value,
    };
  }
}
