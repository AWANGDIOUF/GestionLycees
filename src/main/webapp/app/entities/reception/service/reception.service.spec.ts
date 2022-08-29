import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { Group } from 'app/entities/enumerations/group.model';
import { ProvenanceMat } from 'app/entities/enumerations/provenance-mat.model';
import { IReception, Reception } from '../reception.model';

import { ReceptionService } from './reception.service';

describe('Service Tests', () => {
  describe('Reception Service', () => {
    let service: ReceptionService;
    let httpMock: HttpTestingController;
    let elemDefault: IReception;
    let expectedResult: IReception | IReception[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ReceptionService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        libelleMateriel: 'AAAAAAA',
        typeGroup: Group.GROUP1,
        provenance: ProvenanceMat.ETAT,
        fournisseur: 'AAAAAAA',
        date: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            date: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Reception', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            date: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.create(new Reception()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Reception', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            libelleMateriel: 'BBBBBB',
            typeGroup: 'BBBBBB',
            provenance: 'BBBBBB',
            fournisseur: 'BBBBBB',
            date: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Reception', () => {
        const patchObject = Object.assign(
          {
            typeGroup: 'BBBBBB',
            provenance: 'BBBBBB',
          },
          new Reception()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Reception', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            libelleMateriel: 'BBBBBB',
            typeGroup: 'BBBBBB',
            provenance: 'BBBBBB',
            fournisseur: 'BBBBBB',
            date: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Reception', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addReceptionToCollectionIfMissing', () => {
        it('should add a Reception to an empty array', () => {
          const reception: IReception = { id: 123 };
          expectedResult = service.addReceptionToCollectionIfMissing([], reception);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(reception);
        });

        it('should not add a Reception to an array that contains it', () => {
          const reception: IReception = { id: 123 };
          const receptionCollection: IReception[] = [
            {
              ...reception,
            },
            { id: 456 },
          ];
          expectedResult = service.addReceptionToCollectionIfMissing(receptionCollection, reception);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Reception to an array that doesn't contain it", () => {
          const reception: IReception = { id: 123 };
          const receptionCollection: IReception[] = [{ id: 456 }];
          expectedResult = service.addReceptionToCollectionIfMissing(receptionCollection, reception);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(reception);
        });

        it('should add only unique Reception to an array', () => {
          const receptionArray: IReception[] = [{ id: 123 }, { id: 456 }, { id: 54926 }];
          const receptionCollection: IReception[] = [{ id: 123 }];
          expectedResult = service.addReceptionToCollectionIfMissing(receptionCollection, ...receptionArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const reception: IReception = { id: 123 };
          const reception2: IReception = { id: 456 };
          expectedResult = service.addReceptionToCollectionIfMissing([], reception, reception2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(reception);
          expect(expectedResult).toContain(reception2);
        });

        it('should accept null and undefined values', () => {
          const reception: IReception = { id: 123 };
          expectedResult = service.addReceptionToCollectionIfMissing([], null, reception, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(reception);
        });

        it('should return initial array if no Reception is added', () => {
          const receptionCollection: IReception[] = [{ id: 123 }];
          expectedResult = service.addReceptionToCollectionIfMissing(receptionCollection, undefined, null);
          expect(expectedResult).toEqual(receptionCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
