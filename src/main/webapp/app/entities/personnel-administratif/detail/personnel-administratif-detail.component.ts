import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonnelAdministratif } from '../personnel-administratif.model';

@Component({
  selector: 'jhi-personnel-administratif-detail',
  templateUrl: './personnel-administratif-detail.component.html',
  styleUrls: ['./personnel-administratif-detail.component.scss'],
})
export class PersonnelAdministratifDetailComponent implements OnInit {
  personnelAdministratif: IPersonnelAdministratif | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personnelAdministratif }) => {
      this.personnelAdministratif = personnelAdministratif;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
