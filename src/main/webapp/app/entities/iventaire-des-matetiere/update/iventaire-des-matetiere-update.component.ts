import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IIventaireDesMatetiere, IventaireDesMatetiere } from '../iventaire-des-matetiere.model';
import { IventaireDesMatetiereService } from '../service/iventaire-des-matetiere.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { ComptableMatiereService } from 'app/entities/comptable-matiere/service/comptable-matiere.service';

@Component({
  selector: 'jhi-iventaire-des-matetiere-update',
  templateUrl: './iventaire-des-matetiere-update.component.html',
  styleUrls: ['./iventaire-des-matetiere-update.component.scss'],
})
export class IventaireDesMatetiereUpdateComponent implements OnInit {
  isSaving = false;

  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  comptableMatieresSharedCollection: IComptableMatiere[] = [];

  editForm = this.fb.group({
    id: [],
    group: [],
    designationMembre: [],
    designationMembreContentType: [],
    pvDinventaire: [],
    pvDinventaireContentType: [],
    lyceesTechniques: [],
    comptableMatiere: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected iventaireDesMatetiereService: IventaireDesMatetiereService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected comptableMatiereService: ComptableMatiereService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ iventaireDesMatetiere }) => {
      this.updateForm(iventaireDesMatetiere);

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
    const iventaireDesMatetiere = this.createFromForm();
    if (iventaireDesMatetiere.id !== undefined) {
      this.subscribeToSaveResponse(this.iventaireDesMatetiereService.update(iventaireDesMatetiere));
    } else {
      this.subscribeToSaveResponse(this.iventaireDesMatetiereService.create(iventaireDesMatetiere));
    }
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  trackComptableMatiereById(index: number, item: IComptableMatiere): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIventaireDesMatetiere>>): void {
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

  protected updateForm(iventaireDesMatetiere: IIventaireDesMatetiere): void {
    this.editForm.patchValue({
      id: iventaireDesMatetiere.id,
      group: iventaireDesMatetiere.group,
      designationMembre: iventaireDesMatetiere.designationMembre,
      designationMembreContentType: iventaireDesMatetiere.designationMembreContentType,
      pvDinventaire: iventaireDesMatetiere.pvDinventaire,
      pvDinventaireContentType: iventaireDesMatetiere.pvDinventaireContentType,
      lyceesTechniques: iventaireDesMatetiere.lyceesTechniques,
      comptableMatiere: iventaireDesMatetiere.comptableMatiere,
    });

    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      iventaireDesMatetiere.lyceesTechniques
    );
    this.comptableMatieresSharedCollection = this.comptableMatiereService.addComptableMatiereToCollectionIfMissing(
      this.comptableMatieresSharedCollection,
      iventaireDesMatetiere.comptableMatiere
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

  protected createFromForm(): IIventaireDesMatetiere {
    return {
      ...new IventaireDesMatetiere(),
      id: this.editForm.get(['id'])!.value,
      group: this.editForm.get(['group'])!.value,
      designationMembreContentType: this.editForm.get(['designationMembreContentType'])!.value,
      designationMembre: this.editForm.get(['designationMembre'])!.value,
      pvDinventaireContentType: this.editForm.get(['pvDinventaireContentType'])!.value,
      pvDinventaire: this.editForm.get(['pvDinventaire'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      comptableMatiere: this.editForm.get(['comptableMatiere'])!.value,
    };
  }
}
