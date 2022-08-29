import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnseignantDetailComponent } from './enseignant-detail.component';

describe('Component Tests', () => {
  describe('Enseignant Management Detail Component', () => {
    let comp: EnseignantDetailComponent;
    let fixture: ComponentFixture<EnseignantDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [EnseignantDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ enseignant: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(EnseignantDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EnseignantDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load enseignant on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.enseignant).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
