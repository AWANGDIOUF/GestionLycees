import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDepense } from '../depense.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-depense-detail',
  templateUrl: './depense-detail.component.html',
  styleUrls: ['./depense-detail.component.scss'],
})
export class DepenseDetailComponent implements OnInit {
  depense: IDepense | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ depense }) => {
      this.depense = depense;
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
