import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataUtils } from 'app/core/util/data-util.service';

import { DifficulteDetailComponent } from './difficulte-detail.component';

describe('Component Tests', () => {
  describe('Difficulte Management Detail Component', () => {
    let comp: DifficulteDetailComponent;
    let fixture: ComponentFixture<DifficulteDetailComponent>;
    let dataUtils: DataUtils;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DifficulteDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ difficulte: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(DifficulteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DifficulteDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = TestBed.inject(DataUtils);
      jest.spyOn(window, 'open').mockImplementation(() => null);
    });

    describe('OnInit', () => {
      it('Should load difficulte on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.difficulte).toEqual(expect.objectContaining({ id: 123 }));
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
