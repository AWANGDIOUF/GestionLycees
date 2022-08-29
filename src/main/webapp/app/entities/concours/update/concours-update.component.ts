import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IConcours, Concours } from '../concours.model';
import { ConcoursService } from '../service/concours.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';
import { DirecteurEtudeService } from 'app/entities/directeur-etude/service/directeur-etude.service';

@Component({
  selector: 'jhi-concours-update',
  templateUrl: './concours-update.component.html',
  styleUrls: ['./concours-update.component.scss'],
})
export class ConcoursUpdateComponent implements OnInit {
  isSaving = false;

  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  directeurEtudesSharedCollection: IDirecteurEtude[] = [];

  editForm = this.fb.group({
    id: [],
    nomConcours: [],
    dateOuverture: [],
    dateCloture: [],
    nbreCandidats: [],
    dateConcours: [],
    dateDeliberation: [],
    nbreAdmis: [],
    lyceesTechniques: [],
    directeur: [],
  });

  constructor(
    protected concoursService: ConcoursService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected directeurEtudeService: DirecteurEtudeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ concours }) => {
      this.updateForm(concours);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const concours = this.createFromForm();
    if (concours.id !== undefined) {
      this.subscribeToSaveResponse(this.concoursService.update(concours));
    } else {
      this.subscribeToSaveResponse(this.concoursService.create(concours));
    }
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  trackDirecteurEtudeById(index: number, item: IDirecteurEtude): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConcours>>): void {
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

  protected updateForm(concours: IConcours): void {
    this.editForm.patchValue({
      id: concours.id,
      nomConcours: concours.nomConcours,
      dateOuverture: concours.dateOuverture,
      dateCloture: concours.dateCloture,
      nbreCandidats: concours.nbreCandidats,
      dateConcours: concours.dateConcours,
      dateDeliberation: concours.dateDeliberation,
      nbreAdmis: concours.nbreAdmis,
      lyceesTechniques: concours.lyceesTechniques,
      directeur: concours.directeur,
    });

    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      concours.lyceesTechniques
    );
    this.directeurEtudesSharedCollection = this.directeurEtudeService.addDirecteurEtudeToCollectionIfMissing(
      this.directeurEtudesSharedCollection,
      concours.directeur
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

    this.directeurEtudeService
      .query()
      .pipe(map((res: HttpResponse<IDirecteurEtude[]>) => res.body ?? []))
      .pipe(
        map((directeurEtudes: IDirecteurEtude[]) =>
          this.directeurEtudeService.addDirecteurEtudeToCollectionIfMissing(directeurEtudes, this.editForm.get('directeur')!.value)
        )
      )
      .subscribe((directeurEtudes: IDirecteurEtude[]) => (this.directeurEtudesSharedCollection = directeurEtudes));
  }

  protected createFromForm(): IConcours {
    return {
      ...new Concours(),
      id: this.editForm.get(['id'])!.value,
      nomConcours: this.editForm.get(['nomConcours'])!.value,
      dateOuverture: this.editForm.get(['dateOuverture'])!.value,
      dateCloture: this.editForm.get(['dateCloture'])!.value,
      nbreCandidats: this.editForm.get(['nbreCandidats'])!.value,
      dateConcours: this.editForm.get(['dateConcours'])!.value,
      dateDeliberation: this.editForm.get(['dateDeliberation'])!.value,
      nbreAdmis: this.editForm.get(['nbreAdmis'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      directeur: this.editForm.get(['directeur'])!.value,
    };
  }
}
