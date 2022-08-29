import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ILyceesTechniques, LyceesTechniques } from '../lycees-techniques.model';
import { LyceesTechniquesService } from '../service/lycees-techniques.service';

@Component({
  selector: 'jhi-lycees-techniques-update',
  templateUrl: './lycees-techniques-update.component.html',
  styleUrls: ['./lycees-techniques-update.component.scss'],
})
export class LyceesTechniquesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nomLycee: [null, [Validators.required]],
  });

  constructor(
    protected lyceesTechniquesService: LyceesTechniquesService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lyceesTechniques }) => {
      this.updateForm(lyceesTechniques);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const lyceesTechniques = this.createFromForm();
    if (lyceesTechniques.id !== undefined) {
      this.subscribeToSaveResponse(this.lyceesTechniquesService.update(lyceesTechniques));
    } else {
      this.subscribeToSaveResponse(this.lyceesTechniquesService.create(lyceesTechniques));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILyceesTechniques>>): void {
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

  protected updateForm(lyceesTechniques: ILyceesTechniques): void {
    this.editForm.patchValue({
      id: lyceesTechniques.id,
      nomLycee: lyceesTechniques.nomLycee,
    });
  }

  protected createFromForm(): ILyceesTechniques {
    return {
      ...new LyceesTechniques(),
      id: this.editForm.get(['id'])!.value,
      nomLycee: this.editForm.get(['nomLycee'])!.value,
    };
  }
}
