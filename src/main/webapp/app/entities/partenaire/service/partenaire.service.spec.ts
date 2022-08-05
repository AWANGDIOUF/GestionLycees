import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Provenance } from 'app/entities/enumerations/provenance.model';
import { NaturePart } from 'app/entities/enumerations/nature-part.model';
import { IPartenaire, Partenaire } from '../partenaire.model';

import { PartenaireService } from './partenaire.service';

describe('Service Tests', () => {
  describe('Partenaire Service', () => {
    let service: PartenaireService;
    let httpMock: HttpTestingController;
    let elemDefault: IPartenaire;
    let expectedResult: IPartenaire | IPartenaire[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(PartenaireService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        denominationPartenaire: 'AAAAAAA',
        categorieProvenaire: Provenance.ENTREPRISE,
        autreCategorie: 'AAAAAAA',
        nature: NaturePart.TECHNIQUE,
        autreNature: 'AAAAAAA',
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

      it('should create a Partenaire', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Partenaire()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Partenaire', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            denominationPartenaire: 'BBBBBB',
            categorieProvenaire: 'BBBBBB',
            autreCategorie: 'BBBBBB',
            nature: 'BBBBBB',
            autreNature: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Partenaire', () => {
        const patchObject = Object.assign(
          {
            denominationPartenaire: 'BBBBBB',
            categorieProvenaire: 'BBBBBB',
            autreNature: 'BBBBBB',
          },
          new Partenaire()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Partenaire', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            denominationPartenaire: 'BBBBBB',
            categorieProvenaire: 'BBBBBB',
            autreCategorie: 'BBBBBB',
            nature: 'BBBBBB',
            autreNature: 'BBBBBB',
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

      it('should delete a Partenaire', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addPartenaireToCollectionIfMissing', () => {
        it('should add a Partenaire to an empty array', () => {
          const partenaire: IPartenaire = { id: 123 };
          expectedResult = service.addPartenaireToCollectionIfMissing([], partenaire);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(partenaire);
        });

        it('should not add a Partenaire to an array that contains it', () => {
          const partenaire: IPartenaire = { id: 123 };
          const partenaireCollection: IPartenaire[] = [
            {
              ...partenaire,
            },
            { id: 456 },
          ];
          expectedResult = service.addPartenaireToCollectionIfMissing(partenaireCollection, partenaire);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Partenaire to an array that doesn't contain it", () => {
          const partenaire: IPartenaire = { id: 123 };
          const partenaireCollection: IPartenaire[] = [{ id: 456 }];
          expectedResult = service.addPartenaireToCollectionIfMissing(partenaireCollection, partenaire);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(partenaire);
        });

        it('should add only unique Partenaire to an array', () => {
          const partenaireArray: IPartenaire[] = [{ id: 123 }, { id: 456 }, { id: 68598 }];
          const partenaireCollection: IPartenaire[] = [{ id: 123 }];
          expectedResult = service.addPartenaireToCollectionIfMissing(partenaireCollection, ...partenaireArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const partenaire: IPartenaire = { id: 123 };
          const partenaire2: IPartenaire = { id: 456 };
          expectedResult = service.addPartenaireToCollectionIfMissing([], partenaire, partenaire2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(partenaire);
          expect(expectedResult).toContain(partenaire2);
        });

        it('should accept null and undefined values', () => {
          const partenaire: IPartenaire = { id: 123 };
          expectedResult = service.addPartenaireToCollectionIfMissing([], null, partenaire, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(partenaire);
        });

        it('should return initial array if no Partenaire is added', () => {
          const partenaireCollection: IPartenaire[] = [{ id: 123 }];
          expectedResult = service.addPartenaireToCollectionIfMissing(partenaireCollection, undefined, null);
          expect(expectedResult).toEqual(partenaireCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
