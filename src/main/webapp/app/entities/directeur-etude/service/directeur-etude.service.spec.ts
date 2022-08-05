import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDirecteurEtude, DirecteurEtude } from '../directeur-etude.model';

import { DirecteurEtudeService } from './directeur-etude.service';

describe('Service Tests', () => {
  describe('DirecteurEtude Service', () => {
    let service: DirecteurEtudeService;
    let httpMock: HttpTestingController;
    let elemDefault: IDirecteurEtude;
    let expectedResult: IDirecteurEtude | IDirecteurEtude[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DirecteurEtudeService);
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

      it('should create a DirecteurEtude', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new DirecteurEtude()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DirecteurEtude', () => {
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

      it('should partial update a DirecteurEtude', () => {
        const patchObject = Object.assign({}, new DirecteurEtude());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DirecteurEtude', () => {
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

      it('should delete a DirecteurEtude', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addDirecteurEtudeToCollectionIfMissing', () => {
        it('should add a DirecteurEtude to an empty array', () => {
          const directeurEtude: IDirecteurEtude = { id: 123 };
          expectedResult = service.addDirecteurEtudeToCollectionIfMissing([], directeurEtude);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(directeurEtude);
        });

        it('should not add a DirecteurEtude to an array that contains it', () => {
          const directeurEtude: IDirecteurEtude = { id: 123 };
          const directeurEtudeCollection: IDirecteurEtude[] = [
            {
              ...directeurEtude,
            },
            { id: 456 },
          ];
          expectedResult = service.addDirecteurEtudeToCollectionIfMissing(directeurEtudeCollection, directeurEtude);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a DirecteurEtude to an array that doesn't contain it", () => {
          const directeurEtude: IDirecteurEtude = { id: 123 };
          const directeurEtudeCollection: IDirecteurEtude[] = [{ id: 456 }];
          expectedResult = service.addDirecteurEtudeToCollectionIfMissing(directeurEtudeCollection, directeurEtude);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(directeurEtude);
        });

        it('should add only unique DirecteurEtude to an array', () => {
          const directeurEtudeArray: IDirecteurEtude[] = [{ id: 123 }, { id: 456 }, { id: 24321 }];
          const directeurEtudeCollection: IDirecteurEtude[] = [{ id: 123 }];
          expectedResult = service.addDirecteurEtudeToCollectionIfMissing(directeurEtudeCollection, ...directeurEtudeArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const directeurEtude: IDirecteurEtude = { id: 123 };
          const directeurEtude2: IDirecteurEtude = { id: 456 };
          expectedResult = service.addDirecteurEtudeToCollectionIfMissing([], directeurEtude, directeurEtude2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(directeurEtude);
          expect(expectedResult).toContain(directeurEtude2);
        });

        it('should accept null and undefined values', () => {
          const directeurEtude: IDirecteurEtude = { id: 123 };
          expectedResult = service.addDirecteurEtudeToCollectionIfMissing([], null, directeurEtude, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(directeurEtude);
        });

        it('should return initial array if no DirecteurEtude is added', () => {
          const directeurEtudeCollection: IDirecteurEtude[] = [{ id: 123 }];
          expectedResult = service.addDirecteurEtudeToCollectionIfMissing(directeurEtudeCollection, undefined, null);
          expect(expectedResult).toEqual(directeurEtudeCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
