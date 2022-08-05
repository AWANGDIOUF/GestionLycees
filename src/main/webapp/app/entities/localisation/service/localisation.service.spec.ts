import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Region } from 'app/entities/enumerations/region.model';
import { DAKAR } from 'app/entities/enumerations/dakar.model';
import { DIOURBEL } from 'app/entities/enumerations/diourbel.model';
import { FATICK } from 'app/entities/enumerations/fatick.model';
import { KAFFRINE } from 'app/entities/enumerations/kaffrine.model';
import { KAOLACK } from 'app/entities/enumerations/kaolack.model';
import { KEDOUGOU } from 'app/entities/enumerations/kedougou.model';
import { KOLDA } from 'app/entities/enumerations/kolda.model';
import { LOUGA } from 'app/entities/enumerations/louga.model';
import { MATAM } from 'app/entities/enumerations/matam.model';
import { SAINTLOUIS } from 'app/entities/enumerations/saintlouis.model';
import { SEDHIOU } from 'app/entities/enumerations/sedhiou.model';
import { TAMBACOUNDA } from 'app/entities/enumerations/tambacounda.model';
import { THIES } from 'app/entities/enumerations/thies.model';
import { ZIGINCHOR } from 'app/entities/enumerations/ziginchor.model';
import { ILocalisation, Localisation } from '../localisation.model';

import { LocalisationService } from './localisation.service';

describe('Service Tests', () => {
  describe('Localisation Service', () => {
    let service: LocalisationService;
    let httpMock: HttpTestingController;
    let elemDefault: ILocalisation;
    let expectedResult: ILocalisation | ILocalisation[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(LocalisationService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        region: Region.DAKAR,
        departementDakar: DAKAR.DAKAR,
        departementDiourbel: DIOURBEL.BAMBAEY,
        departementFatick: FATICK.FATICK,
        departementKaffrine: KAFFRINE.BIRKILANE,
        departementKaolack: KAOLACK.GUINGUINEO,
        departementKedougou: KEDOUGOU.KEDOUGOU,
        departementKolda: KOLDA.KOLDA,
        departementLouga: LOUGA.KEBEMERE,
        departementMatam: MATAM.KANELKANEL,
        departementSaint: SAINTLOUIS.DAGANA,
        departementSedhiou: SEDHIOU.BOUNKILING,
        departementTambacounda: TAMBACOUNDA.BAKEL,
        departementThis: THIES.MBOUR,
        departementZic: ZIGINCHOR.BIGNONA,
        ia: 'AAAAAAA',
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

      it('should create a Localisation', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Localisation()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Localisation', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            region: 'BBBBBB',
            departementDakar: 'BBBBBB',
            departementDiourbel: 'BBBBBB',
            departementFatick: 'BBBBBB',
            departementKaffrine: 'BBBBBB',
            departementKaolack: 'BBBBBB',
            departementKedougou: 'BBBBBB',
            departementKolda: 'BBBBBB',
            departementLouga: 'BBBBBB',
            departementMatam: 'BBBBBB',
            departementSaint: 'BBBBBB',
            departementSedhiou: 'BBBBBB',
            departementTambacounda: 'BBBBBB',
            departementThis: 'BBBBBB',
            departementZic: 'BBBBBB',
            ia: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Localisation', () => {
        const patchObject = Object.assign(
          {
            departementKaffrine: 'BBBBBB',
            departementKedougou: 'BBBBBB',
            departementKolda: 'BBBBBB',
            departementLouga: 'BBBBBB',
            departementMatam: 'BBBBBB',
            departementSedhiou: 'BBBBBB',
            departementTambacounda: 'BBBBBB',
            departementZic: 'BBBBBB',
            ia: 'BBBBBB',
          },
          new Localisation()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Localisation', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            region: 'BBBBBB',
            departementDakar: 'BBBBBB',
            departementDiourbel: 'BBBBBB',
            departementFatick: 'BBBBBB',
            departementKaffrine: 'BBBBBB',
            departementKaolack: 'BBBBBB',
            departementKedougou: 'BBBBBB',
            departementKolda: 'BBBBBB',
            departementLouga: 'BBBBBB',
            departementMatam: 'BBBBBB',
            departementSaint: 'BBBBBB',
            departementSedhiou: 'BBBBBB',
            departementTambacounda: 'BBBBBB',
            departementThis: 'BBBBBB',
            departementZic: 'BBBBBB',
            ia: 'BBBBBB',
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

      it('should delete a Localisation', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addLocalisationToCollectionIfMissing', () => {
        it('should add a Localisation to an empty array', () => {
          const localisation: ILocalisation = { id: 123 };
          expectedResult = service.addLocalisationToCollectionIfMissing([], localisation);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(localisation);
        });

        it('should not add a Localisation to an array that contains it', () => {
          const localisation: ILocalisation = { id: 123 };
          const localisationCollection: ILocalisation[] = [
            {
              ...localisation,
            },
            { id: 456 },
          ];
          expectedResult = service.addLocalisationToCollectionIfMissing(localisationCollection, localisation);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Localisation to an array that doesn't contain it", () => {
          const localisation: ILocalisation = { id: 123 };
          const localisationCollection: ILocalisation[] = [{ id: 456 }];
          expectedResult = service.addLocalisationToCollectionIfMissing(localisationCollection, localisation);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(localisation);
        });

        it('should add only unique Localisation to an array', () => {
          const localisationArray: ILocalisation[] = [{ id: 123 }, { id: 456 }, { id: 48959 }];
          const localisationCollection: ILocalisation[] = [{ id: 123 }];
          expectedResult = service.addLocalisationToCollectionIfMissing(localisationCollection, ...localisationArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const localisation: ILocalisation = { id: 123 };
          const localisation2: ILocalisation = { id: 456 };
          expectedResult = service.addLocalisationToCollectionIfMissing([], localisation, localisation2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(localisation);
          expect(expectedResult).toContain(localisation2);
        });

        it('should accept null and undefined values', () => {
          const localisation: ILocalisation = { id: 123 };
          expectedResult = service.addLocalisationToCollectionIfMissing([], null, localisation, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(localisation);
        });

        it('should return initial array if no Localisation is added', () => {
          const localisationCollection: ILocalisation[] = [{ id: 123 }];
          expectedResult = service.addLocalisationToCollectionIfMissing(localisationCollection, undefined, null);
          expect(expectedResult).toEqual(localisationCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
