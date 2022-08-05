import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Group } from 'app/entities/enumerations/group.model';
import { IIventaireDesMatetiere, IventaireDesMatetiere } from '../iventaire-des-matetiere.model';

import { IventaireDesMatetiereService } from './iventaire-des-matetiere.service';

describe('Service Tests', () => {
  describe('IventaireDesMatetiere Service', () => {
    let service: IventaireDesMatetiereService;
    let httpMock: HttpTestingController;
    let elemDefault: IIventaireDesMatetiere;
    let expectedResult: IIventaireDesMatetiere | IIventaireDesMatetiere[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(IventaireDesMatetiereService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        group: Group.GROUP1,
        designationMembreContentType: 'image/png',
        designationMembre: 'AAAAAAA',
        pvDinventaireContentType: 'image/png',
        pvDinventaire: 'AAAAAAA',
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

      it('should create a IventaireDesMatetiere', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new IventaireDesMatetiere()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a IventaireDesMatetiere', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            group: 'BBBBBB',
            designationMembre: 'BBBBBB',
            pvDinventaire: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a IventaireDesMatetiere', () => {
        const patchObject = Object.assign(
          {
            group: 'BBBBBB',
            pvDinventaire: 'BBBBBB',
          },
          new IventaireDesMatetiere()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of IventaireDesMatetiere', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            group: 'BBBBBB',
            designationMembre: 'BBBBBB',
            pvDinventaire: 'BBBBBB',
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

      it('should delete a IventaireDesMatetiere', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addIventaireDesMatetiereToCollectionIfMissing', () => {
        it('should add a IventaireDesMatetiere to an empty array', () => {
          const iventaireDesMatetiere: IIventaireDesMatetiere = { id: 123 };
          expectedResult = service.addIventaireDesMatetiereToCollectionIfMissing([], iventaireDesMatetiere);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(iventaireDesMatetiere);
        });

        it('should not add a IventaireDesMatetiere to an array that contains it', () => {
          const iventaireDesMatetiere: IIventaireDesMatetiere = { id: 123 };
          const iventaireDesMatetiereCollection: IIventaireDesMatetiere[] = [
            {
              ...iventaireDesMatetiere,
            },
            { id: 456 },
          ];
          expectedResult = service.addIventaireDesMatetiereToCollectionIfMissing(iventaireDesMatetiereCollection, iventaireDesMatetiere);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a IventaireDesMatetiere to an array that doesn't contain it", () => {
          const iventaireDesMatetiere: IIventaireDesMatetiere = { id: 123 };
          const iventaireDesMatetiereCollection: IIventaireDesMatetiere[] = [{ id: 456 }];
          expectedResult = service.addIventaireDesMatetiereToCollectionIfMissing(iventaireDesMatetiereCollection, iventaireDesMatetiere);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(iventaireDesMatetiere);
        });

        it('should add only unique IventaireDesMatetiere to an array', () => {
          const iventaireDesMatetiereArray: IIventaireDesMatetiere[] = [{ id: 123 }, { id: 456 }, { id: 88081 }];
          const iventaireDesMatetiereCollection: IIventaireDesMatetiere[] = [{ id: 123 }];
          expectedResult = service.addIventaireDesMatetiereToCollectionIfMissing(
            iventaireDesMatetiereCollection,
            ...iventaireDesMatetiereArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const iventaireDesMatetiere: IIventaireDesMatetiere = { id: 123 };
          const iventaireDesMatetiere2: IIventaireDesMatetiere = { id: 456 };
          expectedResult = service.addIventaireDesMatetiereToCollectionIfMissing([], iventaireDesMatetiere, iventaireDesMatetiere2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(iventaireDesMatetiere);
          expect(expectedResult).toContain(iventaireDesMatetiere2);
        });

        it('should accept null and undefined values', () => {
          const iventaireDesMatetiere: IIventaireDesMatetiere = { id: 123 };
          expectedResult = service.addIventaireDesMatetiereToCollectionIfMissing([], null, iventaireDesMatetiere, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(iventaireDesMatetiere);
        });

        it('should return initial array if no IventaireDesMatetiere is added', () => {
          const iventaireDesMatetiereCollection: IIventaireDesMatetiere[] = [{ id: 123 }];
          expectedResult = service.addIventaireDesMatetiereToCollectionIfMissing(iventaireDesMatetiereCollection, undefined, null);
          expect(expectedResult).toEqual(iventaireDesMatetiereCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
