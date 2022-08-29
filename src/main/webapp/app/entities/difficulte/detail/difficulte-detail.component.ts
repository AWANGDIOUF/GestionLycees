import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDifficulte } from '../difficulte.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-difficulte-detail',
  templateUrl: './difficulte-detail.component.html',
  styleUrls: ['./difficulte-detail.component.scss'],
})
export class DifficulteDetailComponent implements OnInit {
  difficulte: IDifficulte | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ difficulte }) => {
      this.difficulte = difficulte;
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
