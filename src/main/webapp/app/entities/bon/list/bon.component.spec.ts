import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { BonService } from '../service/bon.service';

import { BonComponent } from './bon.component';

describe('Component Tests', () => {
  describe('Bon Management Component', () => {
    let comp: BonComponent;
    let fixture: ComponentFixture<BonComponent>;
    let service: BonService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [BonComponent],
      })
        .overrideTemplate(BonComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BonComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(BonService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.bons?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
