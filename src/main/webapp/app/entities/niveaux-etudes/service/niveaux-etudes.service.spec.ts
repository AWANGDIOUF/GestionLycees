import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INiveauxEtudes, NiveauxEtudes } from '../niveaux-etudes.model';

import { NiveauxEtudesService } from './niveaux-etudes.service';

describe('Service Tests', () => {
  describe('NiveauxEtudes Service', () => {
    let service: NiveauxEtudesService;
    let httpMock: HttpTestingController;
    let elemDefault: INiveauxEtudes;
    let expectedResult: INiveauxEtudes | INiveauxEtudes[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(NiveauxEtudesService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nomNiveau: 'AAAAAAA',
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

      it('should create a NiveauxEtudes', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new NiveauxEtudes()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a NiveauxEtudes', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nomNiveau: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a NiveauxEtudes', () => {
        const patchObject = Object.assign(
          {
            nomNiveau: 'BBBBBB',
          },
          new NiveauxEtudes()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of NiveauxEtudes', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nomNiveau: 'BBBBBB',
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

      it('should delete a NiveauxEtudes', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addNiveauxEtudesToCollectionIfMissing', () => {
        it('should add a NiveauxEtudes to an empty array', () => {
          const niveauxEtudes: INiveauxEtudes = { id: 123 };
          expectedResult = service.addNiveauxEtudesToCollectionIfMissing([], niveauxEtudes);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(niveauxEtudes);
        });

        it('should not add a NiveauxEtudes to an array that contains it', () => {
          const niveauxEtudes: INiveauxEtudes = { id: 123 };
          const niveauxEtudesCollection: INiveauxEtudes[] = [
            {
              ...niveauxEtudes,
            },
            { id: 456 },
          ];
          expectedResult = service.addNiveauxEtudesToCollectionIfMissing(niveauxEtudesCollection, niveauxEtudes);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a NiveauxEtudes to an array that doesn't contain it", () => {
          const niveauxEtudes: INiveauxEtudes = { id: 123 };
          const niveauxEtudesCollection: INiveauxEtudes[] = [{ id: 456 }];
          expectedResult = service.addNiveauxEtudesToCollectionIfMissing(niveauxEtudesCollection, niveauxEtudes);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(niveauxEtudes);
        });

        it('should add only unique NiveauxEtudes to an array', () => {
          const niveauxEtudesArray: INiveauxEtudes[] = [{ id: 123 }, { id: 456 }, { id: 69346 }];
          const niveauxEtudesCollection: INiveauxEtudes[] = [{ id: 123 }];
          expectedResult = service.addNiveauxEtudesToCollectionIfMissing(niveauxEtudesCollection, ...niveauxEtudesArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const niveauxEtudes: INiveauxEtudes = { id: 123 };
          const niveauxEtudes2: INiveauxEtudes = { id: 456 };
          expectedResult = service.addNiveauxEtudesToCollectionIfMissing([], niveauxEtudes, niveauxEtudes2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(niveauxEtudes);
          expect(expectedResult).toContain(niveauxEtudes2);
        });

        it('should accept null and undefined values', () => {
          const niveauxEtudes: INiveauxEtudes = { id: 123 };
          expectedResult = service.addNiveauxEtudesToCollectionIfMissing([], null, niveauxEtudes, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(niveauxEtudes);
        });

        it('should return initial array if no NiveauxEtudes is added', () => {
          const niveauxEtudesCollection: INiveauxEtudes[] = [{ id: 123 }];
          expectedResult = service.addNiveauxEtudesToCollectionIfMissing(niveauxEtudesCollection, undefined, null);
          expect(expectedResult).toEqual(niveauxEtudesCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
