import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TypeDepense } from 'app/entities/enumerations/type-depense.model';
import { IDepense, Depense } from '../depense.model';

import { DepenseService } from './depense.service';

describe('Service Tests', () => {
  describe('Depense Service', () => {
    let service: DepenseService;
    let httpMock: HttpTestingController;
    let elemDefault: IDepense;
    let expectedResult: IDepense | IDepense[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DepenseService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        typeDepense: TypeDepense.INVESTISSEMENT,
        autreDepense: 'AAAAAAA',
        description: 'AAAAAAA',
        montantDepense: 'AAAAAAA',
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

      it('should create a Depense', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Depense()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Depense', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            typeDepense: 'BBBBBB',
            autreDepense: 'BBBBBB',
            description: 'BBBBBB',
            montantDepense: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Depense', () => {
        const patchObject = Object.assign(
          {
            montantDepense: 'BBBBBB',
          },
          new Depense()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Depense', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            typeDepense: 'BBBBBB',
            autreDepense: 'BBBBBB',
            description: 'BBBBBB',
            montantDepense: 'BBBBBB',
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

      it('should delete a Depense', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addDepenseToCollectionIfMissing', () => {
        it('should add a Depense to an empty array', () => {
          const depense: IDepense = { id: 123 };
          expectedResult = service.addDepenseToCollectionIfMissing([], depense);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(depense);
        });

        it('should not add a Depense to an array that contains it', () => {
          const depense: IDepense = { id: 123 };
          const depenseCollection: IDepense[] = [
            {
              ...depense,
            },
            { id: 456 },
          ];
          expectedResult = service.addDepenseToCollectionIfMissing(depenseCollection, depense);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Depense to an array that doesn't contain it", () => {
          const depense: IDepense = { id: 123 };
          const depenseCollection: IDepense[] = [{ id: 456 }];
          expectedResult = service.addDepenseToCollectionIfMissing(depenseCollection, depense);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(depense);
        });

        it('should add only unique Depense to an array', () => {
          const depenseArray: IDepense[] = [{ id: 123 }, { id: 456 }, { id: 15614 }];
          const depenseCollection: IDepense[] = [{ id: 123 }];
          expectedResult = service.addDepenseToCollectionIfMissing(depenseCollection, ...depenseArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const depense: IDepense = { id: 123 };
          const depense2: IDepense = { id: 456 };
          expectedResult = service.addDepenseToCollectionIfMissing([], depense, depense2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(depense);
          expect(expectedResult).toContain(depense2);
        });

        it('should accept null and undefined values', () => {
          const depense: IDepense = { id: 123 };
          expectedResult = service.addDepenseToCollectionIfMissing([], null, depense, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(depense);
        });

        it('should return initial array if no Depense is added', () => {
          const depenseCollection: IDepense[] = [{ id: 123 }];
          expectedResult = service.addDepenseToCollectionIfMissing(depenseCollection, undefined, null);
          expect(expectedResult).toEqual(depenseCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
