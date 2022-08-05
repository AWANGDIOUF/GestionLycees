jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { RecetteService } from '../service/recette.service';
import { IRecette, Recette } from '../recette.model';
import { IDepense } from 'app/entities/depense/depense.model';
import { DepenseService } from 'app/entities/depense/service/depense.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IComptableFinancier } from 'app/entities/comptable-financier/comptable-financier.model';
import { ComptableFinancierService } from 'app/entities/comptable-financier/service/comptable-financier.service';

import { RecetteUpdateComponent } from './recette-update.component';

describe('Component Tests', () => {
  describe('Recette Management Update Component', () => {
    let comp: RecetteUpdateComponent;
    let fixture: ComponentFixture<RecetteUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let recetteService: RecetteService;
    let depenseService: DepenseService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let comptableFinancierService: ComptableFinancierService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [RecetteUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(RecetteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecetteUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      recetteService = TestBed.inject(RecetteService);
      depenseService = TestBed.inject(DepenseService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      comptableFinancierService = TestBed.inject(ComptableFinancierService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Depense query and add missing value', () => {
        const recette: IRecette = { id: 456 };
        const depense: IDepense = { id: 36465 };
        recette.depense = depense;

        const depenseCollection: IDepense[] = [{ id: 69549 }];
        jest.spyOn(depenseService, 'query').mockReturnValue(of(new HttpResponse({ body: depenseCollection })));
        const additionalDepenses = [depense];
        const expectedCollection: IDepense[] = [...additionalDepenses, ...depenseCollection];
        jest.spyOn(depenseService, 'addDepenseToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ recette });
        comp.ngOnInit();

        expect(depenseService.query).toHaveBeenCalled();
        expect(depenseService.addDepenseToCollectionIfMissing).toHaveBeenCalledWith(depenseCollection, ...additionalDepenses);
        expect(comp.depensesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call LyceesTechniques query and add missing value', () => {
        const recette: IRecette = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 9949 };
        recette.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 94132 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ recette });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call ComptableFinancier query and add missing value', () => {
        const recette: IRecette = { id: 456 };
        const comptableFinancier: IComptableFinancier = { id: 65159 };
        recette.comptableFinancier = comptableFinancier;

        const comptableFinancierCollection: IComptableFinancier[] = [{ id: 13252 }];
        jest.spyOn(comptableFinancierService, 'query').mockReturnValue(of(new HttpResponse({ body: comptableFinancierCollection })));
        const additionalComptableFinanciers = [comptableFinancier];
        const expectedCollection: IComptableFinancier[] = [...additionalComptableFinanciers, ...comptableFinancierCollection];
        jest.spyOn(comptableFinancierService, 'addComptableFinancierToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ recette });
        comp.ngOnInit();

        expect(comptableFinancierService.query).toHaveBeenCalled();
        expect(comptableFinancierService.addComptableFinancierToCollectionIfMissing).toHaveBeenCalledWith(
          comptableFinancierCollection,
          ...additionalComptableFinanciers
        );
        expect(comp.comptableFinanciersSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const recette: IRecette = { id: 456 };
        const depense: IDepense = { id: 41751 };
        recette.depense = depense;
        const lyceesTechniques: ILyceesTechniques = { id: 71945 };
        recette.lyceesTechniques = lyceesTechniques;
        const comptableFinancier: IComptableFinancier = { id: 89627 };
        recette.comptableFinancier = comptableFinancier;

        activatedRoute.data = of({ recette });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(recette));
        expect(comp.depensesSharedCollection).toContain(depense);
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.comptableFinanciersSharedCollection).toContain(comptableFinancier);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Recette>>();
        const recette = { id: 123 };
        jest.spyOn(recetteService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ recette });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: recette }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(recetteService.update).toHaveBeenCalledWith(recette);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Recette>>();
        const recette = new Recette();
        jest.spyOn(recetteService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ recette });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: recette }));
        saveSubject.complete();

        // THEN
        expect(recetteService.create).toHaveBeenCalledWith(recette);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Recette>>();
        const recette = { id: 123 };
        jest.spyOn(recetteService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ recette });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(recetteService.update).toHaveBeenCalledWith(recette);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackDepenseById', () => {
        it('Should return tracked Depense primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackDepenseById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackLyceesTechniquesById', () => {
        it('Should return tracked LyceesTechniques primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackLyceesTechniquesById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackComptableFinancierById', () => {
        it('Should return tracked ComptableFinancier primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackComptableFinancierById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
