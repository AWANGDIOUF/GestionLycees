import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { TypeR } from 'app/entities/enumerations/type-r.model';
import { IRecette, Recette } from '../recette.model';

import { RecetteService } from './recette.service';

describe('Service Tests', () => {
  describe('Recette Service', () => {
    let service: RecetteService;
    let httpMock: HttpTestingController;
    let elemDefault: IRecette;
    let expectedResult: IRecette | IRecette[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(RecetteService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        type: TypeR.SUBVENTION_ETAT,
        autreRecette: 'AAAAAAA',
        typeRessource: 'AAAAAAA',
        montant: 'AAAAAAA',
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

      it('should create a Recette', () => {
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

        service.create(new Recette()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Recette', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            type: 'BBBBBB',
            autreRecette: 'BBBBBB',
            typeRessource: 'BBBBBB',
            montant: 'BBBBBB',
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

      it('should partial update a Recette', () => {
        const patchObject = Object.assign(
          {
            autreRecette: 'BBBBBB',
            typeRessource: 'BBBBBB',
            montant: 'BBBBBB',
          },
          new Recette()
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

      it('should return a list of Recette', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            type: 'BBBBBB',
            autreRecette: 'BBBBBB',
            typeRessource: 'BBBBBB',
            montant: 'BBBBBB',
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

      it('should delete a Recette', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addRecetteToCollectionIfMissing', () => {
        it('should add a Recette to an empty array', () => {
          const recette: IRecette = { id: 123 };
          expectedResult = service.addRecetteToCollectionIfMissing([], recette);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(recette);
        });

        it('should not add a Recette to an array that contains it', () => {
          const recette: IRecette = { id: 123 };
          const recetteCollection: IRecette[] = [
            {
              ...recette,
            },
            { id: 456 },
          ];
          expectedResult = service.addRecetteToCollectionIfMissing(recetteCollection, recette);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Recette to an array that doesn't contain it", () => {
          const recette: IRecette = { id: 123 };
          const recetteCollection: IRecette[] = [{ id: 456 }];
          expectedResult = service.addRecetteToCollectionIfMissing(recetteCollection, recette);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(recette);
        });

        it('should add only unique Recette to an array', () => {
          const recetteArray: IRecette[] = [{ id: 123 }, { id: 456 }, { id: 79580 }];
          const recetteCollection: IRecette[] = [{ id: 123 }];
          expectedResult = service.addRecetteToCollectionIfMissing(recetteCollection, ...recetteArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const recette: IRecette = { id: 123 };
          const recette2: IRecette = { id: 456 };
          expectedResult = service.addRecetteToCollectionIfMissing([], recette, recette2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(recette);
          expect(expectedResult).toContain(recette2);
        });

        it('should accept null and undefined values', () => {
          const recette: IRecette = { id: 123 };
          expectedResult = service.addRecetteToCollectionIfMissing([], null, recette, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(recette);
        });

        it('should return initial array if no Recette is added', () => {
          const recetteCollection: IRecette[] = [{ id: 123 }];
          expectedResult = service.addRecetteToCollectionIfMissing(recetteCollection, undefined, null);
          expect(expectedResult).toEqual(recetteCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
