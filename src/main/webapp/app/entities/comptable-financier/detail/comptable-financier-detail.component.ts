import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IComptableFinancier } from '../comptable-financier.model';

@Component({
  selector: 'jhi-comptable-financier-detail',
  templateUrl: './comptable-financier-detail.component.html',
  styleUrls: ['./comptable-financier-detail.component.scss'],
})
export class ComptableFinancierDetailComponent implements OnInit {
  comptableFinancier: IComptableFinancier | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ comptableFinancier }) => {
      this.comptableFinancier = comptableFinancier;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
