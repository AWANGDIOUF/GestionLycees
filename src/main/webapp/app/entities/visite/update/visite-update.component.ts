import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IVisite, Visite } from '../visite.model';
import { VisiteService } from '../service/visite.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { ProviseurService } from 'app/entities/proviseur/service/proviseur.service';

@Component({
  selector: 'jhi-visite-update',
  templateUrl: './visite-update.component.html',
  styleUrls: ['./visite-update.component.scss'],
})
export class VisiteUpdateComponent implements OnInit {
  isSaving = false;

  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  proviseursSharedCollection: IProviseur[] = [];

  editForm = this.fb.group({
    id: [],
    nature: [null, [Validators.required]],
    autreNature: [],
    provenance: [null, [Validators.required]],
    autreProvenance: [],
    objet: [null, [Validators.required]],
    resultats: [null, [Validators.required]],
    periode: [null, [Validators.required]],
    lyceesTechniques: [],
    proviseur: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected visiteService: VisiteService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected proviseurService: ProviseurService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ visite }) => {
      this.updateForm(visite);

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
    const visite = this.createFromForm();
    if (visite.id !== undefined) {
      this.subscribeToSaveResponse(this.visiteService.update(visite));
    } else {
      this.subscribeToSaveResponse(this.visiteService.create(visite));
    }
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  trackProviseurById(index: number, item: IProviseur): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVisite>>): void {
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

  protected updateForm(visite: IVisite): void {
    this.editForm.patchValue({
      id: visite.id,
      nature: visite.nature,
      autreNature: visite.autreNature,
      provenance: visite.provenance,
      autreProvenance: visite.autreProvenance,
      objet: visite.objet,
      resultats: visite.resultats,
      periode: visite.periode,
      lyceesTechniques: visite.lyceesTechniques,
      proviseur: visite.proviseur,
    });

    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      visite.lyceesTechniques
    );
    this.proviseursSharedCollection = this.proviseurService.addProviseurToCollectionIfMissing(
      this.proviseursSharedCollection,
      visite.proviseur
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

    this.proviseurService
      .query()
      .pipe(map((res: HttpResponse<IProviseur[]>) => res.body ?? []))
      .pipe(
        map((proviseurs: IProviseur[]) =>
          this.proviseurService.addProviseurToCollectionIfMissing(proviseurs, this.editForm.get('proviseur')!.value)
        )
      )
      .subscribe((proviseurs: IProviseur[]) => (this.proviseursSharedCollection = proviseurs));
  }

  protected createFromForm(): IVisite {
    return {
      ...new Visite(),
      id: this.editForm.get(['id'])!.value,
      nature: this.editForm.get(['nature'])!.value,
      autreNature: this.editForm.get(['autreNature'])!.value,
      provenance: this.editForm.get(['provenance'])!.value,
      autreProvenance: this.editForm.get(['autreProvenance'])!.value,
      objet: this.editForm.get(['objet'])!.value,
      resultats: this.editForm.get(['resultats'])!.value,
      periode: this.editForm.get(['periode'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      proviseur: this.editForm.get(['proviseur'])!.value,
    };
  }
}
