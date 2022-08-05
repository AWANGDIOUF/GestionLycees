import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PartenaireDetailComponent } from './partenaire-detail.component';

describe('Component Tests', () => {
  describe('Partenaire Management Detail Component', () => {
    let comp: PartenaireDetailComponent;
    let fixture: ComponentFixture<PartenaireDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PartenaireDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ partenaire: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(PartenaireDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PartenaireDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load partenaire on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.partenaire).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
