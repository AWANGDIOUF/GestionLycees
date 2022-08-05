import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ComptableMatiereDetailComponent } from './comptable-matiere-detail.component';

describe('Component Tests', () => {
  describe('ComptableMatiere Management Detail Component', () => {
    let comp: ComptableMatiereDetailComponent;
    let fixture: ComponentFixture<ComptableMatiereDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ComptableMatiereDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ comptableMatiere: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ComptableMatiereDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ComptableMatiereDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load comptableMatiere on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.comptableMatiere).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
