import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILyceesTechniques, LyceesTechniques } from '../lycees-techniques.model';

import { LyceesTechniquesService } from './lycees-techniques.service';

describe('Service Tests', () => {
  describe('LyceesTechniques Service', () => {
    let service: LyceesTechniquesService;
    let httpMock: HttpTestingController;
    let elemDefault: ILyceesTechniques;
    let expectedResult: ILyceesTechniques | ILyceesTechniques[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(LyceesTechniquesService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nomLycee: 'AAAAAAA',
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

      it('should create a LyceesTechniques', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new LyceesTechniques()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a LyceesTechniques', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nomLycee: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a LyceesTechniques', () => {
        const patchObject = Object.assign({}, new LyceesTechniques());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of LyceesTechniques', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nomLycee: 'BBBBBB',
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

      it('should delete a LyceesTechniques', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addLyceesTechniquesToCollectionIfMissing', () => {
        it('should add a LyceesTechniques to an empty array', () => {
          const lyceesTechniques: ILyceesTechniques = { id: 123 };
          expectedResult = service.addLyceesTechniquesToCollectionIfMissing([], lyceesTechniques);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(lyceesTechniques);
        });

        it('should not add a LyceesTechniques to an array that contains it', () => {
          const lyceesTechniques: ILyceesTechniques = { id: 123 };
          const lyceesTechniquesCollection: ILyceesTechniques[] = [
            {
              ...lyceesTechniques,
            },
            { id: 456 },
          ];
          expectedResult = service.addLyceesTechniquesToCollectionIfMissing(lyceesTechniquesCollection, lyceesTechniques);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a LyceesTechniques to an array that doesn't contain it", () => {
          const lyceesTechniques: ILyceesTechniques = { id: 123 };
          const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 456 }];
          expectedResult = service.addLyceesTechniquesToCollectionIfMissing(lyceesTechniquesCollection, lyceesTechniques);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(lyceesTechniques);
        });

        it('should add only unique LyceesTechniques to an array', () => {
          const lyceesTechniquesArray: ILyceesTechniques[] = [{ id: 123 }, { id: 456 }, { id: 75271 }];
          const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 123 }];
          expectedResult = service.addLyceesTechniquesToCollectionIfMissing(lyceesTechniquesCollection, ...lyceesTechniquesArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const lyceesTechniques: ILyceesTechniques = { id: 123 };
          const lyceesTechniques2: ILyceesTechniques = { id: 456 };
          expectedResult = service.addLyceesTechniquesToCollectionIfMissing([], lyceesTechniques, lyceesTechniques2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(lyceesTechniques);
          expect(expectedResult).toContain(lyceesTechniques2);
        });

        it('should accept null and undefined values', () => {
          const lyceesTechniques: ILyceesTechniques = { id: 123 };
          expectedResult = service.addLyceesTechniquesToCollectionIfMissing([], null, lyceesTechniques, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(lyceesTechniques);
        });

        it('should return initial array if no LyceesTechniques is added', () => {
          const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 123 }];
          expectedResult = service.addLyceesTechniquesToCollectionIfMissing(lyceesTechniquesCollection, undefined, null);
          expect(expectedResult).toEqual(lyceesTechniquesCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
