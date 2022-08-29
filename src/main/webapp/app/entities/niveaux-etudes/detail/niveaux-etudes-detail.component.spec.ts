import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NiveauxEtudesDetailComponent } from './niveaux-etudes-detail.component';

describe('Component Tests', () => {
  describe('NiveauxEtudes Management Detail Component', () => {
    let comp: NiveauxEtudesDetailComponent;
    let fixture: ComponentFixture<NiveauxEtudesDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [NiveauxEtudesDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ niveauxEtudes: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(NiveauxEtudesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NiveauxEtudesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load niveauxEtudes on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.niveauxEtudes).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
