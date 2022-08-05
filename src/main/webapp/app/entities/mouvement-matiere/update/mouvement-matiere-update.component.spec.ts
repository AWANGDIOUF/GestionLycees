jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MouvementMatiereService } from '../service/mouvement-matiere.service';
import { IMouvementMatiere, MouvementMatiere } from '../mouvement-matiere.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { ComptableMatiereService } from 'app/entities/comptable-matiere/service/comptable-matiere.service';

import { MouvementMatiereUpdateComponent } from './mouvement-matiere-update.component';

describe('Component Tests', () => {
  describe('MouvementMatiere Management Update Component', () => {
    let comp: MouvementMatiereUpdateComponent;
    let fixture: ComponentFixture<MouvementMatiereUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let mouvementMatiereService: MouvementMatiereService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let comptableMatiereService: ComptableMatiereService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MouvementMatiereUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MouvementMatiereUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MouvementMatiereUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      mouvementMatiereService = TestBed.inject(MouvementMatiereService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      comptableMatiereService = TestBed.inject(ComptableMatiereService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceesTechniques query and add missing value', () => {
        const mouvementMatiere: IMouvementMatiere = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 45024 };
        mouvementMatiere.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 29500 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ mouvementMatiere });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call ComptableMatiere query and add missing value', () => {
        const mouvementMatiere: IMouvementMatiere = { id: 456 };
        const comptableMatiere: IComptableMatiere = { id: 16071 };
        mouvementMatiere.comptableMatiere = comptableMatiere;

        const comptableMatiereCollection: IComptableMatiere[] = [{ id: 59240 }];
        jest.spyOn(comptableMatiereService, 'query').mockReturnValue(of(new HttpResponse({ body: comptableMatiereCollection })));
        const additionalComptableMatieres = [comptableMatiere];
        const expectedCollection: IComptableMatiere[] = [...additionalComptableMatieres, ...comptableMatiereCollection];
        jest.spyOn(comptableMatiereService, 'addComptableMatiereToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ mouvementMatiere });
        comp.ngOnInit();

        expect(comptableMatiereService.query).toHaveBeenCalled();
        expect(comptableMatiereService.addComptableMatiereToCollectionIfMissing).toHaveBeenCalledWith(
          comptableMatiereCollection,
          ...additionalComptableMatieres
        );
        expect(comp.comptableMatieresSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const mouvementMatiere: IMouvementMatiere = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 12231 };
        mouvementMatiere.lyceesTechniques = lyceesTechniques;
        const comptableMatiere: IComptableMatiere = { id: 59544 };
        mouvementMatiere.comptableMatiere = comptableMatiere;

        activatedRoute.data = of({ mouvementMatiere });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(mouvementMatiere));
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.comptableMatieresSharedCollection).toContain(comptableMatiere);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MouvementMatiere>>();
        const mouvementMatiere = { id: 123 };
        jest.spyOn(mouvementMatiereService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ mouvementMatiere });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: mouvementMatiere }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(mouvementMatiereService.update).toHaveBeenCalledWith(mouvementMatiere);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MouvementMatiere>>();
        const mouvementMatiere = new MouvementMatiere();
        jest.spyOn(mouvementMatiereService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ mouvementMatiere });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: mouvementMatiere }));
        saveSubject.complete();

        // THEN
        expect(mouvementMatiereService.create).toHaveBeenCalledWith(mouvementMatiere);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MouvementMatiere>>();
        const mouvementMatiere = { id: 123 };
        jest.spyOn(mouvementMatiereService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ mouvementMatiere });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(mouvementMatiereService.update).toHaveBeenCalledWith(mouvementMatiere);
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
