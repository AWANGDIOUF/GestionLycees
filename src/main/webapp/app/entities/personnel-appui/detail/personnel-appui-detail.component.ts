import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonnelAppui } from '../personnel-appui.model';

@Component({
  selector: 'jhi-personnel-appui-detail',
  templateUrl: './personnel-appui-detail.component.html',
  styleUrls: ['./personnel-appui-detail.component.scss'],
})
export class PersonnelAppuiDetailComponent implements OnInit {
  personnelAppui: IPersonnelAppui | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personnelAppui }) => {
      this.personnelAppui = personnelAppui;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
