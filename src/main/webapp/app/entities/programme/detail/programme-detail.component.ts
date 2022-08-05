import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProgramme } from '../programme.model';

@Component({
  selector: 'jhi-programme-detail',
  templateUrl: './programme-detail.component.html',
  styleUrls: ['./programme-detail.component.scss'],
})
export class ProgrammeDetailComponent implements OnInit {
  programme: IProgramme | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ programme }) => {
      this.programme = programme;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
