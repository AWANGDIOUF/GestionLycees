jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DifficulteService } from '../service/difficulte.service';
import { IDifficulte, Difficulte } from '../difficulte.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { ProviseurService } from 'app/entities/proviseur/service/proviseur.service';

import { DifficulteUpdateComponent } from './difficulte-update.component';

describe('Component Tests', () => {
  describe('Difficulte Management Update Component', () => {
    let comp: DifficulteUpdateComponent;
    let fixture: ComponentFixture<DifficulteUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let difficulteService: DifficulteService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let proviseurService: ProviseurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DifficulteUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DifficulteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DifficulteUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      difficulteService = TestBed.inject(DifficulteService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      proviseurService = TestBed.inject(ProviseurService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceesTechniques query and add missing value', () => {
        const difficulte: IDifficulte = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 18488 };
        difficulte.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 34587 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ difficulte });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Proviseur query and add missing value', () => {
        const difficulte: IDifficulte = { id: 456 };
        const proviseur: IProviseur = { id: 92146 };
        difficulte.proviseur = proviseur;

        const proviseurCollection: IProviseur[] = [{ id: 86246 }];
        jest.spyOn(proviseurService, 'query').mockReturnValue(of(new HttpResponse({ body: proviseurCollection })));
        const additionalProviseurs = [proviseur];
        const expectedCollection: IProviseur[] = [...additionalProviseurs, ...proviseurCollection];
        jest.spyOn(proviseurService, 'addProviseurToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ difficulte });
        comp.ngOnInit();

        expect(proviseurService.query).toHaveBeenCalled();
        expect(proviseurService.addProviseurToCollectionIfMissing).toHaveBeenCalledWith(proviseurCollection, ...additionalProviseurs);
        expect(comp.proviseursSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const difficulte: IDifficulte = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 85975 };
        difficulte.lyceesTechniques = lyceesTechniques;
        const proviseur: IProviseur = { id: 13583 };
        difficulte.proviseur = proviseur;

        activatedRoute.data = of({ difficulte });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(difficulte));
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.proviseursSharedCollection).toContain(proviseur);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Difficulte>>();
        const difficulte = { id: 123 };
        jest.spyOn(difficulteService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ difficulte });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: difficulte }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(difficulteService.update).toHaveBeenCalledWith(difficulte);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Difficulte>>();
        const difficulte = new Difficulte();
        jest.spyOn(difficulteService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ difficulte });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: difficulte }));
        saveSubject.complete();

        // THEN
        expect(difficulteService.create).toHaveBeenCalledWith(difficulte);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Difficulte>>();
        const difficulte = { id: 123 };
        jest.spyOn(difficulteService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ difficulte });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(difficulteService.update).toHaveBeenCalledWith(difficulte);
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
