import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConcoursDetailComponent } from './concours-detail.component';

describe('Component Tests', () => {
  describe('Concours Management Detail Component', () => {
    let comp: ConcoursDetailComponent;
    let fixture: ComponentFixture<ConcoursDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ConcoursDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ concours: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ConcoursDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConcoursDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load concours on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.concours).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
