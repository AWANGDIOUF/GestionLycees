import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Situation } from 'app/entities/enumerations/situation.model';
import { FonctionPersAd } from 'app/entities/enumerations/fonction-pers-ad.model';
import { IPersonnelAdministratif, PersonnelAdministratif } from '../personnel-administratif.model';

import { PersonnelAdministratifService } from './personnel-administratif.service';

describe('Service Tests', () => {
  describe('PersonnelAdministratif Service', () => {
    let service: PersonnelAdministratifService;
    let httpMock: HttpTestingController;
    let elemDefault: IPersonnelAdministratif;
    let expectedResult: IPersonnelAdministratif | IPersonnelAdministratif[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(PersonnelAdministratifService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        matricule: 'AAAAAAA',
        nom: 'AAAAAAA',
        prenom: 'AAAAAAA',
        situationMatrimoniale: Situation.MARIE,
        fonction: FonctionPersAd.PROVISEUR,
        autreFonction: 'AAAAAAA',
        telephone: 'AAAAAAA',
        mail: 'AAAAAAA',
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

      it('should create a PersonnelAdministratif', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new PersonnelAdministratif()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PersonnelAdministratif', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            matricule: 'BBBBBB',
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            situationMatrimoniale: 'BBBBBB',
            fonction: 'BBBBBB',
            autreFonction: 'BBBBBB',
            telephone: 'BBBBBB',
            mail: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a PersonnelAdministratif', () => {
        const patchObject = Object.assign(
          {
            prenom: 'BBBBBB',
            fonction: 'BBBBBB',
            autreFonction: 'BBBBBB',
            mail: 'BBBBBB',
          },
          new PersonnelAdministratif()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PersonnelAdministratif', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            matricule: 'BBBBBB',
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            situationMatrimoniale: 'BBBBBB',
            fonction: 'BBBBBB',
            autreFonction: 'BBBBBB',
            telephone: 'BBBBBB',
            mail: 'BBBBBB',
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

      it('should delete a PersonnelAdministratif', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addPersonnelAdministratifToCollectionIfMissing', () => {
        it('should add a PersonnelAdministratif to an empty array', () => {
          const personnelAdministratif: IPersonnelAdministratif = { id: 123 };
          expectedResult = service.addPersonnelAdministratifToCollectionIfMissing([], personnelAdministratif);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(personnelAdministratif);
        });

        it('should not add a PersonnelAdministratif to an array that contains it', () => {
          const personnelAdministratif: IPersonnelAdministratif = { id: 123 };
          const personnelAdministratifCollection: IPersonnelAdministratif[] = [
            {
              ...personnelAdministratif,
            },
            { id: 456 },
          ];
          expectedResult = service.addPersonnelAdministratifToCollectionIfMissing(personnelAdministratifCollection, personnelAdministratif);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a PersonnelAdministratif to an array that doesn't contain it", () => {
          const personnelAdministratif: IPersonnelAdministratif = { id: 123 };
          const personnelAdministratifCollection: IPersonnelAdministratif[] = [{ id: 456 }];
          expectedResult = service.addPersonnelAdministratifToCollectionIfMissing(personnelAdministratifCollection, personnelAdministratif);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(personnelAdministratif);
        });

        it('should add only unique PersonnelAdministratif to an array', () => {
          const personnelAdministratifArray: IPersonnelAdministratif[] = [{ id: 123 }, { id: 456 }, { id: 18251 }];
          const personnelAdministratifCollection: IPersonnelAdministratif[] = [{ id: 123 }];
          expectedResult = service.addPersonnelAdministratifToCollectionIfMissing(
            personnelAdministratifCollection,
            ...personnelAdministratifArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const personnelAdministratif: IPersonnelAdministratif = { id: 123 };
          const personnelAdministratif2: IPersonnelAdministratif = { id: 456 };
          expectedResult = service.addPersonnelAdministratifToCollectionIfMissing([], personnelAdministratif, personnelAdministratif2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(personnelAdministratif);
          expect(expectedResult).toContain(personnelAdministratif2);
        });

        it('should accept null and undefined values', () => {
          const personnelAdministratif: IPersonnelAdministratif = { id: 123 };
          expectedResult = service.addPersonnelAdministratifToCollectionIfMissing([], null, personnelAdministratif, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(personnelAdministratif);
        });

        it('should return initial array if no PersonnelAdministratif is added', () => {
          const personnelAdministratifCollection: IPersonnelAdministratif[] = [{ id: 123 }];
          expectedResult = service.addPersonnelAdministratifToCollectionIfMissing(personnelAdministratifCollection, undefined, null);
          expect(expectedResult).toEqual(personnelAdministratifCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
