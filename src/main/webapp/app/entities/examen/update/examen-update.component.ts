import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IExamen, Examen } from '../examen.model';
import { ExamenService } from '../service/examen.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';
import { DirecteurEtudeService } from 'app/entities/directeur-etude/service/directeur-etude.service';
import { ISerie } from 'app/entities/serie/serie.model';
import { SerieService } from 'app/entities/serie/service/serie.service';
import { IFiliere } from 'app/entities/filiere/filiere.model';
import { FiliereService } from 'app/entities/filiere/service/filiere.service';
import { IApprenant } from 'app/entities/apprenant/apprenant.model';
import { ApprenantService } from 'app/entities/apprenant/service/apprenant.service';

@Component({
  selector: 'jhi-examen-update',
  templateUrl: './examen-update.component.html',
  styleUrls: ['./examen-update.component.scss'],
})
export class ExamenUpdateComponent implements OnInit {
  isSaving = false;

  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  directeurEtudesSharedCollection: IDirecteurEtude[] = [];
  seriesSharedCollection: ISerie[] = [];
  filieresSharedCollection: IFiliere[] = [];
  apprenantsSharedCollection: IApprenant[] = [];

  editForm = this.fb.group({
    id: [],
    type: [null, [Validators.required]],
    autres: [],
    option: [],
    status: [],
    lyceesTechniques: [],
    directeur: [],
    serie: [],
    filiere: [],
    apprenant: [],
  });

  constructor(
    protected examenService: ExamenService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected directeurEtudeService: DirecteurEtudeService,
    protected serieService: SerieService,
    protected filiereService: FiliereService,
    protected apprenantService: ApprenantService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ examen }) => {
      this.updateForm(examen);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const examen = this.createFromForm();
    if (examen.id !== undefined) {
      this.subscribeToSaveResponse(this.examenService.update(examen));
    } else {
      this.subscribeToSaveResponse(this.examenService.create(examen));
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

  trackFiliereById(index: number, item: IFiliere): number {
    return item.id!;
  }

  trackApprenantById(index: number, item: IApprenant): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExamen>>): void {
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

  protected updateForm(examen: IExamen): void {
    this.editForm.patchValue({
      id: examen.id,
      type: examen.type,
      autres: examen.autres,
      option: examen.option,
      status: examen.status,
      lyceesTechniques: examen.lyceesTechniques,
      directeur: examen.directeur,
      serie: examen.serie,
      filiere: examen.filiere,
      apprenant: examen.apprenant,
    });

    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      examen.lyceesTechniques
    );
    this.directeurEtudesSharedCollection = this.directeurEtudeService.addDirecteurEtudeToCollectionIfMissing(
      this.directeurEtudesSharedCollection,
      examen.directeur
    );
    this.seriesSharedCollection = this.serieService.addSerieToCollectionIfMissing(this.seriesSharedCollection, examen.serie);
    this.filieresSharedCollection = this.filiereService.addFiliereToCollectionIfMissing(this.filieresSharedCollection, examen.filiere);
    this.apprenantsSharedCollection = this.apprenantService.addApprenantToCollectionIfMissing(
      this.apprenantsSharedCollection,
      examen.apprenant
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

    this.serieService
      .query()
      .pipe(map((res: HttpResponse<ISerie[]>) => res.body ?? []))
      .pipe(map((series: ISerie[]) => this.serieService.addSerieToCollectionIfMissing(series, this.editForm.get('serie')!.value)))
      .subscribe((series: ISerie[]) => (this.seriesSharedCollection = series));

    this.filiereService
      .query()
      .pipe(map((res: HttpResponse<IFiliere[]>) => res.body ?? []))
      .pipe(
        map((filieres: IFiliere[]) => this.filiereService.addFiliereToCollectionIfMissing(filieres, this.editForm.get('filiere')!.value))
      )
      .subscribe((filieres: IFiliere[]) => (this.filieresSharedCollection = filieres));

    this.apprenantService
      .query()
      .pipe(map((res: HttpResponse<IApprenant[]>) => res.body ?? []))
      .pipe(
        map((apprenants: IApprenant[]) =>
          this.apprenantService.addApprenantToCollectionIfMissing(apprenants, this.editForm.get('apprenant')!.value)
        )
      )
      .subscribe((apprenants: IApprenant[]) => (this.apprenantsSharedCollection = apprenants));
  }

  protected createFromForm(): IExamen {
    return {
      ...new Examen(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value,
      autres: this.editForm.get(['autres'])!.value,
      option: this.editForm.get(['option'])!.value,
      status: this.editForm.get(['status'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      directeur: this.editForm.get(['directeur'])!.value,
      serie: this.editForm.get(['serie'])!.value,
      filiere: this.editForm.get(['filiere'])!.value,
      apprenant: this.editForm.get(['apprenant'])!.value,
    };
  }
}
