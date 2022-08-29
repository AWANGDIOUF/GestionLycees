import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IComptableFinancier, ComptableFinancier } from '../comptable-financier.model';

import { ComptableFinancierService } from './comptable-financier.service';

describe('Service Tests', () => {
  describe('ComptableFinancier Service', () => {
    let service: ComptableFinancierService;
    let httpMock: HttpTestingController;
    let elemDefault: IComptableFinancier;
    let expectedResult: IComptableFinancier | IComptableFinancier[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ComptableFinancierService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nomPrenom: 'AAAAAAA',
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

      it('should create a ComptableFinancier', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ComptableFinancier()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ComptableFinancier', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nomPrenom: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a ComptableFinancier', () => {
        const patchObject = Object.assign(
          {
            nomPrenom: 'BBBBBB',
          },
          new ComptableFinancier()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ComptableFinancier', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nomPrenom: 'BBBBBB',
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

      it('should delete a ComptableFinancier', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addComptableFinancierToCollectionIfMissing', () => {
        it('should add a ComptableFinancier to an empty array', () => {
          const comptableFinancier: IComptableFinancier = { id: 123 };
          expectedResult = service.addComptableFinancierToCollectionIfMissing([], comptableFinancier);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(comptableFinancier);
        });

        it('should not add a ComptableFinancier to an array that contains it', () => {
          const comptableFinancier: IComptableFinancier = { id: 123 };
          const comptableFinancierCollection: IComptableFinancier[] = [
            {
              ...comptableFinancier,
            },
            { id: 456 },
          ];
          expectedResult = service.addComptableFinancierToCollectionIfMissing(comptableFinancierCollection, comptableFinancier);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a ComptableFinancier to an array that doesn't contain it", () => {
          const comptableFinancier: IComptableFinancier = { id: 123 };
          const comptableFinancierCollection: IComptableFinancier[] = [{ id: 456 }];
          expectedResult = service.addComptableFinancierToCollectionIfMissing(comptableFinancierCollection, comptableFinancier);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(comptableFinancier);
        });

        it('should add only unique ComptableFinancier to an array', () => {
          const comptableFinancierArray: IComptableFinancier[] = [{ id: 123 }, { id: 456 }, { id: 1705 }];
          const comptableFinancierCollection: IComptableFinancier[] = [{ id: 123 }];
          expectedResult = service.addComptableFinancierToCollectionIfMissing(comptableFinancierCollection, ...comptableFinancierArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const comptableFinancier: IComptableFinancier = { id: 123 };
          const comptableFinancier2: IComptableFinancier = { id: 456 };
          expectedResult = service.addComptableFinancierToCollectionIfMissing([], comptableFinancier, comptableFinancier2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(comptableFinancier);
          expect(expectedResult).toContain(comptableFinancier2);
        });

        it('should accept null and undefined values', () => {
          const comptableFinancier: IComptableFinancier = { id: 123 };
          expectedResult = service.addComptableFinancierToCollectionIfMissing([], null, comptableFinancier, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(comptableFinancier);
        });

        it('should return initial array if no ComptableFinancier is added', () => {
          const comptableFinancierCollection: IComptableFinancier[] = [{ id: 123 }];
          expectedResult = service.addComptableFinancierToCollectionIfMissing(comptableFinancierCollection, undefined, null);
          expect(expectedResult).toEqual(comptableFinancierCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
