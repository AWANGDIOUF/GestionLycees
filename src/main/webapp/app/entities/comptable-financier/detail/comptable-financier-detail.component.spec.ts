import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ComptableFinancierDetailComponent } from './comptable-financier-detail.component';

describe('Component Tests', () => {
  describe('ComptableFinancier Management Detail Component', () => {
    let comp: ComptableFinancierDetailComponent;
    let fixture: ComponentFixture<ComptableFinancierDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ComptableFinancierDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ comptableFinancier: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ComptableFinancierDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ComptableFinancierDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load comptableFinancier on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.comptableFinancier).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
