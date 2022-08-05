import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Situation } from 'app/entities/enumerations/situation.model';
import { FonctionPersApp } from 'app/entities/enumerations/fonction-pers-app.model';
import { IPersonnelAppui, PersonnelAppui } from '../personnel-appui.model';

import { PersonnelAppuiService } from './personnel-appui.service';

describe('Service Tests', () => {
  describe('PersonnelAppui Service', () => {
    let service: PersonnelAppuiService;
    let httpMock: HttpTestingController;
    let elemDefault: IPersonnelAppui;
    let expectedResult: IPersonnelAppui | IPersonnelAppui[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(PersonnelAppuiService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nom: 'AAAAAAA',
        prenom: 'AAAAAAA',
        situationMatrimoniale: Situation.MARIE,
        fonction: FonctionPersApp.GARDIEN,
        autreFoction: 'AAAAAAA',
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

      it('should create a PersonnelAppui', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new PersonnelAppui()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PersonnelAppui', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            situationMatrimoniale: 'BBBBBB',
            fonction: 'BBBBBB',
            autreFoction: 'BBBBBB',
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

      it('should partial update a PersonnelAppui', () => {
        const patchObject = Object.assign(
          {
            nom: 'BBBBBB',
            situationMatrimoniale: 'BBBBBB',
            autreFoction: 'BBBBBB',
            mail: 'BBBBBB',
          },
          new PersonnelAppui()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PersonnelAppui', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            situationMatrimoniale: 'BBBBBB',
            fonction: 'BBBBBB',
            autreFoction: 'BBBBBB',
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

      it('should delete a PersonnelAppui', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addPersonnelAppuiToCollectionIfMissing', () => {
        it('should add a PersonnelAppui to an empty array', () => {
          const personnelAppui: IPersonnelAppui = { id: 123 };
          expectedResult = service.addPersonnelAppuiToCollectionIfMissing([], personnelAppui);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(personnelAppui);
        });

        it('should not add a PersonnelAppui to an array that contains it', () => {
          const personnelAppui: IPersonnelAppui = { id: 123 };
          const personnelAppuiCollection: IPersonnelAppui[] = [
            {
              ...personnelAppui,
            },
            { id: 456 },
          ];
          expectedResult = service.addPersonnelAppuiToCollectionIfMissing(personnelAppuiCollection, personnelAppui);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a PersonnelAppui to an array that doesn't contain it", () => {
          const personnelAppui: IPersonnelAppui = { id: 123 };
          const personnelAppuiCollection: IPersonnelAppui[] = [{ id: 456 }];
          expectedResult = service.addPersonnelAppuiToCollectionIfMissing(personnelAppuiCollection, personnelAppui);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(personnelAppui);
        });

        it('should add only unique PersonnelAppui to an array', () => {
          const personnelAppuiArray: IPersonnelAppui[] = [{ id: 123 }, { id: 456 }, { id: 17154 }];
          const personnelAppuiCollection: IPersonnelAppui[] = [{ id: 123 }];
          expectedResult = service.addPersonnelAppuiToCollectionIfMissing(personnelAppuiCollection, ...personnelAppuiArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const personnelAppui: IPersonnelAppui = { id: 123 };
          const personnelAppui2: IPersonnelAppui = { id: 456 };
          expectedResult = service.addPersonnelAppuiToCollectionIfMissing([], personnelAppui, personnelAppui2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(personnelAppui);
          expect(expectedResult).toContain(personnelAppui2);
        });

        it('should accept null and undefined values', () => {
          const personnelAppui: IPersonnelAppui = { id: 123 };
          expectedResult = service.addPersonnelAppuiToCollectionIfMissing([], null, personnelAppui, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(personnelAppui);
        });

        it('should return initial array if no PersonnelAppui is added', () => {
          const personnelAppuiCollection: IPersonnelAppui[] = [{ id: 123 }];
          expectedResult = service.addPersonnelAppuiToCollectionIfMissing(personnelAppuiCollection, undefined, null);
          expect(expectedResult).toEqual(personnelAppuiCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
