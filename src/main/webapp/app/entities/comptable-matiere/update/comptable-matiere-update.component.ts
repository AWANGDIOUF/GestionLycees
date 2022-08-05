import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IComptableMatiere, ComptableMatiere } from '../comptable-matiere.model';
import { ComptableMatiereService } from '../service/comptable-matiere.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';

@Component({
  selector: 'jhi-comptable-matiere-update',
  templateUrl: './comptable-matiere-update.component.html',
  styleUrls: ['./comptable-matiere-update.component.scss'],
})
export class ComptableMatiereUpdateComponent implements OnInit {
  isSaving = false;

  usersSharedCollection: IUser[] = [];
  nomLyceesCollection: ILyceesTechniques[] = [];

  editForm = this.fb.group({
    id: [],
    nomPrenom: [null, [Validators.required]],
    user: [],
    nomLycee: [],
  });

  constructor(
    protected comptableMatiereService: ComptableMatiereService,
    protected userService: UserService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ comptableMatiere }) => {
      this.updateForm(comptableMatiere);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const comptableMatiere = this.createFromForm();
    if (comptableMatiere.id !== undefined) {
      this.subscribeToSaveResponse(this.comptableMatiereService.update(comptableMatiere));
    } else {
      this.subscribeToSaveResponse(this.comptableMatiereService.create(comptableMatiere));
    }
  }

  trackUserById(index: number, item: IUser): number {
    return item.id!;
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComptableMatiere>>): void {
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

  protected updateForm(comptableMatiere: IComptableMatiere): void {
    this.editForm.patchValue({
      id: comptableMatiere.id,
      nomPrenom: comptableMatiere.nomPrenom,
      user: comptableMatiere.user,
      nomLycee: comptableMatiere.nomLycee,
    });

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, comptableMatiere.user);
    this.nomLyceesCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.nomLyceesCollection,
      comptableMatiere.nomLycee
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('user')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.lyceesTechniquesService
      .query({ filter: 'comptablematiere-is-null' })
      .pipe(map((res: HttpResponse<ILyceesTechniques[]>) => res.body ?? []))
      .pipe(
        map((lyceesTechniques: ILyceesTechniques[]) =>
          this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(lyceesTechniques, this.editForm.get('nomLycee')!.value)
        )
      )
      .subscribe((lyceesTechniques: ILyceesTechniques[]) => (this.nomLyceesCollection = lyceesTechniques));
  }

  protected createFromForm(): IComptableMatiere {
    return {
      ...new ComptableMatiere(),
      id: this.editForm.get(['id'])!.value,
      nomPrenom: this.editForm.get(['nomPrenom'])!.value,
      user: this.editForm.get(['user'])!.value,
      nomLycee: this.editForm.get(['nomLycee'])!.value,
    };
  }
}
