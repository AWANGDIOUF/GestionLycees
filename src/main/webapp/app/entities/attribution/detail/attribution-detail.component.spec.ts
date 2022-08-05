import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AttributionDetailComponent } from './attribution-detail.component';

describe('Component Tests', () => {
  describe('Attribution Management Detail Component', () => {
    let comp: AttributionDetailComponent;
    let fixture: ComponentFixture<AttributionDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [AttributionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ attribution: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(AttributionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AttributionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load attribution on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.attribution).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
