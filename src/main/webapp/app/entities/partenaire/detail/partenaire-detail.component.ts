import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartenaire } from '../partenaire.model';

@Component({
  selector: 'jhi-partenaire-detail',
  templateUrl: './partenaire-detail.component.html',
  styleUrls: ['./partenaire-detail.component.scss'],
})
export class PartenaireDetailComponent implements OnInit {
  partenaire: IPartenaire | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ partenaire }) => {
      this.partenaire = partenaire;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
