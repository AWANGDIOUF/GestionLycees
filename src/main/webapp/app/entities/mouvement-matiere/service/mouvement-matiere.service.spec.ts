import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Mouvement } from 'app/entities/enumerations/mouvement.model';
import { Group } from 'app/entities/enumerations/group.model';
import { Organisation } from 'app/entities/enumerations/organisation.model';
import { Ressouces } from 'app/entities/enumerations/ressouces.model';
import { Groupe } from 'app/entities/enumerations/groupe.model';
import { IMouvementMatiere, MouvementMatiere } from '../mouvement-matiere.model';

import { MouvementMatiereService } from './mouvement-matiere.service';

describe('Service Tests', () => {
  describe('MouvementMatiere Service', () => {
    let service: MouvementMatiereService;
    let httpMock: HttpTestingController;
    let elemDefault: IMouvementMatiere;
    let expectedResult: IMouvementMatiere | IMouvementMatiere[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MouvementMatiereService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        typeMouvement: Mouvement.RECEPTION,
        group: Group.GROUP1,
        organisation: Organisation.ETAT,
        autreOrganisation: 'AAAAAAA',
        ressource: Ressouces.BUDGET,
        autreRessource: 'AAAAAAA',
        designationContentType: 'image/png',
        designation: 'AAAAAAA',
        pvReceptionContentType: 'image/png',
        pvReception: 'AAAAAAA',
        bordeauDeLivraisonContentType: 'image/png',
        bordeauDeLivraison: 'AAAAAAA',
        groupe: Groupe.GROUPE1,
        bonDeSortieContentType: 'image/png',
        bonDeSortie: 'AAAAAAA',
        certificatAdministratifContentType: 'image/png',
        certificatAdministratif: 'AAAAAAA',
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

      it('should create a MouvementMatiere', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MouvementMatiere()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MouvementMatiere', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            typeMouvement: 'BBBBBB',
            group: 'BBBBBB',
            organisation: 'BBBBBB',
            autreOrganisation: 'BBBBBB',
            ressource: 'BBBBBB',
            autreRessource: 'BBBBBB',
            designation: 'BBBBBB',
            pvReception: 'BBBBBB',
            bordeauDeLivraison: 'BBBBBB',
            groupe: 'BBBBBB',
            bonDeSortie: 'BBBBBB',
            certificatAdministratif: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a MouvementMatiere', () => {
        const patchObject = Object.assign(
          {
            typeMouvement: 'BBBBBB',
            ressource: 'BBBBBB',
            bordeauDeLivraison: 'BBBBBB',
          },
          new MouvementMatiere()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MouvementMatiere', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            typeMouvement: 'BBBBBB',
            group: 'BBBBBB',
            organisation: 'BBBBBB',
            autreOrganisation: 'BBBBBB',
            ressource: 'BBBBBB',
            autreRessource: 'BBBBBB',
            designation: 'BBBBBB',
            pvReception: 'BBBBBB',
            bordeauDeLivraison: 'BBBBBB',
            groupe: 'BBBBBB',
            bonDeSortie: 'BBBBBB',
            certificatAdministratif: 'BBBBBB',
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

      it('should delete a MouvementMatiere', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMouvementMatiereToCollectionIfMissing', () => {
        it('should add a MouvementMatiere to an empty array', () => {
          const mouvementMatiere: IMouvementMatiere = { id: 123 };
          expectedResult = service.addMouvementMatiereToCollectionIfMissing([], mouvementMatiere);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(mouvementMatiere);
        });

        it('should not add a MouvementMatiere to an array that contains it', () => {
          const mouvementMatiere: IMouvementMatiere = { id: 123 };
          const mouvementMatiereCollection: IMouvementMatiere[] = [
            {
              ...mouvementMatiere,
            },
            { id: 456 },
          ];
          expectedResult = service.addMouvementMatiereToCollectionIfMissing(mouvementMatiereCollection, mouvementMatiere);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a MouvementMatiere to an array that doesn't contain it", () => {
          const mouvementMatiere: IMouvementMatiere = { id: 123 };
          const mouvementMatiereCollection: IMouvementMatiere[] = [{ id: 456 }];
          expectedResult = service.addMouvementMatiereToCollectionIfMissing(mouvementMatiereCollection, mouvementMatiere);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(mouvementMatiere);
        });

        it('should add only unique MouvementMatiere to an array', () => {
          const mouvementMatiereArray: IMouvementMatiere[] = [{ id: 123 }, { id: 456 }, { id: 13809 }];
          const mouvementMatiereCollection: IMouvementMatiere[] = [{ id: 123 }];
          expectedResult = service.addMouvementMatiereToCollectionIfMissing(mouvementMatiereCollection, ...mouvementMatiereArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const mouvementMatiere: IMouvementMatiere = { id: 123 };
          const mouvementMatiere2: IMouvementMatiere = { id: 456 };
          expectedResult = service.addMouvementMatiereToCollectionIfMissing([], mouvementMatiere, mouvementMatiere2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(mouvementMatiere);
          expect(expectedResult).toContain(mouvementMatiere2);
        });

        it('should accept null and undefined values', () => {
          const mouvementMatiere: IMouvementMatiere = { id: 123 };
          expectedResult = service.addMouvementMatiereToCollectionIfMissing([], null, mouvementMatiere, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(mouvementMatiere);
        });

        it('should return initial array if no MouvementMatiere is added', () => {
          const mouvementMatiereCollection: IMouvementMatiere[] = [{ id: 123 }];
          expectedResult = service.addMouvementMatiereToCollectionIfMissing(mouvementMatiereCollection, undefined, null);
          expect(expectedResult).toEqual(mouvementMatiereCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
