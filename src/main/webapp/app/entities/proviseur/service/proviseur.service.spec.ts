import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProviseur, Proviseur } from '../proviseur.model';

import { ProviseurService } from './proviseur.service';

describe('Service Tests', () => {
  describe('Proviseur Service', () => {
    let service: ProviseurService;
    let httpMock: HttpTestingController;
    let elemDefault: IProviseur;
    let expectedResult: IProviseur | IProviseur[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ProviseurService);
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

      it('should create a Proviseur', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Proviseur()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Proviseur', () => {
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

      it('should partial update a Proviseur', () => {
        const patchObject = Object.assign({}, new Proviseur());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Proviseur', () => {
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

      it('should delete a Proviseur', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addProviseurToCollectionIfMissing', () => {
        it('should add a Proviseur to an empty array', () => {
          const proviseur: IProviseur = { id: 123 };
          expectedResult = service.addProviseurToCollectionIfMissing([], proviseur);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(proviseur);
        });

        it('should not add a Proviseur to an array that contains it', () => {
          const proviseur: IProviseur = { id: 123 };
          const proviseurCollection: IProviseur[] = [
            {
              ...proviseur,
            },
            { id: 456 },
          ];
          expectedResult = service.addProviseurToCollectionIfMissing(proviseurCollection, proviseur);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Proviseur to an array that doesn't contain it", () => {
          const proviseur: IProviseur = { id: 123 };
          const proviseurCollection: IProviseur[] = [{ id: 456 }];
          expectedResult = service.addProviseurToCollectionIfMissing(proviseurCollection, proviseur);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(proviseur);
        });

        it('should add only unique Proviseur to an array', () => {
          const proviseurArray: IProviseur[] = [{ id: 123 }, { id: 456 }, { id: 11029 }];
          const proviseurCollection: IProviseur[] = [{ id: 123 }];
          expectedResult = service.addProviseurToCollectionIfMissing(proviseurCollection, ...proviseurArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const proviseur: IProviseur = { id: 123 };
          const proviseur2: IProviseur = { id: 456 };
          expectedResult = service.addProviseurToCollectionIfMissing([], proviseur, proviseur2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(proviseur);
          expect(expectedResult).toContain(proviseur2);
        });

        it('should accept null and undefined values', () => {
          const proviseur: IProviseur = { id: 123 };
          expectedResult = service.addProviseurToCollectionIfMissing([], null, proviseur, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(proviseur);
        });

        it('should return initial array if no Proviseur is added', () => {
          const proviseurCollection: IProviseur[] = [{ id: 123 }];
          expectedResult = service.addProviseurToCollectionIfMissing(proviseurCollection, undefined, null);
          expect(expectedResult).toEqual(proviseurCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
