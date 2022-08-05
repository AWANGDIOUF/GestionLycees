import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INiveauxCalification, NiveauxCalification } from '../niveaux-calification.model';

import { NiveauxCalificationService } from './niveaux-calification.service';

describe('Service Tests', () => {
  describe('NiveauxCalification Service', () => {
    let service: NiveauxCalificationService;
    let httpMock: HttpTestingController;
    let elemDefault: INiveauxCalification;
    let expectedResult: INiveauxCalification | INiveauxCalification[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(NiveauxCalificationService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        niveauCalification: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a NiveauxCalification', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new NiveauxCalification()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a NiveauxCalification', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            niveauCalification: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a NiveauxCalification', () => {
        const patchObject = Object.assign(
          {
            niveauCalification: 'BBBBBB',
          },
          new NiveauxCalification()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of NiveauxCalification', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            niveauCalification: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a NiveauxCalification', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addNiveauxCalificationToCollectionIfMissing', () => {
        it('should add a NiveauxCalification to an empty array', () => {
          const niveauxCalification: INiveauxCalification = { id: 123 };
          expectedResult = service.addNiveauxCalificationToCollectionIfMissing([], niveauxCalification);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(niveauxCalification);
        });

        it('should not add a NiveauxCalification to an array that contains it', () => {
          const niveauxCalification: INiveauxCalification = { id: 123 };
          const niveauxCalificationCollection: INiveauxCalification[] = [
            {
              ...niveauxCalification,
            },
            { id: 456 },
          ];
          expectedResult = service.addNiveauxCalificationToCollectionIfMissing(niveauxCalificationCollection, niveauxCalification);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a NiveauxCalification to an array that doesn't contain it", () => {
          const niveauxCalification: INiveauxCalification = { id: 123 };
          const niveauxCalificationCollection: INiveauxCalification[] = [{ id: 456 }];
          expectedResult = service.addNiveauxCalificationToCollectionIfMissing(niveauxCalificationCollection, niveauxCalification);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(niveauxCalification);
        });

        it('should add only unique NiveauxCalification to an array', () => {
          const niveauxCalificationArray: INiveauxCalification[] = [{ id: 123 }, { id: 456 }, { id: 56438 }];
          const niveauxCalificationCollection: INiveauxCalification[] = [{ id: 123 }];
          expectedResult = service.addNiveauxCalificationToCollectionIfMissing(niveauxCalificationCollection, ...niveauxCalificationArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const niveauxCalification: INiveauxCalification = { id: 123 };
          const niveauxCalification2: INiveauxCalification = { id: 456 };
          expectedResult = service.addNiveauxCalificationToCollectionIfMissing([], niveauxCalification, niveauxCalification2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(niveauxCalification);
          expect(expectedResult).toContain(niveauxCalification2);
        });

        it('should accept null and undefined values', () => {
          const niveauxCalification: INiveauxCalification = { id: 123 };
          expectedResult = service.addNiveauxCalificationToCollectionIfMissing([], null, niveauxCalification, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(niveauxCalification);
        });

        it('should return initial array if no NiveauxCalification is added', () => {
          const niveauxCalificationCollection: INiveauxCalification[] = [{ id: 123 }];
          expectedResult = service.addNiveauxCalificationToCollectionIfMissing(niveauxCalificationCollection, undefined, null);
          expect(expectedResult).toEqual(niveauxCalificationCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
