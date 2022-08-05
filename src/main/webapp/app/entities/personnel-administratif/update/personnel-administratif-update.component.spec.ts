jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PersonnelAdministratifService } from '../service/personnel-administratif.service';
import { IPersonnelAdministratif, PersonnelAdministratif } from '../personnel-administratif.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { ProviseurService } from 'app/entities/proviseur/service/proviseur.service';

import { PersonnelAdministratifUpdateComponent } from './personnel-administratif-update.component';

describe('Component Tests', () => {
  describe('PersonnelAdministratif Management Update Component', () => {
    let comp: PersonnelAdministratifUpdateComponent;
    let fixture: ComponentFixture<PersonnelAdministratifUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let personnelAdministratifService: PersonnelAdministratifService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let proviseurService: ProviseurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PersonnelAdministratifUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PersonnelAdministratifUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PersonnelAdministratifUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      personnelAdministratifService = TestBed.inject(PersonnelAdministratifService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      proviseurService = TestBed.inject(ProviseurService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceesTechniques query and add missing value', () => {
        const personnelAdministratif: IPersonnelAdministratif = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 799 };
        personnelAdministratif.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 72369 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ personnelAdministratif });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Proviseur query and add missing value', () => {
        const personnelAdministratif: IPersonnelAdministratif = { id: 456 };
        const proviseur: IProviseur = { id: 56375 };
        personnelAdministratif.proviseur = proviseur;

        const proviseurCollection: IProviseur[] = [{ id: 37265 }];
        jest.spyOn(proviseurService, 'query').mockReturnValue(of(new HttpResponse({ body: proviseurCollection })));
        const additionalProviseurs = [proviseur];
        const expectedCollection: IProviseur[] = [...additionalProviseurs, ...proviseurCollection];
        jest.spyOn(proviseurService, 'addProviseurToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ personnelAdministratif });
        comp.ngOnInit();

        expect(proviseurService.query).toHaveBeenCalled();
        expect(proviseurService.addProviseurToCollectionIfMissing).toHaveBeenCalledWith(proviseurCollection, ...additionalProviseurs);
        expect(comp.proviseursSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const personnelAdministratif: IPersonnelAdministratif = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 91477 };
        personnelAdministratif.lyceesTechniques = lyceesTechniques;
        const proviseur: IProviseur = { id: 89475 };
        personnelAdministratif.proviseur = proviseur;

        activatedRoute.data = of({ personnelAdministratif });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(personnelAdministratif));
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.proviseursSharedCollection).toContain(proviseur);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PersonnelAdministratif>>();
        const personnelAdministratif = { id: 123 };
        jest.spyOn(personnelAdministratifService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ personnelAdministratif });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: personnelAdministratif }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(personnelAdministratifService.update).toHaveBeenCalledWith(personnelAdministratif);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PersonnelAdministratif>>();
        const personnelAdministratif = new PersonnelAdministratif();
        jest.spyOn(personnelAdministratifService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ personnelAdministratif });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: personnelAdministratif }));
        saveSubject.complete();

        // THEN
        expect(personnelAdministratifService.create).toHaveBeenCalledWith(personnelAdministratif);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PersonnelAdministratif>>();
        const personnelAdministratif = { id: 123 };
        jest.spyOn(personnelAdministratifService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ personnelAdministratif });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(personnelAdministratifService.update).toHaveBeenCalledWith(personnelAdministratif);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackLyceesTechniquesById', () => {
        it('Should return tracked LyceesTechniques primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackLyceesTechniquesById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackProviseurById', () => {
        it('Should return tracked Proviseur primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackProviseurById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
