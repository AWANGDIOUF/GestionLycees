jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ReceptionService } from '../service/reception.service';
import { IReception, Reception } from '../reception.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { ComptableMatiereService } from 'app/entities/comptable-matiere/service/comptable-matiere.service';

import { ReceptionUpdateComponent } from './reception-update.component';

describe('Component Tests', () => {
  describe('Reception Management Update Component', () => {
    let comp: ReceptionUpdateComponent;
    let fixture: ComponentFixture<ReceptionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let receptionService: ReceptionService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let comptableMatiereService: ComptableMatiereService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ReceptionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ReceptionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReceptionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      receptionService = TestBed.inject(ReceptionService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      comptableMatiereService = TestBed.inject(ComptableMatiereService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceesTechniques query and add missing value', () => {
        const reception: IReception = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 61613 };
        reception.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 87908 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ reception });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call ComptableMatiere query and add missing value', () => {
        const reception: IReception = { id: 456 };
        const comptableMatiere: IComptableMatiere = { id: 35359 };
        reception.comptableMatiere = comptableMatiere;

        const comptableMatiereCollection: IComptableMatiere[] = [{ id: 1990 }];
        jest.spyOn(comptableMatiereService, 'query').mockReturnValue(of(new HttpResponse({ body: comptableMatiereCollection })));
        const additionalComptableMatieres = [comptableMatiere];
        const expectedCollection: IComptableMatiere[] = [...additionalComptableMatieres, ...comptableMatiereCollection];
        jest.spyOn(comptableMatiereService, 'addComptableMatiereToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ reception });
        comp.ngOnInit();

        expect(comptableMatiereService.query).toHaveBeenCalled();
        expect(comptableMatiereService.addComptableMatiereToCollectionIfMissing).toHaveBeenCalledWith(
          comptableMatiereCollection,
          ...additionalComptableMatieres
        );
        expect(comp.comptableMatieresSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const reception: IReception = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 83382 };
        reception.lyceesTechniques = lyceesTechniques;
        const comptableMatiere: IComptableMatiere = { id: 30414 };
        reception.comptableMatiere = comptableMatiere;

        activatedRoute.data = of({ reception });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(reception));
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.comptableMatieresSharedCollection).toContain(comptableMatiere);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Reception>>();
        const reception = { id: 123 };
        jest.spyOn(receptionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ reception });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: reception }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(receptionService.update).toHaveBeenCalledWith(reception);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Reception>>();
        const reception = new Reception();
        jest.spyOn(receptionService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ reception });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: reception }));
        saveSubject.complete();

        // THEN
        expect(receptionService.create).toHaveBeenCalledWith(reception);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Reception>>();
        const reception = { id: 123 };
        jest.spyOn(receptionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ reception });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(receptionService.update).toHaveBeenCalledWith(reception);
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

      describe('trackComptableMatiereById', () => {
        it('Should return tracked ComptableMatiere primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackComptableMatiereById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
