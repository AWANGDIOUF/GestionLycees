import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LocalisationDetailComponent } from './localisation-detail.component';

describe('Component Tests', () => {
  describe('Localisation Management Detail Component', () => {
    let comp: LocalisationDetailComponent;
    let fixture: ComponentFixture<LocalisationDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [LocalisationDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ localisation: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(LocalisationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalisationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load localisation on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.localisation).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
