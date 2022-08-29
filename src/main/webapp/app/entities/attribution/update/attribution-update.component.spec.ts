jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { AttributionService } from '../service/attribution.service';
import { IAttribution, Attribution } from '../attribution.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { ComptableMatiereService } from 'app/entities/comptable-matiere/service/comptable-matiere.service';
import { IReception } from 'app/entities/reception/reception.model';
import { ReceptionService } from 'app/entities/reception/service/reception.service';

import { AttributionUpdateComponent } from './attribution-update.component';

describe('Component Tests', () => {
  describe('Attribution Management Update Component', () => {
    let comp: AttributionUpdateComponent;
    let fixture: ComponentFixture<AttributionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let attributionService: AttributionService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let comptableMatiereService: ComptableMatiereService;
    let receptionService: ReceptionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AttributionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(AttributionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AttributionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      attributionService = TestBed.inject(AttributionService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      comptableMatiereService = TestBed.inject(ComptableMatiereService);
      receptionService = TestBed.inject(ReceptionService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceesTechniques query and add missing value', () => {
        const attribution: IAttribution = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 7382 };
        attribution.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 86239 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ attribution });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call ComptableMatiere query and add missing value', () => {
        const attribution: IAttribution = { id: 456 };
        const comptableMatiere: IComptableMatiere = { id: 24062 };
        attribution.comptableMatiere = comptableMatiere;

        const comptableMatiereCollection: IComptableMatiere[] = [{ id: 13322 }];
        jest.spyOn(comptableMatiereService, 'query').mockReturnValue(of(new HttpResponse({ body: comptableMatiereCollection })));
        const additionalComptableMatieres = [comptableMatiere];
        const expectedCollection: IComptableMatiere[] = [...additionalComptableMatieres, ...comptableMatiereCollection];
        jest.spyOn(comptableMatiereService, 'addComptableMatiereToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ attribution });
        comp.ngOnInit();

        expect(comptableMatiereService.query).toHaveBeenCalled();
        expect(comptableMatiereService.addComptableMatiereToCollectionIfMissing).toHaveBeenCalledWith(
          comptableMatiereCollection,
          ...additionalComptableMatieres
        );
        expect(comp.comptableMatieresSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Reception query and add missing value', () => {
        const attribution: IAttribution = { id: 456 };
        const reception: IReception = { id: 15843 };
        attribution.reception = reception;

        const receptionCollection: IReception[] = [{ id: 48910 }];
        jest.spyOn(receptionService, 'query').mockReturnValue(of(new HttpResponse({ body: receptionCollection })));
        const additionalReceptions = [reception];
        const expectedCollection: IReception[] = [...additionalReceptions, ...receptionCollection];
        jest.spyOn(receptionService, 'addReceptionToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ attribution });
        comp.ngOnInit();

        expect(receptionService.query).toHaveBeenCalled();
        expect(receptionService.addReceptionToCollectionIfMissing).toHaveBeenCalledWith(receptionCollection, ...additionalReceptions);
        expect(comp.receptionsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const attribution: IAttribution = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 23050 };
        attribution.lyceesTechniques = lyceesTechniques;
        const comptableMatiere: IComptableMatiere = { id: 79930 };
        attribution.comptableMatiere = comptableMatiere;
        const reception: IReception = { id: 65175 };
        attribution.reception = reception;

        activatedRoute.data = of({ attribution });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(attribution));
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.comptableMatieresSharedCollection).toContain(comptableMatiere);
        expect(comp.receptionsSharedCollection).toContain(reception);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Attribution>>();
        const attribution = { id: 123 };
        jest.spyOn(attributionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ attribution });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: attribution }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(attributionService.update).toHaveBeenCalledWith(attribution);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Attribution>>();
        const attribution = new Attribution();
        jest.spyOn(attributionService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ attribution });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: attribution }));
        saveSubject.complete();

        // THEN
        expect(attributionService.create).toHaveBeenCalledWith(attribution);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Attribution>>();
        const attribution = { id: 123 };
        jest.spyOn(attributionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ attribution });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(attributionService.update).toHaveBeenCalledWith(attribution);
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

      describe('trackReceptionById', () => {
        it('Should return tracked Reception primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackReceptionById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
