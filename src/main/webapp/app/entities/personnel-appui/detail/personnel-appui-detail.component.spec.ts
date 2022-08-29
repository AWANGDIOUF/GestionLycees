import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PersonnelAppuiDetailComponent } from './personnel-appui-detail.component';

describe('Component Tests', () => {
  describe('PersonnelAppui Management Detail Component', () => {
    let comp: PersonnelAppuiDetailComponent;
    let fixture: ComponentFixture<PersonnelAppuiDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PersonnelAppuiDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ personnelAppui: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(PersonnelAppuiDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PersonnelAppuiDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load personnelAppui on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.personnelAppui).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
