import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IEnseignant, Enseignant } from '../enseignant.model';
import { EnseignantService } from '../service/enseignant.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { ISerie } from 'app/entities/serie/serie.model';
import { SerieService } from 'app/entities/serie/service/serie.service';
import { IFiliere } from 'app/entities/filiere/filiere.model';
import { FiliereService } from 'app/entities/filiere/service/filiere.service';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { ProviseurService } from 'app/entities/proviseur/service/proviseur.service';

@Component({
  selector: 'jhi-enseignant-update',
  templateUrl: './enseignant-update.component.html',
})
export class EnseignantUpdateComponent implements OnInit {
  isSaving = false;

  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  seriesSharedCollection: ISerie[] = [];
  filieresSharedCollection: IFiliere[] = [];
  proviseursSharedCollection: IProviseur[] = [];

  editForm = this.fb.group({
    id: [],
    matriculeEns: [null, [Validators.required]],
    nomPrenom: [null, [Validators.required]],
    sexe: [null, [Validators.required]],
    telephone: [null, [Validators.required]],
    mail: [null, [Validators.required]],
    grade: [null, [Validators.required]],
    option: [],
    situationMatrimoniale: [null, [Validators.required]],
    status: [],
    fonction: [null, [Validators.required]],
    lyceesTechniques: [],
    serie: [],
    filiere: [],
    proviseur: [],
  });

  constructor(
    protected enseignantService: EnseignantService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected serieService: SerieService,
    protected filiereService: FiliereService,
    protected proviseurService: ProviseurService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ enseignant }) => {
      this.updateForm(enseignant);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const enseignant = this.createFromForm();
    if (enseignant.id !== undefined) {
      this.subscribeToSaveResponse(this.enseignantService.update(enseignant));
    } else {
      this.subscribeToSaveResponse(this.enseignantService.create(enseignant));
    }
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  trackSerieById(index: number, item: ISerie): number {
    return item.id!;
  }

  trackFiliereById(index: number, item: IFiliere): number {
    return item.id!;
  }

  trackProviseurById(index: number, item: IProviseur): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEnseignant>>): void {
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

  protected updateForm(enseignant: IEnseignant): void {
    this.editForm.patchValue({
      id: enseignant.id,
      matriculeEns: enseignant.matriculeEns,
      nomPrenom: enseignant.nomPrenom,
      sexe: enseignant.sexe,
      telephone: enseignant.telephone,
      mail: enseignant.mail,
      grade: enseignant.grade,
      option: enseignant.option,
      situationMatrimoniale: enseignant.situationMatrimoniale,
      status: enseignant.status,
      fonction: enseignant.fonction,
      lyceesTechniques: enseignant.lyceesTechniques,
      serie: enseignant.serie,
      filiere: enseignant.filiere,
      proviseur: enseignant.proviseur,
    });

    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      enseignant.lyceesTechniques
    );
    this.seriesSharedCollection = this.serieService.addSerieToCollectionIfMissing(this.seriesSharedCollection, enseignant.serie);
    this.filieresSharedCollection = this.filiereService.addFiliereToCollectionIfMissing(this.filieresSharedCollection, enseignant.filiere);
    this.proviseursSharedCollection = this.proviseurService.addProviseurToCollectionIfMissing(
      this.proviseursSharedCollection,
      enseignant.proviseur
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

  protected createFromForm(): IEnseignant {
    return {
      ...new Enseignant(),
      id: this.editForm.get(['id'])!.value,
      matriculeEns: this.editForm.get(['matriculeEns'])!.value,
      nomPrenom: this.editForm.get(['nomPrenom'])!.value,
      sexe: this.editForm.get(['sexe'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      mail: this.editForm.get(['mail'])!.value,
      grade: this.editForm.get(['grade'])!.value,
      option: this.editForm.get(['option'])!.value,
      situationMatrimoniale: this.editForm.get(['situationMatrimoniale'])!.value,
      status: this.editForm.get(['status'])!.value,
      fonction: this.editForm.get(['fonction'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      serie: this.editForm.get(['serie'])!.value,
      filiere: this.editForm.get(['filiere'])!.value,
      proviseur: this.editForm.get(['proviseur'])!.value,
    };
  }
}
