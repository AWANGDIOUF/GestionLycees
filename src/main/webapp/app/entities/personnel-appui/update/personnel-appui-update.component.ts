import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPersonnelAppui, PersonnelAppui } from '../personnel-appui.model';
import { PersonnelAppuiService } from '../service/personnel-appui.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { ProviseurService } from 'app/entities/proviseur/service/proviseur.service';

@Component({
  selector: 'jhi-personnel-appui-update',
  templateUrl: './personnel-appui-update.component.html',
  styleUrls: ['./personnel-appui-update.component.scss'],
})
export class PersonnelAppuiUpdateComponent implements OnInit {
  isSaving = false;

  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  proviseursSharedCollection: IProviseur[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    prenom: [null, [Validators.required]],
    situationMatrimoniale: [null, [Validators.required]],
    fonction: [null, [Validators.required]],
    autreFoction: [],
    telephone: [null, [Validators.required]],
    mail: [null, [Validators.required]],
    lyceesTechniques: [],
    directeur: [],
  });

  constructor(
    protected personnelAppuiService: PersonnelAppuiService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected proviseurService: ProviseurService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personnelAppui }) => {
      this.updateForm(personnelAppui);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const personnelAppui = this.createFromForm();
    if (personnelAppui.id !== undefined) {
      this.subscribeToSaveResponse(this.personnelAppuiService.update(personnelAppui));
    } else {
      this.subscribeToSaveResponse(this.personnelAppuiService.create(personnelAppui));
    }
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  trackProviseurById(index: number, item: IProviseur): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersonnelAppui>>): void {
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

  protected updateForm(personnelAppui: IPersonnelAppui): void {
    this.editForm.patchValue({
      id: personnelAppui.id,
      nom: personnelAppui.nom,
      prenom: personnelAppui.prenom,
      situationMatrimoniale: personnelAppui.situationMatrimoniale,
      fonction: personnelAppui.fonction,
      autreFoction: personnelAppui.autreFoction,
      telephone: personnelAppui.telephone,
      mail: personnelAppui.mail,
      lyceesTechniques: personnelAppui.lyceesTechniques,
      directeur: personnelAppui.directeur,
    });

    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      personnelAppui.lyceesTechniques
    );
    this.proviseursSharedCollection = this.proviseurService.addProviseurToCollectionIfMissing(
      this.proviseursSharedCollection,
      personnelAppui.directeur
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
          this.proviseurService.addProviseurToCollectionIfMissing(proviseurs, this.editForm.get('directeur')!.value)
        )
      )
      .subscribe((proviseurs: IProviseur[]) => (this.proviseursSharedCollection = proviseurs));
  }

  protected createFromForm(): IPersonnelAppui {
    return {
      ...new PersonnelAppui(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      situationMatrimoniale: this.editForm.get(['situationMatrimoniale'])!.value,
      fonction: this.editForm.get(['fonction'])!.value,
      autreFoction: this.editForm.get(['autreFoction'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      mail: this.editForm.get(['mail'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      directeur: this.editForm.get(['directeur'])!.value,
    };
  }
}
