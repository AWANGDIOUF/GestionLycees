import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { OrganeService } from '../service/organe.service';

import { OrganeComponent } from './organe.component';

describe('Component Tests', () => {
  describe('Organe Management Component', () => {
    let comp: OrganeComponent;
    let fixture: ComponentFixture<OrganeComponent>;
    let service: OrganeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [OrganeComponent],
      })
        .overrideTemplate(OrganeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrganeComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(OrganeService);

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
      expect(comp.organes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
