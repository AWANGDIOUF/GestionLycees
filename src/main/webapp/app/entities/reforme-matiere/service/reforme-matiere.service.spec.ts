import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Group } from 'app/entities/enumerations/group.model';
import { IReformeMatiere, ReformeMatiere } from '../reforme-matiere.model';

import { ReformeMatiereService } from './reforme-matiere.service';

describe('Service Tests', () => {
  describe('ReformeMatiere Service', () => {
    let service: ReformeMatiereService;
    let httpMock: HttpTestingController;
    let elemDefault: IReformeMatiere;
    let expectedResult: IReformeMatiere | IReformeMatiere[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ReformeMatiereService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        group: Group.GROUP1,
        designationDesmembreContentType: 'image/png',
        designationDesmembre: 'AAAAAAA',
        pvReformeContentType: 'image/png',
        pvReforme: 'AAAAAAA',
        sortieDefinitiveContentType: 'image/png',
        sortieDefinitive: 'AAAAAAA',
        certificatAdministratifContentType: 'image/png',
        certificatAdministratif: 'AAAAAAA',
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

      it('should create a ReformeMatiere', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ReformeMatiere()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ReformeMatiere', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            group: 'BBBBBB',
            designationDesmembre: 'BBBBBB',
            pvReforme: 'BBBBBB',
            sortieDefinitive: 'BBBBBB',
            certificatAdministratif: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a ReformeMatiere', () => {
        const patchObject = Object.assign(
          {
            sortieDefinitive: 'BBBBBB',
          },
          new ReformeMatiere()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ReformeMatiere', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            group: 'BBBBBB',
            designationDesmembre: 'BBBBBB',
            pvReforme: 'BBBBBB',
            sortieDefinitive: 'BBBBBB',
            certificatAdministratif: 'BBBBBB',
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

      it('should delete a ReformeMatiere', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addReformeMatiereToCollectionIfMissing', () => {
        it('should add a ReformeMatiere to an empty array', () => {
          const reformeMatiere: IReformeMatiere = { id: 123 };
          expectedResult = service.addReformeMatiereToCollectionIfMissing([], reformeMatiere);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(reformeMatiere);
        });

        it('should not add a ReformeMatiere to an array that contains it', () => {
          const reformeMatiere: IReformeMatiere = { id: 123 };
          const reformeMatiereCollection: IReformeMatiere[] = [
            {
              ...reformeMatiere,
            },
            { id: 456 },
          ];
          expectedResult = service.addReformeMatiereToCollectionIfMissing(reformeMatiereCollection, reformeMatiere);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a ReformeMatiere to an array that doesn't contain it", () => {
          const reformeMatiere: IReformeMatiere = { id: 123 };
          const reformeMatiereCollection: IReformeMatiere[] = [{ id: 456 }];
          expectedResult = service.addReformeMatiereToCollectionIfMissing(reformeMatiereCollection, reformeMatiere);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(reformeMatiere);
        });

        it('should add only unique ReformeMatiere to an array', () => {
          const reformeMatiereArray: IReformeMatiere[] = [{ id: 123 }, { id: 456 }, { id: 48802 }];
          const reformeMatiereCollection: IReformeMatiere[] = [{ id: 123 }];
          expectedResult = service.addReformeMatiereToCollectionIfMissing(reformeMatiereCollection, ...reformeMatiereArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const reformeMatiere: IReformeMatiere = { id: 123 };
          const reformeMatiere2: IReformeMatiere = { id: 456 };
          expectedResult = service.addReformeMatiereToCollectionIfMissing([], reformeMatiere, reformeMatiere2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(reformeMatiere);
          expect(expectedResult).toContain(reformeMatiere2);
        });

        it('should accept null and undefined values', () => {
          const reformeMatiere: IReformeMatiere = { id: 123 };
          expectedResult = service.addReformeMatiereToCollectionIfMissing([], null, reformeMatiere, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(reformeMatiere);
        });

        it('should return initial array if no ReformeMatiere is added', () => {
          const reformeMatiereCollection: IReformeMatiere[] = [{ id: 123 }];
          expectedResult = service.addReformeMatiereToCollectionIfMissing(reformeMatiereCollection, undefined, null);
          expect(expectedResult).toEqual(reformeMatiereCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
