import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProviseur } from '../proviseur.model';

@Component({
  selector: 'jhi-proviseur-detail',
  templateUrl: './proviseur-detail.component.html',
  styleUrls: ['./proviseur-detail.component.scss'],
})
export class ProviseurDetailComponent implements OnInit {
  proviseur: IProviseur | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proviseur }) => {
      this.proviseur = proviseur;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
