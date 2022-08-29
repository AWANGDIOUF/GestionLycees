import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { INiveauxEtudes, NiveauxEtudes } from '../niveaux-etudes.model';
import { NiveauxEtudesService } from '../service/niveaux-etudes.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';
import { DirecteurEtudeService } from 'app/entities/directeur-etude/service/directeur-etude.service';
import { ISerie } from 'app/entities/serie/serie.model';
import { SerieService } from 'app/entities/serie/service/serie.service';

@Component({
  selector: 'jhi-niveaux-etudes-update',
  templateUrl: './niveaux-etudes-update.component.html',
  styleUrls: ['./niveaux-etudes-update.component.scss'], 
})
export class NiveauxEtudesUpdateComponent implements OnInit {
  isSaving = false;

  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  directeurEtudesSharedCollection: IDirecteurEtude[] = [];
  seriesSharedCollection: ISerie[] = [];

  editForm = this.fb.group({
    id: [],
    nomNiveau: [null, [Validators.required]],
    lyceesTechniques: [],
    directeur: [],
    serie: [],
  });

  constructor(
    protected niveauxEtudesService: NiveauxEtudesService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected directeurEtudeService: DirecteurEtudeService,
    protected serieService: SerieService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ niveauxEtudes }) => {
      this.updateForm(niveauxEtudes);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const niveauxEtudes = this.createFromForm();
    if (niveauxEtudes.id !== undefined) {
      this.subscribeToSaveResponse(this.niveauxEtudesService.update(niveauxEtudes));
    } else {
      this.subscribeToSaveResponse(this.niveauxEtudesService.create(niveauxEtudes));
    }
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  trackDirecteurEtudeById(index: number, item: IDirecteurEtude): number {
    return item.id!;
  }

  trackSerieById(index: number, item: ISerie): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INiveauxEtudes>>): void {
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

  protected updateForm(niveauxEtudes: INiveauxEtudes): void {
    this.editForm.patchValue({
      id: niveauxEtudes.id,
      nomNiveau: niveauxEtudes.nomNiveau,
      lyceesTechniques: niveauxEtudes.lyceesTechniques,
      directeur: niveauxEtudes.directeur,
      serie: niveauxEtudes.serie,
    });

    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      niveauxEtudes.lyceesTechniques
    );
    this.directeurEtudesSharedCollection = this.directeurEtudeService.addDirecteurEtudeToCollectionIfMissing(
      this.directeurEtudesSharedCollection,
      niveauxEtudes.directeur
    );
    this.seriesSharedCollection = this.serieService.addSerieToCollectionIfMissing(this.seriesSharedCollection, niveauxEtudes.serie);
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

    this.serieService
      .query()
      .pipe(map((res: HttpResponse<ISerie[]>) => res.body ?? []))
      .pipe(map((series: ISerie[]) => this.serieService.addSerieToCollectionIfMissing(series, this.editForm.get('serie')!.value)))
      .subscribe((series: ISerie[]) => (this.seriesSharedCollection = series));
  }

  protected createFromForm(): INiveauxEtudes {
    return {
      ...new NiveauxEtudes(),
      id: this.editForm.get(['id'])!.value,
      nomNiveau: this.editForm.get(['nomNiveau'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      directeur: this.editForm.get(['directeur'])!.value,
      serie: this.editForm.get(['serie'])!.value,
    };
  }
}
