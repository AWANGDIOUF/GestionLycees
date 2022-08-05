import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TypeO } from 'app/entities/enumerations/type-o.model';
import { Fonctionnment } from 'app/entities/enumerations/fonctionnment.model';
import { IOrgane, Organe } from '../organe.model';

import { OrganeService } from './organe.service';

describe('Service Tests', () => {
  describe('Organe Service', () => {
    let service: OrganeService;
    let httpMock: HttpTestingController;
    let elemDefault: IOrgane;
    let expectedResult: IOrgane | IOrgane[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(OrganeService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        type: TypeO.CONSEIL_ETABLISSEEMENT,
        fonctionnel: Fonctionnment.OUI,
        description: 'AAAAAAA',
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

      it('should create a Organe', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Organe()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Organe', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            type: 'BBBBBB',
            fonctionnel: 'BBBBBB',
            description: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Organe', () => {
        const patchObject = Object.assign(
          {
            fonctionnel: 'BBBBBB',
          },
          new Organe()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Organe', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            type: 'BBBBBB',
            fonctionnel: 'BBBBBB',
            description: 'BBBBBB',
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

      it('should delete a Organe', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addOrganeToCollectionIfMissing', () => {
        it('should add a Organe to an empty array', () => {
          const organe: IOrgane = { id: 123 };
          expectedResult = service.addOrganeToCollectionIfMissing([], organe);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(organe);
        });

        it('should not add a Organe to an array that contains it', () => {
          const organe: IOrgane = { id: 123 };
          const organeCollection: IOrgane[] = [
            {
              ...organe,
            },
            { id: 456 },
          ];
          expectedResult = service.addOrganeToCollectionIfMissing(organeCollection, organe);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Organe to an array that doesn't contain it", () => {
          const organe: IOrgane = { id: 123 };
          const organeCollection: IOrgane[] = [{ id: 456 }];
          expectedResult = service.addOrganeToCollectionIfMissing(organeCollection, organe);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(organe);
        });

        it('should add only unique Organe to an array', () => {
          const organeArray: IOrgane[] = [{ id: 123 }, { id: 456 }, { id: 5799 }];
          const organeCollection: IOrgane[] = [{ id: 123 }];
          expectedResult = service.addOrganeToCollectionIfMissing(organeCollection, ...organeArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const organe: IOrgane = { id: 123 };
          const organe2: IOrgane = { id: 456 };
          expectedResult = service.addOrganeToCollectionIfMissing([], organe, organe2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(organe);
          expect(expectedResult).toContain(organe2);
        });

        it('should accept null and undefined values', () => {
          const organe: IOrgane = { id: 123 };
          expectedResult = service.addOrganeToCollectionIfMissing([], null, organe, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(organe);
        });

        it('should return initial array if no Organe is added', () => {
          const organeCollection: IOrgane[] = [{ id: 123 }];
          expectedResult = service.addOrganeToCollectionIfMissing(organeCollection, undefined, null);
          expect(expectedResult).toEqual(organeCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
