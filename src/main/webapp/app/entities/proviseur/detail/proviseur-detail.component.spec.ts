import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProviseurDetailComponent } from './proviseur-detail.component';

describe('Component Tests', () => {
  describe('Proviseur Management Detail Component', () => {
    let comp: ProviseurDetailComponent;
    let fixture: ComponentFixture<ProviseurDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProviseurDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ proviseur: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ProviseurDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProviseurDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load proviseur on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.proviseur).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
