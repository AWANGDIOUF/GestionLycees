import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MaterielDetailComponent } from './materiel-detail.component';

describe('Component Tests', () => {
  describe('Materiel Management Detail Component', () => {
    let comp: MaterielDetailComponent;
    let fixture: ComponentFixture<MaterielDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MaterielDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ materiel: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(MaterielDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MaterielDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load materiel on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.materiel).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
