import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IComptableMatiere } from '../comptable-matiere.model';

@Component({
  selector: 'jhi-comptable-matiere-detail',
  templateUrl: './comptable-matiere-detail.component.html',
  styleUrls: ['./comptable-matiere-detail.component.scss'],
})
export class ComptableMatiereDetailComponent implements OnInit {
  comptableMatiere: IComptableMatiere | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ comptableMatiere }) => {
      this.comptableMatiere = comptableMatiere;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
