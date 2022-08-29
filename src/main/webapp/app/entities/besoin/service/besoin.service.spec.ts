import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TypeB } from 'app/entities/enumerations/type-b.model';
import { IBesoin, Besoin } from '../besoin.model';

import { BesoinService } from './besoin.service';

describe('Service Tests', () => {
  describe('Besoin Service', () => {
    let service: BesoinService;
    let httpMock: HttpTestingController;
    let elemDefault: IBesoin;
    let expectedResult: IBesoin | IBesoin[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(BesoinService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        type: TypeB.PERSONNEL_APPOINT,
        autreBesoin: 'AAAAAAA',
        designation: 'AAAAAAA',
        etatActuel: 'AAAAAAA',
        interventionSouhaitee: 'AAAAAAA',
        justification: 'AAAAAAA',
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

      it('should create a Besoin', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Besoin()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Besoin', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            type: 'BBBBBB',
            autreBesoin: 'BBBBBB',
            designation: 'BBBBBB',
            etatActuel: 'BBBBBB',
            interventionSouhaitee: 'BBBBBB',
            justification: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Besoin', () => {
        const patchObject = Object.assign(
          {
            type: 'BBBBBB',
            designation: 'BBBBBB',
            justification: 'BBBBBB',
          },
          new Besoin()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Besoin', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            type: 'BBBBBB',
            autreBesoin: 'BBBBBB',
            designation: 'BBBBBB',
            etatActuel: 'BBBBBB',
            interventionSouhaitee: 'BBBBBB',
            justification: 'BBBBBB',
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

      it('should delete a Besoin', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addBesoinToCollectionIfMissing', () => {
        it('should add a Besoin to an empty array', () => {
          const besoin: IBesoin = { id: 123 };
          expectedResult = service.addBesoinToCollectionIfMissing([], besoin);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(besoin);
        });

        it('should not add a Besoin to an array that contains it', () => {
          const besoin: IBesoin = { id: 123 };
          const besoinCollection: IBesoin[] = [
            {
              ...besoin,
            },
            { id: 456 },
          ];
          expectedResult = service.addBesoinToCollectionIfMissing(besoinCollection, besoin);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Besoin to an array that doesn't contain it", () => {
          const besoin: IBesoin = { id: 123 };
          const besoinCollection: IBesoin[] = [{ id: 456 }];
          expectedResult = service.addBesoinToCollectionIfMissing(besoinCollection, besoin);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(besoin);
        });

        it('should add only unique Besoin to an array', () => {
          const besoinArray: IBesoin[] = [{ id: 123 }, { id: 456 }, { id: 96599 }];
          const besoinCollection: IBesoin[] = [{ id: 123 }];
          expectedResult = service.addBesoinToCollectionIfMissing(besoinCollection, ...besoinArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const besoin: IBesoin = { id: 123 };
          const besoin2: IBesoin = { id: 456 };
          expectedResult = service.addBesoinToCollectionIfMissing([], besoin, besoin2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(besoin);
          expect(expectedResult).toContain(besoin2);
        });

        it('should accept null and undefined values', () => {
          const besoin: IBesoin = { id: 123 };
          expectedResult = service.addBesoinToCollectionIfMissing([], null, besoin, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(besoin);
        });

        it('should return initial array if no Besoin is added', () => {
          const besoinCollection: IBesoin[] = [{ id: 123 }];
          expectedResult = service.addBesoinToCollectionIfMissing(besoinCollection, undefined, null);
          expect(expectedResult).toEqual(besoinCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
