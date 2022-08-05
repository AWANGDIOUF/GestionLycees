import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ApprenantDetailComponent } from './apprenant-detail.component';

describe('Component Tests', () => {
  describe('Apprenant Management Detail Component', () => {
    let comp: ApprenantDetailComponent;
    let fixture: ComponentFixture<ApprenantDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ApprenantDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ apprenant: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ApprenantDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ApprenantDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load apprenant on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.apprenant).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
