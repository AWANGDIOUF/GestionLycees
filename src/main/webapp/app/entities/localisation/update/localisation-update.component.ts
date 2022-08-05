import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ILocalisation, Localisation } from '../localisation.model';
import { LocalisationService } from '../service/localisation.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { ProviseurService } from 'app/entities/proviseur/service/proviseur.service';

@Component({
  selector: 'jhi-localisation-update',
  templateUrl: './localisation-update.component.html',
})
export class LocalisationUpdateComponent implements OnInit {
  isSaving = false;

  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  proviseursSharedCollection: IProviseur[] = [];

  editForm = this.fb.group({
    id: [],
    region: [],
    departementDakar: [],
    departementDiourbel: [],
    departementFatick: [],
    departementKaffrine: [],
    departementKaolack: [],
    departementKedougou: [],
    departementKolda: [],
    departementLouga: [],
    departementMatam: [],
    departementSaint: [],
    departementSedhiou: [],
    departementTambacounda: [],
    departementThis: [],
    departementZic: [],
    ia: [],
    lyceesTechniques: [],
    proviseur: [],
  });

  constructor(
    protected localisationService: LocalisationService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected proviseurService: ProviseurService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localisation }) => {
      this.updateForm(localisation);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const localisation = this.createFromForm();
    if (localisation.id !== undefined) {
      this.subscribeToSaveResponse(this.localisationService.update(localisation));
    } else {
      this.subscribeToSaveResponse(this.localisationService.create(localisation));
    }
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  trackProviseurById(index: number, item: IProviseur): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocalisation>>): void {
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

  protected updateForm(localisation: ILocalisation): void {
    this.editForm.patchValue({
      id: localisation.id,
      region: localisation.region,
      departementDakar: localisation.departementDakar,
      departementDiourbel: localisation.departementDiourbel,
      departementFatick: localisation.departementFatick,
      departementKaffrine: localisation.departementKaffrine,
      departementKaolack: localisation.departementKaolack,
      departementKedougou: localisation.departementKedougou,
      departementKolda: localisation.departementKolda,
      departementLouga: localisation.departementLouga,
      departementMatam: localisation.departementMatam,
      departementSaint: localisation.departementSaint,
      departementSedhiou: localisation.departementSedhiou,
      departementTambacounda: localisation.departementTambacounda,
      departementThis: localisation.departementThis,
      departementZic: localisation.departementZic,
      ia: localisation.ia,
      lyceesTechniques: localisation.lyceesTechniques,
      proviseur: localisation.proviseur,
    });

    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      localisation.lyceesTechniques
    );
    this.proviseursSharedCollection = this.proviseurService.addProviseurToCollectionIfMissing(
      this.proviseursSharedCollection,
      localisation.proviseur
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

  protected createFromForm(): ILocalisation {
    return {
      ...new Localisation(),
      id: this.editForm.get(['id'])!.value,
      region: this.editForm.get(['region'])!.value,
      departementDakar: this.editForm.get(['departementDakar'])!.value,
      departementDiourbel: this.editForm.get(['departementDiourbel'])!.value,
      departementFatick: this.editForm.get(['departementFatick'])!.value,
      departementKaffrine: this.editForm.get(['departementKaffrine'])!.value,
      departementKaolack: this.editForm.get(['departementKaolack'])!.value,
      departementKedougou: this.editForm.get(['departementKedougou'])!.value,
      departementKolda: this.editForm.get(['departementKolda'])!.value,
      departementLouga: this.editForm.get(['departementLouga'])!.value,
      departementMatam: this.editForm.get(['departementMatam'])!.value,
      departementSaint: this.editForm.get(['departementSaint'])!.value,
      departementSedhiou: this.editForm.get(['departementSedhiou'])!.value,
      departementTambacounda: this.editForm.get(['departementTambacounda'])!.value,
      departementThis: this.editForm.get(['departementThis'])!.value,
      departementZic: this.editForm.get(['departementZic'])!.value,
      ia: this.editForm.get(['ia'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      proviseur: this.editForm.get(['proviseur'])!.value,
    };
  }
}
