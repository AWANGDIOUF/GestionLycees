import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrganeGestion } from '../organe-gestion.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-organe-gestion-detail',
  templateUrl: './organe-gestion-detail.component.html',
  styleUrls: ['./organe-gestion-detail.component.scss'],
})
export class OrganeGestionDetailComponent implements OnInit {
  organeGestion: IOrganeGestion | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ organeGestion }) => {
      this.organeGestion = organeGestion;
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
