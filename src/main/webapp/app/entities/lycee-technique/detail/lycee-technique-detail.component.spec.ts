import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LyceeTechniqueDetailComponent } from './lycee-technique-detail.component';

describe('Component Tests', () => {
  describe('LyceeTechnique Management Detail Component', () => {
    let comp: LyceeTechniqueDetailComponent;
    let fixture: ComponentFixture<LyceeTechniqueDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [LyceeTechniqueDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ lyceeTechnique: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(LyceeTechniqueDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LyceeTechniqueDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load lyceeTechnique on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.lyceeTechnique).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
