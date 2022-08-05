import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NiveauxCalificationDetailComponent } from './niveaux-calification-detail.component';

describe('Component Tests', () => {
  describe('NiveauxCalification Management Detail Component', () => {
    let comp: NiveauxCalificationDetailComponent;
    let fixture: ComponentFixture<NiveauxCalificationDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [NiveauxCalificationDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ niveauxCalification: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(NiveauxCalificationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NiveauxCalificationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load niveauxCalification on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.niveauxCalification).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
