import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecette } from '../recette.model';

@Component({
  selector: 'jhi-recette-detail',
  templateUrl: './recette-detail.component.html',
  styleUrls: ['./recette-detail.component.scss'],
})
export class RecetteDetailComponent implements OnInit {
  recette: IRecette | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recette }) => {
      this.recette = recette;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
