import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { TypeO } from 'app/entities/enumerations/type-o.model';
import { Fonctionnment } from 'app/entities/enumerations/fonctionnment.model';
import { IOrganeGestion, OrganeGestion } from '../organe-gestion.model';

import { OrganeGestionService } from './organe-gestion.service';

describe('Service Tests', () => {
  describe('OrganeGestion Service', () => {
    let service: OrganeGestionService;
    let httpMock: HttpTestingController;
    let elemDefault: IOrganeGestion;
    let expectedResult: IOrganeGestion | IOrganeGestion[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(OrganeGestionService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        type: TypeO.CONSEIL_ADMINISTRATION,
        autreType: 'AAAAAAA',
        fonctionnel: Fonctionnment.OUI,
        activite: 'AAAAAAA',
        dateActivite: currentDate,
        rapportContentType: 'image/png',
        rapport: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateActivite: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a OrganeGestion', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateActivite: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateActivite: currentDate,
          },
          returnedFromService
        );

        service.create(new OrganeGestion()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a OrganeGestion', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            type: 'BBBBBB',
            autreType: 'BBBBBB',
            fonctionnel: 'BBBBBB',
            activite: 'BBBBBB',
            dateActivite: currentDate.format(DATE_FORMAT),
            rapport: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateActivite: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a OrganeGestion', () => {
        const patchObject = Object.assign(
          {
            autreType: 'BBBBBB',
            dateActivite: currentDate.format(DATE_FORMAT),
            rapport: 'BBBBBB',
          },
          new OrganeGestion()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateActivite: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of OrganeGestion', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            type: 'BBBBBB',
            autreType: 'BBBBBB',
            fonctionnel: 'BBBBBB',
            activite: 'BBBBBB',
            dateActivite: currentDate.format(DATE_FORMAT),
            rapport: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateActivite: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a OrganeGestion', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addOrganeGestionToCollectionIfMissing', () => {
        it('should add a OrganeGestion to an empty array', () => {
          const organeGestion: IOrganeGestion = { id: 123 };
          expectedResult = service.addOrganeGestionToCollectionIfMissing([], organeGestion);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(organeGestion);
        });

        it('should not add a OrganeGestion to an array that contains it', () => {
          const organeGestion: IOrganeGestion = { id: 123 };
          const organeGestionCollection: IOrganeGestion[] = [
            {
              ...organeGestion,
            },
            { id: 456 },
          ];
          expectedResult = service.addOrganeGestionToCollectionIfMissing(organeGestionCollection, organeGestion);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a OrganeGestion to an array that doesn't contain it", () => {
          const organeGestion: IOrganeGestion = { id: 123 };
          const organeGestionCollection: IOrganeGestion[] = [{ id: 456 }];
          expectedResult = service.addOrganeGestionToCollectionIfMissing(organeGestionCollection, organeGestion);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(organeGestion);
        });

        it('should add only unique OrganeGestion to an array', () => {
          const organeGestionArray: IOrganeGestion[] = [{ id: 123 }, { id: 456 }, { id: 63349 }];
          const organeGestionCollection: IOrganeGestion[] = [{ id: 123 }];
          expectedResult = service.addOrganeGestionToCollectionIfMissing(organeGestionCollection, ...organeGestionArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const organeGestion: IOrganeGestion = { id: 123 };
          const organeGestion2: IOrganeGestion = { id: 456 };
          expectedResult = service.addOrganeGestionToCollectionIfMissing([], organeGestion, organeGestion2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(organeGestion);
          expect(expectedResult).toContain(organeGestion2);
        });

        it('should accept null and undefined values', () => {
          const organeGestion: IOrganeGestion = { id: 123 };
          expectedResult = service.addOrganeGestionToCollectionIfMissing([], null, organeGestion, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(organeGestion);
        });

        it('should return initial array if no OrganeGestion is added', () => {
          const organeGestionCollection: IOrganeGestion[] = [{ id: 123 }];
          expectedResult = service.addOrganeGestionToCollectionIfMissing(organeGestionCollection, undefined, null);
          expect(expectedResult).toEqual(organeGestionCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
