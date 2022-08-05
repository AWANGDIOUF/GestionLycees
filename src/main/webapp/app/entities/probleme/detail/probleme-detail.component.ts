import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProbleme } from '../probleme.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-probleme-detail',
  templateUrl: './probleme-detail.component.html',
})
export class ProblemeDetailComponent implements OnInit {
  probleme: IProbleme | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ probleme }) => {
      this.probleme = probleme;
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
