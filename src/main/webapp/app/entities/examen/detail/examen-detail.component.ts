import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExamen } from '../examen.model';

@Component({
  selector: 'jhi-examen-detail',
  templateUrl: './examen-detail.component.html',
  styleUrls: ['./examen-detail.component.scss'],
})
export class ExamenDetailComponent implements OnInit {
  examen: IExamen | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ examen }) => {
      this.examen = examen;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
