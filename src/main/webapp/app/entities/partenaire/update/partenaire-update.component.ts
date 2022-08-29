import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPartenaire, Partenaire } from '../partenaire.model';
import { PartenaireService } from '../service/partenaire.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { ProviseurService } from 'app/entities/proviseur/service/proviseur.service';

@Component({
  selector: 'jhi-partenaire-update',
  templateUrl: './partenaire-update.component.html',
  styleUrls: ['./partenaire-update.component.scss'],
})
export class PartenaireUpdateComponent implements OnInit {
  isSaving = false;

  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  proviseursSharedCollection: IProviseur[] = [];

  editForm = this.fb.group({
    id: [],
    denominationPartenaire: [null, [Validators.required]],
    categorieProvenaire: [null, [Validators.required]],
    autreCategorie: [],
    nature: [null, [Validators.required]],
    autreNature: [],
    lyceesTechniques: [],
    proviseur: [],
  });

  constructor(
    protected partenaireService: PartenaireService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected proviseurService: ProviseurService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ partenaire }) => {
      this.updateForm(partenaire);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const partenaire = this.createFromForm();
    if (partenaire.id !== undefined) {
      this.subscribeToSaveResponse(this.partenaireService.update(partenaire));
    } else {
      this.subscribeToSaveResponse(this.partenaireService.create(partenaire));
    }
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  trackProviseurById(index: number, item: IProviseur): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPartenaire>>): void {
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

  protected updateForm(partenaire: IPartenaire): void {
    this.editForm.patchValue({
      id: partenaire.id,
      denominationPartenaire: partenaire.denominationPartenaire,
      categorieProvenaire: partenaire.categorieProvenaire,
      autreCategorie: partenaire.autreCategorie,
      nature: partenaire.nature,
      autreNature: partenaire.autreNature,
      lyceesTechniques: partenaire.lyceesTechniques,
      proviseur: partenaire.proviseur,
    });

    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      partenaire.lyceesTechniques
    );
    this.proviseursSharedCollection = this.proviseurService.addProviseurToCollectionIfMissing(
      this.proviseursSharedCollection,
      partenaire.proviseur
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

  protected createFromForm(): IPartenaire {
    return {
      ...new Partenaire(),
      id: this.editForm.get(['id'])!.value,
      denominationPartenaire: this.editForm.get(['denominationPartenaire'])!.value,
      categorieProvenaire: this.editForm.get(['categorieProvenaire'])!.value,
      autreCategorie: this.editForm.get(['autreCategorie'])!.value,
      nature: this.editForm.get(['nature'])!.value,
      autreNature: this.editForm.get(['autreNature'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      proviseur: this.editForm.get(['proviseur'])!.value,
    };
  }
}
