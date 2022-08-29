import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INiveauxEtudes } from '../niveaux-etudes.model';

@Component({
  selector: 'jhi-niveaux-etudes-detail',
  templateUrl: './niveaux-etudes-detail.component.html',
  styleUrls: ['./niveaux-etudes-detail.component.scss'],
})
export class NiveauxEtudesDetailComponent implements OnInit {
  niveauxEtudes: INiveauxEtudes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ niveauxEtudes }) => {
      this.niveauxEtudes = niveauxEtudes;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
