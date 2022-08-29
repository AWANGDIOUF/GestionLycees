import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IMouvementMatiere, MouvementMatiere } from '../mouvement-matiere.model';
import { MouvementMatiereService } from '../service/mouvement-matiere.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { ComptableMatiereService } from 'app/entities/comptable-matiere/service/comptable-matiere.service';

@Component({
  selector: 'jhi-mouvement-matiere-update',
  templateUrl: './mouvement-matiere-update.component.html',
  styleUrls: ['./mouvement-matiere-update.component.scss'],
})
export class MouvementMatiereUpdateComponent implements OnInit {
  isSaving = false;

  lyceesTechniquesSharedCollection: ILyceesTechniques[] = [];
  comptableMatieresSharedCollection: IComptableMatiere[] = [];

  editForm = this.fb.group({
    id: [],
    typeMouvement: [],
    group: [],
    organisation: [],
    autreOrganisation: [],
    ressource: [],
    autreRessource: [],
    designation: [],
    designationContentType: [],
    pvReception: [],
    pvReceptionContentType: [],
    bordeauDeLivraison: [],
    bordeauDeLivraisonContentType: [],
    groupe: [],
    bonDeSortie: [],
    bonDeSortieContentType: [],
    certificatAdministratif: [],
    certificatAdministratifContentType: [],
    lyceesTechniques: [],
    comptableMatiere: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected mouvementMatiereService: MouvementMatiereService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected comptableMatiereService: ComptableMatiereService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mouvementMatiere }) => {
      this.updateForm(mouvementMatiere);

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
    const mouvementMatiere = this.createFromForm();
    if (mouvementMatiere.id !== undefined) {
      this.subscribeToSaveResponse(this.mouvementMatiereService.update(mouvementMatiere));
    } else {
      this.subscribeToSaveResponse(this.mouvementMatiereService.create(mouvementMatiere));
    }
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  trackComptableMatiereById(index: number, item: IComptableMatiere): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMouvementMatiere>>): void {
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

  protected updateForm(mouvementMatiere: IMouvementMatiere): void {
    this.editForm.patchValue({
      id: mouvementMatiere.id,
      typeMouvement: mouvementMatiere.typeMouvement,
      group: mouvementMatiere.group,
      organisation: mouvementMatiere.organisation,
      autreOrganisation: mouvementMatiere.autreOrganisation,
      ressource: mouvementMatiere.ressource,
      autreRessource: mouvementMatiere.autreRessource,
      designation: mouvementMatiere.designation,
      designationContentType: mouvementMatiere.designationContentType,
      pvReception: mouvementMatiere.pvReception,
      pvReceptionContentType: mouvementMatiere.pvReceptionContentType,
      bordeauDeLivraison: mouvementMatiere.bordeauDeLivraison,
      bordeauDeLivraisonContentType: mouvementMatiere.bordeauDeLivraisonContentType,
      groupe: mouvementMatiere.groupe,
      bonDeSortie: mouvementMatiere.bonDeSortie,
      bonDeSortieContentType: mouvementMatiere.bonDeSortieContentType,
      certificatAdministratif: mouvementMatiere.certificatAdministratif,
      certificatAdministratifContentType: mouvementMatiere.certificatAdministratifContentType,
      lyceesTechniques: mouvementMatiere.lyceesTechniques,
      comptableMatiere: mouvementMatiere.comptableMatiere,
    });

    this.lyceesTechniquesSharedCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.lyceesTechniquesSharedCollection,
      mouvementMatiere.lyceesTechniques
    );
    this.comptableMatieresSharedCollection = this.comptableMatiereService.addComptableMatiereToCollectionIfMissing(
      this.comptableMatieresSharedCollection,
      mouvementMatiere.comptableMatiere
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

    this.comptableMatiereService
      .query()
      .pipe(map((res: HttpResponse<IComptableMatiere[]>) => res.body ?? []))
      .pipe(
        map((comptableMatieres: IComptableMatiere[]) =>
          this.comptableMatiereService.addComptableMatiereToCollectionIfMissing(
            comptableMatieres,
            this.editForm.get('comptableMatiere')!.value
          )
        )
      )
      .subscribe((comptableMatieres: IComptableMatiere[]) => (this.comptableMatieresSharedCollection = comptableMatieres));
  }

  protected createFromForm(): IMouvementMatiere {
    return {
      ...new MouvementMatiere(),
      id: this.editForm.get(['id'])!.value,
      typeMouvement: this.editForm.get(['typeMouvement'])!.value,
      group: this.editForm.get(['group'])!.value,
      organisation: this.editForm.get(['organisation'])!.value,
      autreOrganisation: this.editForm.get(['autreOrganisation'])!.value,
      ressource: this.editForm.get(['ressource'])!.value,
      autreRessource: this.editForm.get(['autreRessource'])!.value,
      designationContentType: this.editForm.get(['designationContentType'])!.value,
      designation: this.editForm.get(['designation'])!.value,
      pvReceptionContentType: this.editForm.get(['pvReceptionContentType'])!.value,
      pvReception: this.editForm.get(['pvReception'])!.value,
      bordeauDeLivraisonContentType: this.editForm.get(['bordeauDeLivraisonContentType'])!.value,
      bordeauDeLivraison: this.editForm.get(['bordeauDeLivraison'])!.value,
      groupe: this.editForm.get(['groupe'])!.value,
      bonDeSortieContentType: this.editForm.get(['bonDeSortieContentType'])!.value,
      bonDeSortie: this.editForm.get(['bonDeSortie'])!.value,
      certificatAdministratifContentType: this.editForm.get(['certificatAdministratifContentType'])!.value,
      certificatAdministratif: this.editForm.get(['certificatAdministratif'])!.value,
      lyceesTechniques: this.editForm.get(['lyceesTechniques'])!.value,
      comptableMatiere: this.editForm.get(['comptableMatiere'])!.value,
    };
  }
}
