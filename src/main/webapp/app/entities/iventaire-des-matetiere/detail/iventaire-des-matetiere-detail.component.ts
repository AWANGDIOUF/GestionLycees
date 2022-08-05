import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIventaireDesMatetiere } from '../iventaire-des-matetiere.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-iventaire-des-matetiere-detail',
  templateUrl: './iventaire-des-matetiere-detail.component.html',
  styleUrls: ['./iventaire-des-matetiere-detail.component.scss'],
})
export class IventaireDesMatetiereDetailComponent implements OnInit {
  iventaireDesMatetiere: IIventaireDesMatetiere | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ iventaireDesMatetiere }) => {
      this.iventaireDesMatetiere = iventaireDesMatetiere;
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
