import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ILyceeTechnique, LyceeTechnique } from '../lycee-technique.model';
import { LyceeTechniqueService } from '../service/lycee-technique.service';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { ProviseurService } from 'app/entities/proviseur/service/proviseur.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';

@Component({
  selector: 'jhi-lycee-technique-update',
  templateUrl: './lycee-technique-update.component.html',
  styleUrls: ['./lycee-technique-update.component.scss'],
})
export class LyceeTechniqueUpdateComponent implements OnInit {
  isSaving = false;

  proviseursCollection: IProviseur[] = [];
  nomLyceesCollection: ILyceesTechniques[] = [];

  editForm = this.fb.group({
    id: [],
    prenomNom: [null, [Validators.required]],
    adresse: [null, [Validators.required]],
    mail: [null, [Validators.required]],
    tel1: [null, [Validators.required]],
    tel2: [null, [Validators.required]],
    boitePostal: [null, [Validators.required]],
    decretCreation: [null, [Validators.required]],
    dateCreation: [null, [Validators.required]],
    region: [null, [Validators.required]],
    autreRegion: [],
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
    departementZiguinchor: [],
    autredepartementDakar: [],
    autredepartementDiourbel: [],
    autredepartementFatick: [],
    autredepartementKaffrine: [],
    autredepartementKaolack: [],
    autredepartementKedougou: [],
    autredepartementKolda: [],
    autredepartementLouga: [],
    autredepartementMatam: [],
    autredepartementSaint: [],
    autredepartementSedhiou: [],
    autredepartementTambacounda: [],
    autredepartementThis: [],
    autredepartementZiguinchor: [],
    commune: [null, [Validators.required]],
    ia: [null, [Validators.required]],
    proviseur: [],
    nomLycee: [],
  });

