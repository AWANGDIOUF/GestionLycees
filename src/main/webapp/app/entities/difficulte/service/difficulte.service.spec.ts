import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NatureDif } from 'app/entities/enumerations/nature-dif.model';
import { IDifficulte, Difficulte } from '../difficulte.model';

import { DifficulteService } from './difficulte.service';

describe('Service Tests', () => {
  describe('Difficulte Service', () => {
    let service: DifficulteService;
    let httpMock: HttpTestingController;
    let elemDefault: IDifficulte;
    let expectedResult: IDifficulte | IDifficulte[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DifficulteService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nature: NatureDif.TECHNIQUE,
        autreNature: 'AAAAAAA',
        description: 'AAAAAAA',
        solution: 'AAAAAAA',
        observation: 'AAAAAAA',
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

      it('should create a Difficulte', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Difficulte()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Difficulte', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nature: 'BBBBBB',
            autreNature: 'BBBBBB',
            description: 'BBBBBB',
            solution: 'BBBBBB',
            observation: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Difficulte', () => {
        const patchObject = Object.assign(
          {
            nature: 'BBBBBB',
            autreNature: 'BBBBBB',
            description: 'BBBBBB',
          },
          new Difficulte()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Difficulte', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nature: 'BBBBBB',
            autreNature: 'BBBBBB',
            description: 'BBBBBB',
            solution: 'BBBBBB',
            observation: 'BBBBBB',
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

      it('should delete a Difficulte', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addDifficulteToCollectionIfMissing', () => {
        it('should add a Difficulte to an empty array', () => {
          const difficulte: IDifficulte = { id: 123 };
          expectedResult = service.addDifficulteToCollectionIfMissing([], difficulte);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(difficulte);
        });

        it('should not add a Difficulte to an array that contains it', () => {
          const difficulte: IDifficulte = { id: 123 };
          const difficulteCollection: IDifficulte[] = [
            {
              ...difficulte,
            },
            { id: 456 },
          ];
          expectedResult = service.addDifficulteToCollectionIfMissing(difficulteCollection, difficulte);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Difficulte to an array that doesn't contain it", () => {
          const difficulte: IDifficulte = { id: 123 };
          const difficulteCollection: IDifficulte[] = [{ id: 456 }];
          expectedResult = service.addDifficulteToCollectionIfMissing(difficulteCollection, difficulte);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(difficulte);
        });

        it('should add only unique Difficulte to an array', () => {
          const difficulteArray: IDifficulte[] = [{ id: 123 }, { id: 456 }, { id: 27916 }];
          const difficulteCollection: IDifficulte[] = [{ id: 123 }];
          expectedResult = service.addDifficulteToCollectionIfMissing(difficulteCollection, ...difficulteArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const difficulte: IDifficulte = { id: 123 };
          const difficulte2: IDifficulte = { id: 456 };
          expectedResult = service.addDifficulteToCollectionIfMissing([], difficulte, difficulte2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(difficulte);
          expect(expectedResult).toContain(difficulte2);
        });

        it('should accept null and undefined values', () => {
          const difficulte: IDifficulte = { id: 123 };
          expectedResult = service.addDifficulteToCollectionIfMissing([], null, difficulte, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(difficulte);
        });

        it('should return initial array if no Difficulte is added', () => {
          const difficulteCollection: IDifficulte[] = [{ id: 123 }];
          expectedResult = service.addDifficulteToCollectionIfMissing(difficulteCollection, undefined, null);
          expect(expectedResult).toEqual(difficulteCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
