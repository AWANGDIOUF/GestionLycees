jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DepenseService } from '../service/depense.service';
import { IDepense, Depense } from '../depense.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IComptableFinancier } from 'app/entities/comptable-financier/comptable-financier.model';
import { ComptableFinancierService } from 'app/entities/comptable-financier/service/comptable-financier.service';

import { DepenseUpdateComponent } from './depense-update.component';

describe('Component Tests', () => {
  describe('Depense Management Update Component', () => {
    let comp: DepenseUpdateComponent;
    let fixture: ComponentFixture<DepenseUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let depenseService: DepenseService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let comptableFinancierService: ComptableFinancierService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DepenseUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DepenseUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepenseUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      depenseService = TestBed.inject(DepenseService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      comptableFinancierService = TestBed.inject(ComptableFinancierService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceesTechniques query and add missing value', () => {
        const depense: IDepense = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 60422 };
        depense.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 16735 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ depense });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call ComptableFinancier query and add missing value', () => {
        const depense: IDepense = { id: 456 };
        const comptableFinancier: IComptableFinancier = { id: 38181 };
        depense.comptableFinancier = comptableFinancier;

        const comptableFinancierCollection: IComptableFinancier[] = [{ id: 5244 }];
        jest.spyOn(comptableFinancierService, 'query').mockReturnValue(of(new HttpResponse({ body: comptableFinancierCollection })));
        const additionalComptableFinanciers = [comptableFinancier];
        const expectedCollection: IComptableFinancier[] = [...additionalComptableFinanciers, ...comptableFinancierCollection];
        jest.spyOn(comptableFinancierService, 'addComptableFinancierToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ depense });
        comp.ngOnInit();

        expect(comptableFinancierService.query).toHaveBeenCalled();
        expect(comptableFinancierService.addComptableFinancierToCollectionIfMissing).toHaveBeenCalledWith(
          comptableFinancierCollection,
          ...additionalComptableFinanciers
        );
        expect(comp.comptableFinanciersSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const depense: IDepense = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 10909 };
        depense.lyceesTechniques = lyceesTechniques;
        const comptableFinancier: IComptableFinancier = { id: 65573 };
        depense.comptableFinancier = comptableFinancier;

        activatedRoute.data = of({ depense });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(depense));
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.comptableFinanciersSharedCollection).toContain(comptableFinancier);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Depense>>();
        const depense = { id: 123 };
        jest.spyOn(depenseService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ depense });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: depense }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(depenseService.update).toHaveBeenCalledWith(depense);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Depense>>();
        const depense = new Depense();
        jest.spyOn(depenseService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ depense });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: depense }));
        saveSubject.complete();

        // THEN
        expect(depenseService.create).toHaveBeenCalledWith(depense);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Depense>>();
        const depense = { id: 123 };
        jest.spyOn(depenseService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ depense });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(depenseService.update).toHaveBeenCalledWith(depense);
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