  constructor(
    protected lyceeTechniqueService: LyceeTechniqueService,
    protected proviseurService: ProviseurService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lyceeTechnique }) => {
      this.updateForm(lyceeTechnique);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const lyceeTechnique = this.createFromForm();
    if (lyceeTechnique.id !== undefined) {
      this.subscribeToSaveResponse(this.lyceeTechniqueService.update(lyceeTechnique));
    } else {
      this.subscribeToSaveResponse(this.lyceeTechniqueService.create(lyceeTechnique));
    }
  }

  trackProviseurById(index: number, item: IProviseur): number {
    return item.id!;
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILyceeTechnique>>): void {
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

  protected updateForm(lyceeTechnique: ILyceeTechnique): void {
    this.editForm.patchValue({
      id: lyceeTechnique.id,
      prenomNom: lyceeTechnique.prenomNom,
      adresse: lyceeTechnique.adresse,
      mail: lyceeTechnique.mail,
      tel1: lyceeTechnique.tel1,
      tel2: lyceeTechnique.tel2,
      boitePostal: lyceeTechnique.boitePostal,
      decretCreation: lyceeTechnique.decretCreation,
      dateCreation: lyceeTechnique.dateCreation,
      region: lyceeTechnique.region,
      autreRegion: lyceeTechnique.autreRegion,
      departementDakar: lyceeTechnique.departementDakar,
      departementDiourbel: lyceeTechnique.departementDiourbel,
      departementFatick: lyceeTechnique.departementFatick,
      departementKaffrine: lyceeTechnique.departementKaffrine,
      departementKaolack: lyceeTechnique.departementKaolack,
      departementKedougou: lyceeTechnique.departementKedougou,
      departementKolda: lyceeTechnique.departementKolda,
      departementLouga: lyceeTechnique.departementLouga,
      departementMatam: lyceeTechnique.departementMatam,
      departementSaint: lyceeTechnique.departementSaint,
      departementSedhiou: lyceeTechnique.departementSedhiou,
      departementTambacounda: lyceeTechnique.departementTambacounda,
      departementThis: lyceeTechnique.departementThis,
      departementZiguinchor: lyceeTechnique.departementZiguinchor,
      autredepartementDakar: lyceeTechnique.autredepartementDakar,
      autredepartementDiourbel: lyceeTechnique.autredepartementDiourbel,
      autredepartementFatick: lyceeTechnique.autredepartementFatick,
      autredepartementKaffrine: lyceeTechnique.autredepartementKaffrine,
      autredepartementKaolack: lyceeTechnique.autredepartementKaolack,
      autredepartementKedougou: lyceeTechnique.autredepartementKedougou,
      autredepartementKolda: lyceeTechnique.autredepartementKolda,
      autredepartementLouga: lyceeTechnique.autredepartementLouga,
      autredepartementMatam: lyceeTechnique.autredepartementMatam,
      autredepartementSaint: lyceeTechnique.autredepartementSaint,
      autredepartementSedhiou: lyceeTechnique.autredepartementSedhiou,
      autredepartementTambacounda: lyceeTechnique.autredepartementTambacounda,
      autredepartementThis: lyceeTechnique.autredepartementThis,
      autredepartementZiguinchor: lyceeTechnique.autredepartementZiguinchor,
      commune: lyceeTechnique.commune,
      ia: lyceeTechnique.ia,
      proviseur: lyceeTechnique.proviseur,
      nomLycee: lyceeTechnique.nomLycee,
    });

    this.proviseursCollection = this.proviseurService.addProviseurToCollectionIfMissing(
      this.proviseursCollection,
      lyceeTechnique.proviseur
    );
    this.nomLyceesCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.nomLyceesCollection,
      lyceeTechnique.nomLycee
    );
  }

  protected loadRelationshipsOptions(): void {
    this.proviseurService
      .query({ filter: 'lyceetechnique-is-null' })
      .pipe(map((res: HttpResponse<IProviseur[]>) => res.body ?? []))
      .pipe(
        map((proviseurs: IProviseur[]) =>
          this.proviseurService.addProviseurToCollectionIfMissing(proviseurs, this.editForm.get('proviseur')!.value)
        )
      )
      .subscribe((proviseurs: IProviseur[]) => (this.proviseursCollection = proviseurs));

    this.lyceesTechniquesService
      .query({ filter: 'lyceetechnique-is-null' })
      .pipe(map((res: HttpResponse<ILyceesTechniques[]>) => res.body ?? []))
      .pipe(
        map((lyceesTechniques: ILyceesTechniques[]) =>
          this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(lyceesTechniques, this.editForm.get('nomLycee')!.value)
        )
      )
      .subscribe((lyceesTechniques: ILyceesTechniques[]) => (this.nomLyceesCollection = lyceesTechniques));
  }

  protected createFromForm(): ILyceeTechnique {
    return {
      ...new LyceeTechnique(),
      id: this.editForm.get(['id'])!.value,
      prenomNom: this.editForm.get(['prenomNom'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      mail: this.editForm.get(['mail'])!.value,
      tel1: this.editForm.get(['tel1'])!.value,
      tel2: this.editForm.get(['tel2'])!.value,
      boitePostal: this.editForm.get(['boitePostal'])!.value,
      decretCreation: this.editForm.get(['decretCreation'])!.value,
      dateCreation: this.editForm.get(['dateCreation'])!.value,
      region: this.editForm.get(['region'])!.value,
      autreRegion: this.editForm.get(['autreRegion'])!.value,
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
      departementZiguinchor: this.editForm.get(['departementZiguinchor'])!.value,
      autredepartementDakar: this.editForm.get(['autredepartementDakar'])!.value,
      autredepartementDiourbel: this.editForm.get(['autredepartementDiourbel'])!.value,
      autredepartementFatick: this.editForm.get(['autredepartementFatick'])!.value,
      autredepartementKaffrine: this.editForm.get(['autredepartementKaffrine'])!.value,
      autredepartementKaolack: this.editForm.get(['autredepartementKaolack'])!.value,
      autredepartementKedougou: this.editForm.get(['autredepartementKedougou'])!.value,
      autredepartementKolda: this.editForm.get(['autredepartementKolda'])!.value,
      autredepartementLouga: this.editForm.get(['autredepartementLouga'])!.value,
      autredepartementMatam: this.editForm.get(['autredepartementMatam'])!.value,
      autredepartementSaint: this.editForm.get(['autredepartementSaint'])!.value,
      autredepartementSedhiou: this.editForm.get(['autredepartementSedhiou'])!.value,
      autredepartementTambacounda: this.editForm.get(['autredepartementTambacounda'])!.value,
      autredepartementThis: this.editForm.get(['autredepartementThis'])!.value,
      autredepartementZiguinchor: this.editForm.get(['autredepartementZiguinchor'])!.value,
      commune: this.editForm.get(['commune'])!.value,
      ia: this.editForm.get(['ia'])!.value,
      proviseur: this.editForm.get(['proviseur'])!.value,
      nomLycee: this.editForm.get(['nomLycee'])!.value,
    };
  }
}
