import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReception } from '../reception.model';

@Component({
  selector: 'jhi-reception-detail',
  templateUrl: './reception-detail.component.html',
  styleUrls: ['./reception-detail.component.scss'],
})
export class ReceptionDetailComponent implements OnInit {
  reception: IReception | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reception }) => {
      this.reception = reception;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
