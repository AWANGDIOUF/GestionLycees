import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDirecteurEtude } from '../directeur-etude.model';

@Component({
  selector: 'jhi-directeur-etude-detail',
  templateUrl: './directeur-etude-detail.component.html',
  styleUrls: ['./directeur-etude-detail.component.scss'],
})
export class DirecteurEtudeDetailComponent implements OnInit {
  directeurEtude: IDirecteurEtude | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ directeurEtude }) => {
      this.directeurEtude = directeurEtude;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
