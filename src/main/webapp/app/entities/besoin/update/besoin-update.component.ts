import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IBesoin, Besoin } from '../besoin.model';
import { BesoinService } from '../service/besoin.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { ProviseurService } from 'app/entities/proviseur/service/proviseur.service';

@Component({
  selector: 'jhi-besoin-update',
  templateUrl: './besoin-update.component.html',
  styleUrls: ['./besoin-update.component.scss'],
})
export class BesoinUpdateComponent implements OnInit {
  isSaving = false;

  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  proviseursSharedCollection: IProviseur[] = [];

  editForm = this.fb.group({
    id: [],
    type: [null, [Validators.required]],
    autreBesoin: [],
    designation: [],
    etatActuel: [],
    interventionSouhaitee: [null, [Validators.required]],
    justification: [null, [Validators.required]],
    lyceesTechniques: [],
    proviseur: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected besoinService: BesoinService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected proviseurService: ProviseurService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ besoin }) => {
      this.updateForm(besoin);

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
    const besoin = this.createFromForm();
    if (besoin.id !== undefined) {
      this.subscribeToSaveResponse(this.besoinService.update(besoin));
    } else {
      this.subscribeToSaveResponse(this.besoinService.create(besoin));
    }
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  trackProviseurById(index: number, item: IProviseur): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBesoin>>): void {
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

  protected updateForm(besoin: IBesoin): void {
    this.editForm.patchValue({
      id: besoin.id,
      type: besoin.type,
      autreBesoin: besoin.autreBesoin,
      designation: besoin.designation,
      etatActuel: besoin.etatActuel,
      interventionSouhaitee: besoin.interventionSouhaitee,
      justification: besoin.justification,
      lyceesTechniques: besoin.lyceesTechniques,
      proviseur: besoin.proviseur,
    });

    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      besoin.lyceesTechniques
    );
    this.proviseursSharedCollection = this.proviseurService.addProviseurToCollectionIfMissing(
      this.proviseursSharedCollection,
      besoin.proviseur
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

  protected createFromForm(): IBesoin {
    return {
      ...new Besoin(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value,
      autreBesoin: this.editForm.get(['autreBesoin'])!.value,
      designation: this.editForm.get(['designation'])!.value,
      etatActuel: this.editForm.get(['etatActuel'])!.value,
      interventionSouhaitee: this.editForm.get(['interventionSouhaitee'])!.value,
      justification: this.editForm.get(['justification'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      proviseur: this.editForm.get(['proviseur'])!.value,
    };
  }
}
