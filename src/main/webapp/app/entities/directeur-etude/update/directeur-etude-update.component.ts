import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDirecteurEtude, DirecteurEtude } from '../directeur-etude.model';
import { DirecteurEtudeService } from '../service/directeur-etude.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';

@Component({
  selector: 'jhi-directeur-etude-update',
  templateUrl: './directeur-etude-update.component.html',
  styleUrls: ['./directeur-etude-update.component.scss'],
})
export class DirecteurEtudeUpdateComponent implements OnInit {
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
    protected directeurEtudeService: DirecteurEtudeService,
    protected userService: UserService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ directeurEtude }) => {
      this.updateForm(directeurEtude);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const directeurEtude = this.createFromForm();
    if (directeurEtude.id !== undefined) {
      this.subscribeToSaveResponse(this.directeurEtudeService.update(directeurEtude));
    } else {
      this.subscribeToSaveResponse(this.directeurEtudeService.create(directeurEtude));
    }
  }

  trackUserById(index: number, item: IUser): number {
    return item.id!;
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDirecteurEtude>>): void {
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

  protected updateForm(directeurEtude: IDirecteurEtude): void {
    this.editForm.patchValue({
      id: directeurEtude.id,
      nomPrenom: directeurEtude.nomPrenom,
      user: directeurEtude.user,
      nomLycee: directeurEtude.nomLycee,
    });

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, directeurEtude.user);
    this.nomLyceesCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.nomLyceesCollection,
      directeurEtude.nomLycee
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('user')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.lyceesTechniquesService
      .query({ filter: 'directeuretude-is-null' })
      .pipe(map((res: HttpResponse<ILyceesTechniques[]>) => res.body ?? []))
      .pipe(
        map((lyceesTechniques: ILyceesTechniques[]) =>
          this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(lyceesTechniques, this.editForm.get('nomLycee')!.value)
        )
      )
      .subscribe((lyceesTechniques: ILyceesTechniques[]) => (this.nomLyceesCollection = lyceesTechniques));
  }

  protected createFromForm(): IDirecteurEtude {
    return {
      ...new DirecteurEtude(),
      id: this.editForm.get(['id'])!.value,
      nomPrenom: this.editForm.get(['nomPrenom'])!.value,
      user: this.editForm.get(['user'])!.value,
      nomLycee: this.editForm.get(['nomLycee'])!.value,
    };
  }
}
