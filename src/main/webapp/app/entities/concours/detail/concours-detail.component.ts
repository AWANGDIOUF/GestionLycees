import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConcours } from '../concours.model';

@Component({
  selector: 'jhi-concours-detail',
  templateUrl: './concours-detail.component.html',
  styleUrls: ['./concours-detail.component.scss'],
})
export class ConcoursDetailComponent implements OnInit {
  concours: IConcours | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ concours }) => {
      this.concours = concours;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
