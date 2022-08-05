import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataUtils } from 'app/core/util/data-util.service';

import { BesoinDetailComponent } from './besoin-detail.component';

describe('Component Tests', () => {
  describe('Besoin Management Detail Component', () => {
    let comp: BesoinDetailComponent;
    let fixture: ComponentFixture<BesoinDetailComponent>;
    let dataUtils: DataUtils;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [BesoinDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ besoin: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(BesoinDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BesoinDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = TestBed.inject(DataUtils);
      jest.spyOn(window, 'open').mockImplementation(() => null);
    });

    describe('OnInit', () => {
      it('Should load besoin on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.besoin).toEqual(expect.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from DataUtils', () => {
        // GIVEN
        jest.spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from DataUtils', () => {
        // GIVEN
        jest.spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeBase64, fakeContentType);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeBase64, fakeContentType);
      });
    });
  });
});
