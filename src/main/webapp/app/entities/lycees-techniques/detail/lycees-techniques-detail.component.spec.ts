import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LyceesTechniquesDetailComponent } from './lycees-techniques-detail.component';

describe('Component Tests', () => {
  describe('LyceesTechniques Management Detail Component', () => {
    let comp: LyceesTechniquesDetailComponent;
    let fixture: ComponentFixture<LyceesTechniquesDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [LyceesTechniquesDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ lyceesTechniques: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(LyceesTechniquesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LyceesTechniquesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load lyceesTechniques on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.lyceesTechniques).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
