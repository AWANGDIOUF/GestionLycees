import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IComptableFinancier, ComptableFinancier } from '../comptable-financier.model';
import { ComptableFinancierService } from '../service/comptable-financier.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';

@Component({
  selector: 'jhi-comptable-financier-update',
  templateUrl: './comptable-financier-update.component.html',
  styleUrls: ['./comptable-financier-update.component.scss'],
})
export class ComptableFinancierUpdateComponent implements OnInit {
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
    protected comptableFinancierService: ComptableFinancierService,
    protected userService: UserService,
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ comptableFinancier }) => {
      this.updateForm(comptableFinancier);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const comptableFinancier = this.createFromForm();
    if (comptableFinancier.id !== undefined) {
      this.subscribeToSaveResponse(this.comptableFinancierService.update(comptableFinancier));
    } else {
      this.subscribeToSaveResponse(this.comptableFinancierService.create(comptableFinancier));
    }
  }

  trackUserById(index: number, item: IUser): number {
    return item.id!;
  }

  trackLyceesTechniquesById(index: number, item: ILyceesTechniques): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComptableFinancier>>): void {
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

  protected updateForm(comptableFinancier: IComptableFinancier): void {
    this.editForm.patchValue({
      id: comptableFinancier.id,
      nomPrenom: comptableFinancier.nomPrenom,
      user: comptableFinancier.user,
      nomLycee: comptableFinancier.nomLycee,
    });

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, comptableFinancier.user);
    this.nomLyceesCollection = this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(
      this.nomLyceesCollection,
      comptableFinancier.nomLycee
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('user')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.lyceesTechniquesService
      .query({ filter: 'comptablefinancie-is-null' })
      .pipe(map((res: HttpResponse<ILyceesTechniques[]>) => res.body ?? []))
      .pipe(
        map((lyceesTechniques: ILyceesTechniques[]) =>
          this.lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing(lyceesTechniques, this.editForm.get('nomLycee')!.value)
        )
      )
      .subscribe((lyceesTechniques: ILyceesTechniques[]) => (this.nomLyceesCollection = lyceesTechniques));
  }

  protected createFromForm(): IComptableFinancier {
    return {
      ...new ComptableFinancier(),
      id: this.editForm.get(['id'])!.value,
      nomPrenom: this.editForm.get(['nomPrenom'])!.value,
      user: this.editForm.get(['user'])!.value,
      nomLycee: this.editForm.get(['nomLycee'])!.value,
    };
  }
}
