import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILyceesTechniques } from '../lycees-techniques.model';

@Component({
  selector: 'jhi-lycees-techniques-detail',
  templateUrl: './lycees-techniques-detail.component.html',
  styleUrls: ['./lycees-techniques-detail.component.scss'],
})
export class LyceesTechniquesDetailComponent implements OnInit {
  lyceesTechniques: ILyceesTechniques | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lyceesTechniques }) => {
      this.lyceesTechniques = lyceesTechniques;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
