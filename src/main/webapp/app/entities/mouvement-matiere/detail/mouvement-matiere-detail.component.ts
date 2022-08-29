import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMouvementMatiere } from '../mouvement-matiere.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-mouvement-matiere-detail',
  templateUrl: './mouvement-matiere-detail.component.html',
  styleUrls: ['./mouvement-matiere-detail.component.scss'],
})
export class MouvementMatiereDetailComponent implements OnInit {
  mouvementMatiere: IMouvementMatiere | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mouvementMatiere }) => {
      this.mouvementMatiere = mouvementMatiere;
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
