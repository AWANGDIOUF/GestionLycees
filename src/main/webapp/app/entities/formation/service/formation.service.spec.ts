import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFormation, Formation } from '../formation.model';

import { FormationService } from './formation.service';

describe('Service Tests', () => {
  describe('Formation Service', () => {
    let service: FormationService;
    let httpMock: HttpTestingController;
    let elemDefault: IFormation;
    let expectedResult: IFormation | IFormation[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(FormationService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nomFormation: 'AAAAAAA',
        typeFormation: 'AAAAAAA',
        niveauFormation: 'AAAAAAA',
        duree: 'PT1S',
        secteur: 'AAAAAAA',
        modalite: 'AAAAAAA',
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

      it('should create a Formation', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Formation()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Formation', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nomFormation: 'BBBBBB',
            typeFormation: 'BBBBBB',
            niveauFormation: 'BBBBBB',
            duree: 'BBBBBB',
            secteur: 'BBBBBB',
            modalite: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Formation', () => {
        const patchObject = Object.assign(
          {
            nomFormation: 'BBBBBB',
            typeFormation: 'BBBBBB',
            duree: 'BBBBBB',
            secteur: 'BBBBBB',
          },
          new Formation()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Formation', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nomFormation: 'BBBBBB',
            typeFormation: 'BBBBBB',
            niveauFormation: 'BBBBBB',
            duree: 'BBBBBB',
            secteur: 'BBBBBB',
            modalite: 'BBBBBB',
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

      it('should delete a Formation', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addFormationToCollectionIfMissing', () => {
        it('should add a Formation to an empty array', () => {
          const formation: IFormation = { id: 123 };
          expectedResult = service.addFormationToCollectionIfMissing([], formation);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(formation);
        });

        it('should not add a Formation to an array that contains it', () => {
          const formation: IFormation = { id: 123 };
          const formationCollection: IFormation[] = [
            {
              ...formation,
            },
            { id: 456 },
          ];
          expectedResult = service.addFormationToCollectionIfMissing(formationCollection, formation);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Formation to an array that doesn't contain it", () => {
          const formation: IFormation = { id: 123 };
          const formationCollection: IFormation[] = [{ id: 456 }];
          expectedResult = service.addFormationToCollectionIfMissing(formationCollection, formation);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(formation);
        });

        it('should add only unique Formation to an array', () => {
          const formationArray: IFormation[] = [{ id: 123 }, { id: 456 }, { id: 19921 }];
          const formationCollection: IFormation[] = [{ id: 123 }];
          expectedResult = service.addFormationToCollectionIfMissing(formationCollection, ...formationArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const formation: IFormation = { id: 123 };
          const formation2: IFormation = { id: 456 };
          expectedResult = service.addFormationToCollectionIfMissing([], formation, formation2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(formation);
          expect(expectedResult).toContain(formation2);
        });

        it('should accept null and undefined values', () => {
          const formation: IFormation = { id: 123 };
          expectedResult = service.addFormationToCollectionIfMissing([], null, formation, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(formation);
        });

        it('should return initial array if no Formation is added', () => {
          const formationCollection: IFormation[] = [{ id: 123 }];
          expectedResult = service.addFormationToCollectionIfMissing(formationCollection, undefined, null);
          expect(expectedResult).toEqual(formationCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
