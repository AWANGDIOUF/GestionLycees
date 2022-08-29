import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILyceeTechnique } from '../lycee-technique.model';

@Component({
  selector: 'jhi-lycee-technique-detail',
  templateUrl: './lycee-technique-detail.component.html',
  styleUrls: ['./lycee-technique-detail.component.scss'],
})
export class LyceeTechniqueDetailComponent implements OnInit {
  lyceeTechnique: ILyceeTechnique | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lyceeTechnique }) => {
      this.lyceeTechnique = lyceeTechnique;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
