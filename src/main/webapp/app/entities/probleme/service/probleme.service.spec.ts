import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Nature } from 'app/entities/enumerations/nature.model';
import { IProbleme, Probleme } from '../probleme.model';

import { ProblemeService } from './probleme.service';

describe('Service Tests', () => {
  describe('Probleme Service', () => {
    let service: ProblemeService;
    let httpMock: HttpTestingController;
    let elemDefault: IProbleme;
    let expectedResult: IProbleme | IProbleme[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ProblemeService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nature: Nature.TECHNIQUE,
        description: 'AAAAAAA',
        solution: 'AAAAAAA',
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

      it('should create a Probleme', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Probleme()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Probleme', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nature: 'BBBBBB',
            description: 'BBBBBB',
            solution: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Probleme', () => {
        const patchObject = Object.assign(
          {
            solution: 'BBBBBB',
          },
          new Probleme()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Probleme', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nature: 'BBBBBB',
            description: 'BBBBBB',
            solution: 'BBBBBB',
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

      it('should delete a Probleme', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addProblemeToCollectionIfMissing', () => {
        it('should add a Probleme to an empty array', () => {
          const probleme: IProbleme = { id: 123 };
          expectedResult = service.addProblemeToCollectionIfMissing([], probleme);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(probleme);
        });

        it('should not add a Probleme to an array that contains it', () => {
          const probleme: IProbleme = { id: 123 };
          const problemeCollection: IProbleme[] = [
            {
              ...probleme,
            },
            { id: 456 },
          ];
          expectedResult = service.addProblemeToCollectionIfMissing(problemeCollection, probleme);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Probleme to an array that doesn't contain it", () => {
          const probleme: IProbleme = { id: 123 };
          const problemeCollection: IProbleme[] = [{ id: 456 }];
          expectedResult = service.addProblemeToCollectionIfMissing(problemeCollection, probleme);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(probleme);
        });

        it('should add only unique Probleme to an array', () => {
          const problemeArray: IProbleme[] = [{ id: 123 }, { id: 456 }, { id: 72953 }];
          const problemeCollection: IProbleme[] = [{ id: 123 }];
          expectedResult = service.addProblemeToCollectionIfMissing(problemeCollection, ...problemeArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const probleme: IProbleme = { id: 123 };
          const probleme2: IProbleme = { id: 456 };
          expectedResult = service.addProblemeToCollectionIfMissing([], probleme, probleme2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(probleme);
          expect(expectedResult).toContain(probleme2);
        });

        it('should accept null and undefined values', () => {
          const probleme: IProbleme = { id: 123 };
          expectedResult = service.addProblemeToCollectionIfMissing([], null, probleme, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(probleme);
        });

        it('should return initial array if no Probleme is added', () => {
          const problemeCollection: IProbleme[] = [{ id: 123 }];
          expectedResult = service.addProblemeToCollectionIfMissing(problemeCollection, undefined, null);
          expect(expectedResult).toEqual(problemeCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
