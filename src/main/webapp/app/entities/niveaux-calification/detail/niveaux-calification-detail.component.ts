import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INiveauxCalification } from '../niveaux-calification.model';

@Component({
  selector: 'jhi-niveaux-calification-detail',
  templateUrl: './niveaux-calification-detail.component.html',
  styleUrls: ['./niveaux-calification-detail.component.scss'],
})
export class NiveauxCalificationDetailComponent implements OnInit {
  niveauxCalification: INiveauxCalification | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ niveauxCalification }) => {
      this.niveauxCalification = niveauxCalification;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
