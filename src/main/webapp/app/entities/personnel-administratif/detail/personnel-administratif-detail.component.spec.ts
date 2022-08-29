import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PersonnelAdministratifDetailComponent } from './personnel-administratif-detail.component';

describe('Component Tests', () => {
  describe('PersonnelAdministratif Management Detail Component', () => {
    let comp: PersonnelAdministratifDetailComponent;
    let fixture: ComponentFixture<PersonnelAdministratifDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PersonnelAdministratifDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ personnelAdministratif: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(PersonnelAdministratifDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PersonnelAdministratifDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load personnelAdministratif on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.personnelAdministratif).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
