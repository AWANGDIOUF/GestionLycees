import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ReceptionDetailComponent } from './reception-detail.component';

describe('Component Tests', () => {
  describe('Reception Management Detail Component', () => {
    let comp: ReceptionDetailComponent;
    let fixture: ComponentFixture<ReceptionDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ReceptionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ reception: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ReceptionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReceptionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load reception on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reception).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
