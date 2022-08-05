import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ProblemeService } from '../service/probleme.service';

import { ProblemeComponent } from './probleme.component';

describe('Component Tests', () => {
  describe('Probleme Management Component', () => {
    let comp: ProblemeComponent;
    let fixture: ComponentFixture<ProblemeComponent>;
    let service: ProblemeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProblemeComponent],
      })
        .overrideTemplate(ProblemeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProblemeComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ProblemeService);

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
      expect(comp.problemes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
