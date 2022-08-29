import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAttribution } from '../attribution.model';

@Component({
  selector: 'jhi-attribution-detail',
  templateUrl: './attribution-detail.component.html',
})
export class AttributionDetailComponent implements OnInit {
  attribution: IAttribution | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ attribution }) => {
      this.attribution = attribution;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
