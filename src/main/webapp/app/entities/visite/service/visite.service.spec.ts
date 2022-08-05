import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { NatureV } from 'app/entities/enumerations/nature-v.model';
import { ProvenanceV } from 'app/entities/enumerations/provenance-v.model';
import { IVisite, Visite } from '../visite.model';

import { VisiteService } from './visite.service';

describe('Service Tests', () => {
  describe('Visite Service', () => {
    let service: VisiteService;
    let httpMock: HttpTestingController;
    let elemDefault: IVisite;
    let expectedResult: IVisite | IVisite[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(VisiteService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        nature: NatureV.ADMINITRATIVE,
        autreNature: 'AAAAAAA',
        provenance: ProvenanceV.NIVEAU_CENTRAL,
        autreProvenance: 'AAAAAAA',
        objet: 'AAAAAAA',
        resultats: 'AAAAAAA',
        periode: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            periode: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Visite', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            periode: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            periode: currentDate,
          },
          returnedFromService
        );

        service.create(new Visite()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Visite', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nature: 'BBBBBB',
            autreNature: 'BBBBBB',
            provenance: 'BBBBBB',
            autreProvenance: 'BBBBBB',
            objet: 'BBBBBB',
            resultats: 'BBBBBB',
            periode: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            periode: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Visite', () => {
        const patchObject = Object.assign(
          {
            nature: 'BBBBBB',
            autreNature: 'BBBBBB',
            provenance: 'BBBBBB',
            autreProvenance: 'BBBBBB',
            objet: 'BBBBBB',
            resultats: 'BBBBBB',
          },
          new Visite()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            periode: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Visite', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nature: 'BBBBBB',
            autreNature: 'BBBBBB',
            provenance: 'BBBBBB',
            autreProvenance: 'BBBBBB',
            objet: 'BBBBBB',
            resultats: 'BBBBBB',
            periode: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            periode: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Visite', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addVisiteToCollectionIfMissing', () => {
        it('should add a Visite to an empty array', () => {
          const visite: IVisite = { id: 123 };
          expectedResult = service.addVisiteToCollectionIfMissing([], visite);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(visite);
        });

        it('should not add a Visite to an array that contains it', () => {
          const visite: IVisite = { id: 123 };
          const visiteCollection: IVisite[] = [
            {
              ...visite,
            },
            { id: 456 },
          ];
          expectedResult = service.addVisiteToCollectionIfMissing(visiteCollection, visite);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Visite to an array that doesn't contain it", () => {
          const visite: IVisite = { id: 123 };
          const visiteCollection: IVisite[] = [{ id: 456 }];
          expectedResult = service.addVisiteToCollectionIfMissing(visiteCollection, visite);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(visite);
        });

        it('should add only unique Visite to an array', () => {
          const visiteArray: IVisite[] = [{ id: 123 }, { id: 456 }, { id: 22441 }];
          const visiteCollection: IVisite[] = [{ id: 123 }];
          expectedResult = service.addVisiteToCollectionIfMissing(visiteCollection, ...visiteArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const visite: IVisite = { id: 123 };
          const visite2: IVisite = { id: 456 };
          expectedResult = service.addVisiteToCollectionIfMissing([], visite, visite2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(visite);
          expect(expectedResult).toContain(visite2);
        });

        it('should accept null and undefined values', () => {
          const visite: IVisite = { id: 123 };
          expectedResult = service.addVisiteToCollectionIfMissing([], null, visite, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(visite);
        });

        it('should return initial array if no Visite is added', () => {
          const visiteCollection: IVisite[] = [{ id: 123 }];
          expectedResult = service.addVisiteToCollectionIfMissing(visiteCollection, undefined, null);
          expect(expectedResult).toEqual(visiteCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
