import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBesoin } from '../besoin.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-besoin-detail',
  templateUrl: './besoin-detail.component.html',
  styleUrls: ['./besoin-detail.component.scss'],
})
export class BesoinDetailComponent implements OnInit {
  besoin: IBesoin | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ besoin }) => {
      this.besoin = besoin;
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
