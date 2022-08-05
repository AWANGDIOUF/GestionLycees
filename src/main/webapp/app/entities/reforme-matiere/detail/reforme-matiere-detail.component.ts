import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReformeMatiere } from '../reforme-matiere.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-reforme-matiere-detail',
  templateUrl: './reforme-matiere-detail.component.html',
  styleUrls: ['./reforme-matiere-detail.component.scss'],
})
export class ReformeMatiereDetailComponent implements OnInit {
  reformeMatiere: IReformeMatiere | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reformeMatiere }) => {
      this.reformeMatiere = reformeMatiere;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
