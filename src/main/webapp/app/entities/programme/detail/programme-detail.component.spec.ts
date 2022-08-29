import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProgrammeDetailComponent } from './programme-detail.component';

describe('Component Tests', () => {
  describe('Programme Management Detail Component', () => {
    let comp: ProgrammeDetailComponent;
    let fixture: ComponentFixture<ProgrammeDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProgrammeDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ programme: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ProgrammeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProgrammeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load programme on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.programme).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
