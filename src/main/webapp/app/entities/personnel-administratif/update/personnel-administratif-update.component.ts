import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPersonnelAdministratif, PersonnelAdministratif } from '../personnel-administratif.model';
import { PersonnelAdministratifService } from '../service/personnel-administratif.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { ProviseurService } from 'app/entities/proviseur/service/proviseur.service';

@Component({
  selector: 'jhi-personnel-administratif-update',
  templateUrl: './personnel-administratif-update.component.html',
  styleUrls: ['./personnel-administratif-update.component.scss'],
})
export class PersonnelAdministratifUpdateComponent implements OnInit {
  isSaving = false;

  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  proviseursSharedCollection: IProviseur[] = [];

  editForm = this.fb.group({
    id: [],
    matricule: [null, [Validators.required]],
    nom: [null, [Validators.required]],
    prenom: [null, [Validators.required]],
    situationMatrimoniale: [null, [Validators.required]],
    fonction: [null, [Validators.required]],
    autreFonction: [],
    telephone: [null, [Validators.required]],
    mail: [null, [Validators.required]],
    lyceesTechniques: [],
    proviseur: [],
  });

  constructor(
    protected personnelAdministratifService: PersonnelAdministratifService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected proviseurService: ProviseurService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personnelAdministratif }) => {
      this.updateForm(personnelAdministratif);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const personnelAdministratif = this.createFromForm();
    if (personnelAdministratif.id !== undefined) {
      this.subscribeToSaveResponse(this.personnelAdministratifService.update(personnelAdministratif));
    } else {
      this.subscribeToSaveResponse(this.personnelAdministratifService.create(personnelAdministratif));
    }
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  trackProviseurById(index: number, item: IProviseur): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersonnelAdministratif>>): void {
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

  protected updateForm(personnelAdministratif: IPersonnelAdministratif): void {
    this.editForm.patchValue({
      id: personnelAdministratif.id,
      matricule: personnelAdministratif.matricule,
      nom: personnelAdministratif.nom,
      prenom: personnelAdministratif.prenom,
      situationMatrimoniale: personnelAdministratif.situationMatrimoniale,
      fonction: personnelAdministratif.fonction,
      autreFonction: personnelAdministratif.autreFonction,
      telephone: personnelAdministratif.telephone,
      mail: personnelAdministratif.mail,
      lyceesTechniques: personnelAdministratif.lyceesTechniques,
      proviseur: personnelAdministratif.proviseur,
    });

    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      personnelAdministratif.lyceesTechniques
    );
    this.proviseursSharedCollection = this.proviseurService.addProviseurToCollectionIfMissing(
      this.proviseursSharedCollection,
      personnelAdministratif.proviseur
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

  protected createFromForm(): IPersonnelAdministratif {
    return {
      ...new PersonnelAdministratif(),
      id: this.editForm.get(['id'])!.value,
      matricule: this.editForm.get(['matricule'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      situationMatrimoniale: this.editForm.get(['situationMatrimoniale'])!.value,
      fonction: this.editForm.get(['fonction'])!.value,
      autreFonction: this.editForm.get(['autreFonction'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      mail: this.editForm.get(['mail'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      proviseur: this.editForm.get(['proviseur'])!.value,
    };
  }
}
