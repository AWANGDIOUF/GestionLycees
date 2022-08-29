import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
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
import { ILyceeTechnique, LyceeTechnique } from '../lycee-technique.model';

import { LyceeTechniqueService } from './lycee-technique.service';

describe('Service Tests', () => {
  describe('LyceeTechnique Service', () => {
    let service: LyceeTechniqueService;
    let httpMock: HttpTestingController;
    let elemDefault: ILyceeTechnique;
    let expectedResult: ILyceeTechnique | ILyceeTechnique[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(LyceeTechniqueService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        prenomNom: 'AAAAAAA',
        adresse: 'AAAAAAA',
        mail: 'AAAAAAA',
        tel1: 'AAAAAAA',
        tel2: 'AAAAAAA',
        boitePostal: 'AAAAAAA',
        decretCreation: 'AAAAAAA',
        dateCreation: currentDate,
        region: Region.DAKAR,
        autreRegion: 'AAAAAAA',
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
        departementZiguinchor: ZIGINCHOR.BIGNONA,
        autredepartementDakar: 'AAAAAAA',
        autredepartementDiourbel: 'AAAAAAA',
        autredepartementFatick: 'AAAAAAA',
        autredepartementKaffrine: 'AAAAAAA',
        autredepartementKaolack: 'AAAAAAA',
        autredepartementKedougou: 'AAAAAAA',
        autredepartementKolda: 'AAAAAAA',
        autredepartementLouga: 'AAAAAAA',
        autredepartementMatam: 'AAAAAAA',
        autredepartementSaint: 'AAAAAAA',
        autredepartementSedhiou: 'AAAAAAA',
        autredepartementTambacounda: 'AAAAAAA',
        autredepartementThis: 'AAAAAAA',
        autredepartementZiguinchor: 'AAAAAAA',
        commune: 'AAAAAAA',
        ia: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateCreation: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a LyceeTechnique', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateCreation: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateCreation: currentDate,
          },
          returnedFromService
        );

        service.create(new LyceeTechnique()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a LyceeTechnique', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            prenomNom: 'BBBBBB',
            adresse: 'BBBBBB',
            mail: 'BBBBBB',
            tel1: 'BBBBBB',
            tel2: 'BBBBBB',
            boitePostal: 'BBBBBB',
            decretCreation: 'BBBBBB',
            dateCreation: currentDate.format(DATE_FORMAT),
            region: 'BBBBBB',
            autreRegion: 'BBBBBB',
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
            departementZiguinchor: 'BBBBBB',
            autredepartementDakar: 'BBBBBB',
            autredepartementDiourbel: 'BBBBBB',
            autredepartementFatick: 'BBBBBB',
            autredepartementKaffrine: 'BBBBBB',
            autredepartementKaolack: 'BBBBBB',
            autredepartementKedougou: 'BBBBBB',
            autredepartementKolda: 'BBBBBB',
            autredepartementLouga: 'BBBBBB',
            autredepartementMatam: 'BBBBBB',
            autredepartementSaint: 'BBBBBB',
            autredepartementSedhiou: 'BBBBBB',
            autredepartementTambacounda: 'BBBBBB',
            autredepartementThis: 'BBBBBB',
            autredepartementZiguinchor: 'BBBBBB',
            commune: 'BBBBBB',
            ia: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateCreation: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a LyceeTechnique', () => {
        const patchObject = Object.assign(
          {
            adresse: 'BBBBBB',
            boitePostal: 'BBBBBB',
            departementDiourbel: 'BBBBBB',
            departementFatick: 'BBBBBB',
            departementKaffrine: 'BBBBBB',
            departementLouga: 'BBBBBB',
            departementMatam: 'BBBBBB',
            departementSedhiou: 'BBBBBB',
            departementZiguinchor: 'BBBBBB',
            autredepartementDakar: 'BBBBBB',
            autredepartementDiourbel: 'BBBBBB',
            autredepartementFatick: 'BBBBBB',
            autredepartementKedougou: 'BBBBBB',
            autredepartementMatam: 'BBBBBB',
            autredepartementSedhiou: 'BBBBBB',
          },
          new LyceeTechnique()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateCreation: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of LyceeTechnique', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            prenomNom: 'BBBBBB',
            adresse: 'BBBBBB',
            mail: 'BBBBBB',
            tel1: 'BBBBBB',
            tel2: 'BBBBBB',
            boitePostal: 'BBBBBB',
            decretCreation: 'BBBBBB',
            dateCreation: currentDate.format(DATE_FORMAT),
            region: 'BBBBBB',
            autreRegion: 'BBBBBB',
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
            departementZiguinchor: 'BBBBBB',
            autredepartementDakar: 'BBBBBB',
            autredepartementDiourbel: 'BBBBBB',
            autredepartementFatick: 'BBBBBB',
            autredepartementKaffrine: 'BBBBBB',
            autredepartementKaolack: 'BBBBBB',
            autredepartementKedougou: 'BBBBBB',
            autredepartementKolda: 'BBBBBB',
            autredepartementLouga: 'BBBBBB',
            autredepartementMatam: 'BBBBBB',
            autredepartementSaint: 'BBBBBB',
            autredepartementSedhiou: 'BBBBBB',
            autredepartementTambacounda: 'BBBBBB',
            autredepartementThis: 'BBBBBB',
            autredepartementZiguinchor: 'BBBBBB',
            commune: 'BBBBBB',
            ia: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateCreation: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a LyceeTechnique', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addLyceeTechniqueToCollectionIfMissing', () => {
        it('should add a LyceeTechnique to an empty array', () => {
          const lyceeTechnique: ILyceeTechnique = { id: 123 };
          expectedResult = service.addLyceeTechniqueToCollectionIfMissing([], lyceeTechnique);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(lyceeTechnique);
        });

        it('should not add a LyceeTechnique to an array that contains it', () => {
          const lyceeTechnique: ILyceeTechnique = { id: 123 };
          const lyceeTechniqueCollection: ILyceeTechnique[] = [
            {
              ...lyceeTechnique,
            },
            { id: 456 },
          ];
          expectedResult = service.addLyceeTechniqueToCollectionIfMissing(lyceeTechniqueCollection, lyceeTechnique);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a LyceeTechnique to an array that doesn't contain it", () => {
          const lyceeTechnique: ILyceeTechnique = { id: 123 };
          const lyceeTechniqueCollection: ILyceeTechnique[] = [{ id: 456 }];
          expectedResult = service.addLyceeTechniqueToCollectionIfMissing(lyceeTechniqueCollection, lyceeTechnique);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(lyceeTechnique);
        });

        it('should add only unique LyceeTechnique to an array', () => {
          const lyceeTechniqueArray: ILyceeTechnique[] = [{ id: 123 }, { id: 456 }, { id: 10153 }];
          const lyceeTechniqueCollection: ILyceeTechnique[] = [{ id: 123 }];
          expectedResult = service.addLyceeTechniqueToCollectionIfMissing(lyceeTechniqueCollection, ...lyceeTechniqueArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const lyceeTechnique: ILyceeTechnique = { id: 123 };
          const lyceeTechnique2: ILyceeTechnique = { id: 456 };
          expectedResult = service.addLyceeTechniqueToCollectionIfMissing([], lyceeTechnique, lyceeTechnique2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(lyceeTechnique);
          expect(expectedResult).toContain(lyceeTechnique2);
        });

        it('should accept null and undefined values', () => {
          const lyceeTechnique: ILyceeTechnique = { id: 123 };
          expectedResult = service.addLyceeTechniqueToCollectionIfMissing([], null, lyceeTechnique, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(lyceeTechnique);
        });

        it('should return initial array if no LyceeTechnique is added', () => {
          const lyceeTechniqueCollection: ILyceeTechnique[] = [{ id: 123 }];
          expectedResult = service.addLyceeTechniqueToCollectionIfMissing(lyceeTechniqueCollection, undefined, null);
          expect(expectedResult).toEqual(lyceeTechniqueCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
