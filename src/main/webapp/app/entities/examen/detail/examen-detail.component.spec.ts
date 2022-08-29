import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ExamenDetailComponent } from './examen-detail.component';

describe('Component Tests', () => {
  describe('Examen Management Detail Component', () => {
    let comp: ExamenDetailComponent;
    let fixture: ComponentFixture<ExamenDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ExamenDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ examen: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ExamenDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExamenDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load examen on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.examen).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
