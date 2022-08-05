import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProviseur, Proviseur } from '../proviseur.model';
import { ProviseurService } from '../service/proviseur.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';

@Component({
  selector: 'jhi-proviseur-update',
  templateUrl: './proviseur-update.component.html',
  styleUrls: ['./proviseur-update.component.scss'],
})
export class ProviseurUpdateComponent implements OnInit {
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
    protected proviseurService: ProviseurService,
    protected userService: UserService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proviseur }) => {
      this.updateForm(proviseur);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const proviseur = this.createFromForm();
    if (proviseur.id !== undefined) {
      this.subscribeToSaveResponse(this.proviseurService.update(proviseur));
    } else {
      this.subscribeToSaveResponse(this.proviseurService.create(proviseur));
    }
  }

  trackUserById(index: number, item: IUser): number {
    return item.id!;
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProviseur>>): void {
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

  protected updateForm(proviseur: IProviseur): void {
    this.editForm.patchValue({
      id: proviseur.id,
      nomPrenom: proviseur.nomPrenom,
      user: proviseur.user,
      nomLycee: proviseur.nomLycee,
    });

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, proviseur.user);
    this.nomLyceesCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.nomLyceesCollection,
      proviseur.nomLycee
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('user')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.lyceesTechniquesService
      .query({ filter: 'proviseur-is-null' })
      .pipe(map((res: HttpResponse<ILyceesTechniques[]>) => res.body ?? []))
      .pipe(
        map((lyceesTechniques: ILyceesTechniques[]) =>
          this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(lyceesTechniques, this.editForm.get('nomLycee')!.value)
        )
      )
      .subscribe((lyceesTechniques: ILyceesTechniques[]) => (this.nomLyceesCollection = lyceesTechniques));
  }

  protected createFromForm(): IProviseur {
    return {
      ...new Proviseur(),
      id: this.editForm.get(['id'])!.value,
      nomPrenom: this.editForm.get(['nomPrenom'])!.value,
      user: this.editForm.get(['user'])!.value,
      nomLycee: this.editForm.get(['nomLycee'])!.value,
    };
  }
}
