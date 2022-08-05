import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVisite } from '../visite.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-visite-detail',
  templateUrl: './visite-detail.component.html',
  styleUrls: ['./visite-detail.component.scss'],
})
export class VisiteDetailComponent implements OnInit {
  visite: IVisite | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ visite }) => {
      this.visite = visite;
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
