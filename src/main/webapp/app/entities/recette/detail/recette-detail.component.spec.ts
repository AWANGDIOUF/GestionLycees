import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RecetteDetailComponent } from './recette-detail.component';

describe('Component Tests', () => {
  describe('Recette Management Detail Component', () => {
    let comp: RecetteDetailComponent;
    let fixture: ComponentFixture<RecetteDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [RecetteDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ recette: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(RecetteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RecetteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load recette on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.recette).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
