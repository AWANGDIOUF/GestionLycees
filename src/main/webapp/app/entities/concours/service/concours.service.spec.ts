import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IConcours, Concours } from '../concours.model';

import { ConcoursService } from './concours.service';

describe('Service Tests', () => {
  describe('Concours Service', () => {
    let service: ConcoursService;
    let httpMock: HttpTestingController;
    let elemDefault: IConcours;
    let expectedResult: IConcours | IConcours[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ConcoursService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        nomConcours: 'AAAAAAA',
        dateOuverture: currentDate,
        dateCloture: currentDate,
        nbreCandidats: 0,
        dateConcours: currentDate,
        dateDeliberation: currentDate,
        nbreAdmis: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateOuverture: currentDate.format(DATE_FORMAT),
            dateCloture: currentDate.format(DATE_FORMAT),
            dateConcours: currentDate.format(DATE_FORMAT),
            dateDeliberation: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Concours', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateOuverture: currentDate.format(DATE_FORMAT),
            dateCloture: currentDate.format(DATE_FORMAT),
            dateConcours: currentDate.format(DATE_FORMAT),
            dateDeliberation: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateOuverture: currentDate,
            dateCloture: currentDate,
            dateConcours: currentDate,
            dateDeliberation: currentDate,
          },
          returnedFromService
        );

        service.create(new Concours()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Concours', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nomConcours: 'BBBBBB',
            dateOuverture: currentDate.format(DATE_FORMAT),
            dateCloture: currentDate.format(DATE_FORMAT),
            nbreCandidats: 1,
            dateConcours: currentDate.format(DATE_FORMAT),
            dateDeliberation: currentDate.format(DATE_FORMAT),
            nbreAdmis: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateOuverture: currentDate,
            dateCloture: currentDate,
            dateConcours: currentDate,
            dateDeliberation: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Concours', () => {
        const patchObject = Object.assign(
          {
            nomConcours: 'BBBBBB',
            dateOuverture: currentDate.format(DATE_FORMAT),
            dateConcours: currentDate.format(DATE_FORMAT),
            dateDeliberation: currentDate.format(DATE_FORMAT),
          },
          new Concours()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateOuverture: currentDate,
            dateCloture: currentDate,
            dateConcours: currentDate,
            dateDeliberation: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Concours', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nomConcours: 'BBBBBB',
            dateOuverture: currentDate.format(DATE_FORMAT),
            dateCloture: currentDate.format(DATE_FORMAT),
            nbreCandidats: 1,
            dateConcours: currentDate.format(DATE_FORMAT),
            dateDeliberation: currentDate.format(DATE_FORMAT),
            nbreAdmis: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateOuverture: currentDate,
            dateCloture: currentDate,
            dateConcours: currentDate,
            dateDeliberation: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Concours', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addConcoursToCollectionIfMissing', () => {
        it('should add a Concours to an empty array', () => {
          const concours: IConcours = { id: 123 };
          expectedResult = service.addConcoursToCollectionIfMissing([], concours);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(concours);
        });

        it('should not add a Concours to an array that contains it', () => {
          const concours: IConcours = { id: 123 };
          const concoursCollection: IConcours[] = [
            {
              ...concours,
            },
            { id: 456 },
          ];
          expectedResult = service.addConcoursToCollectionIfMissing(concoursCollection, concours);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Concours to an array that doesn't contain it", () => {
          const concours: IConcours = { id: 123 };
          const concoursCollection: IConcours[] = [{ id: 456 }];
          expectedResult = service.addConcoursToCollectionIfMissing(concoursCollection, concours);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(concours);
        });

        it('should add only unique Concours to an array', () => {
          const concoursArray: IConcours[] = [{ id: 123 }, { id: 456 }, { id: 76291 }];
          const concoursCollection: IConcours[] = [{ id: 123 }];
          expectedResult = service.addConcoursToCollectionIfMissing(concoursCollection, ...concoursArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const concours: IConcours = { id: 123 };
          const concours2: IConcours = { id: 456 };
          expectedResult = service.addConcoursToCollectionIfMissing([], concours, concours2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(concours);
          expect(expectedResult).toContain(concours2);
        });

        it('should accept null and undefined values', () => {
          const concours: IConcours = { id: 123 };
          expectedResult = service.addConcoursToCollectionIfMissing([], null, concours, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(concours);
        });

        it('should return initial array if no Concours is added', () => {
          const concoursCollection: IConcours[] = [{ id: 123 }];
          expectedResult = service.addConcoursToCollectionIfMissing(concoursCollection, undefined, null);
          expect(expectedResult).toEqual(concoursCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
