import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApprenant } from '../apprenant.model';

@Component({
  selector: 'jhi-apprenant-detail',
  templateUrl: './apprenant-detail.component.html',
  styleUrls: ['./apprenant-detail.component.scss'],
})
export class ApprenantDetailComponent implements OnInit {
  apprenant: IApprenant | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ apprenant }) => {
      this.apprenant = apprenant;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
