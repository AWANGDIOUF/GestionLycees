import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IComptableMatiere, ComptableMatiere } from '../comptable-matiere.model';

import { ComptableMatiereService } from './comptable-matiere.service';

describe('Service Tests', () => {
  describe('ComptableMatiere Service', () => {
    let service: ComptableMatiereService;
    let httpMock: HttpTestingController;
    let elemDefault: IComptableMatiere;
    let expectedResult: IComptableMatiere | IComptableMatiere[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ComptableMatiereService);
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

      it('should create a ComptableMatiere', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ComptableMatiere()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ComptableMatiere', () => {
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

      it('should partial update a ComptableMatiere', () => {
        const patchObject = Object.assign({}, new ComptableMatiere());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ComptableMatiere', () => {
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

      it('should delete a ComptableMatiere', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addComptableMatiereToCollectionIfMissing', () => {
        it('should add a ComptableMatiere to an empty array', () => {
          const comptableMatiere: IComptableMatiere = { id: 123 };
          expectedResult = service.addComptableMatiereToCollectionIfMissing([], comptableMatiere);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(comptableMatiere);
        });

        it('should not add a ComptableMatiere to an array that contains it', () => {
          const comptableMatiere: IComptableMatiere = { id: 123 };
          const comptableMatiereCollection: IComptableMatiere[] = [
            {
              ...comptableMatiere,
            },
            { id: 456 },
          ];
          expectedResult = service.addComptableMatiereToCollectionIfMissing(comptableMatiereCollection, comptableMatiere);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a ComptableMatiere to an array that doesn't contain it", () => {
          const comptableMatiere: IComptableMatiere = { id: 123 };
          const comptableMatiereCollection: IComptableMatiere[] = [{ id: 456 }];
          expectedResult = service.addComptableMatiereToCollectionIfMissing(comptableMatiereCollection, comptableMatiere);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(comptableMatiere);
        });

        it('should add only unique ComptableMatiere to an array', () => {
          const comptableMatiereArray: IComptableMatiere[] = [{ id: 123 }, { id: 456 }, { id: 1187 }];
          const comptableMatiereCollection: IComptableMatiere[] = [{ id: 123 }];
          expectedResult = service.addComptableMatiereToCollectionIfMissing(comptableMatiereCollection, ...comptableMatiereArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const comptableMatiere: IComptableMatiere = { id: 123 };
          const comptableMatiere2: IComptableMatiere = { id: 456 };
          expectedResult = service.addComptableMatiereToCollectionIfMissing([], comptableMatiere, comptableMatiere2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(comptableMatiere);
          expect(expectedResult).toContain(comptableMatiere2);
        });

        it('should accept null and undefined values', () => {
          const comptableMatiere: IComptableMatiere = { id: 123 };
          expectedResult = service.addComptableMatiereToCollectionIfMissing([], null, comptableMatiere, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(comptableMatiere);
        });

        it('should return initial array if no ComptableMatiere is added', () => {
          const comptableMatiereCollection: IComptableMatiere[] = [{ id: 123 }];
          expectedResult = service.addComptableMatiereToCollectionIfMissing(comptableMatiereCollection, undefined, null);
          expect(expectedResult).toEqual(comptableMatiereCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
