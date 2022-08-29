import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DirecteurEtudeDetailComponent } from './directeur-etude-detail.component';

describe('Component Tests', () => {
  describe('DirecteurEtude Management Detail Component', () => {
    let comp: DirecteurEtudeDetailComponent;
    let fixture: ComponentFixture<DirecteurEtudeDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DirecteurEtudeDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ directeurEtude: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(DirecteurEtudeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DirecteurEtudeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load directeurEtude on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.directeurEtude).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
