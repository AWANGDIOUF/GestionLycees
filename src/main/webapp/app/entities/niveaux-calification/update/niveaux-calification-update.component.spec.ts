jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { NiveauxCalificationService } from '../service/niveaux-calification.service';
import { INiveauxCalification, NiveauxCalification } from '../niveaux-calification.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';
import { DirecteurEtudeService } from 'app/entities/directeur-etude/service/directeur-etude.service';
import { IProgramme } from 'app/entities/programme/programme.model';
import { ProgrammeService } from 'app/entities/programme/service/programme.service';

import { NiveauxCalificationUpdateComponent } from './niveaux-calification-update.component';

describe('Component Tests', () => {
  describe('NiveauxCalification Management Update Component', () => {
    let comp: NiveauxCalificationUpdateComponent;
    let fixture: ComponentFixture<NiveauxCalificationUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let niveauxCalificationService: NiveauxCalificationService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let directeurEtudeService: DirecteurEtudeService;
    let programmeService: ProgrammeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [NiveauxCalificationUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(NiveauxCalificationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NiveauxCalificationUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      niveauxCalificationService = TestBed.inject(NiveauxCalificationService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      directeurEtudeService = TestBed.inject(DirecteurEtudeService);
      programmeService = TestBed.inject(ProgrammeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceesTechniques query and add missing value', () => {
        const niveauxCalification: INiveauxCalification = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 80180 };
        niveauxCalification.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 96547 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ niveauxCalification });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call DirecteurEtude query and add missing value', () => {
        const niveauxCalification: INiveauxCalification = { id: 456 };
        const directeur: IDirecteurEtude = { id: 39159 };
        niveauxCalification.directeur = directeur;

        const directeurEtudeCollection: IDirecteurEtude[] = [{ id: 14700 }];
        jest.spyOn(directeurEtudeService, 'query').mockReturnValue(of(new HttpResponse({ body: directeurEtudeCollection })));
        const additionalDirecteurEtudes = [directeur];
        const expectedCollection: IDirecteurEtude[] = [...additionalDirecteurEtudes, ...directeurEtudeCollection];
        jest.spyOn(directeurEtudeService, 'addDirecteurEtudeToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ niveauxCalification });
        comp.ngOnInit();

        expect(directeurEtudeService.query).toHaveBeenCalled();
        expect(directeurEtudeService.addDirecteurEtudeToCollectionIfMissing).toHaveBeenCalledWith(
          directeurEtudeCollection,
          ...additionalDirecteurEtudes
        );
        expect(comp.directeurEtudesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Programme query and add missing value', () => {
        const niveauxCalification: INiveauxCalification = { id: 456 };
        const programme: IProgramme = { id: 83048 };
        niveauxCalification.programme = programme;

        const programmeCollection: IProgramme[] = [{ id: 2625 }];
        jest.spyOn(programmeService, 'query').mockReturnValue(of(new HttpResponse({ body: programmeCollection })));
        const additionalProgrammes = [programme];
        const expectedCollection: IProgramme[] = [...additionalProgrammes, ...programmeCollection];
        jest.spyOn(programmeService, 'addProgrammeToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ niveauxCalification });
        comp.ngOnInit();

        expect(programmeService.query).toHaveBeenCalled();
        expect(programmeService.addProgrammeToCollectionIfMissing).toHaveBeenCalledWith(programmeCollection, ...additionalProgrammes);
        expect(comp.programmesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const niveauxCalification: INiveauxCalification = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 14942 };
        niveauxCalification.lyceesTechniques = lyceesTechniques;
        const directeur: IDirecteurEtude = { id: 61080 };
        niveauxCalification.directeur = directeur;
        const programme: IProgramme = { id: 54312 };
        niveauxCalification.programme = programme;

        activatedRoute.data = of({ niveauxCalification });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(niveauxCalification));
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.directeurEtudesSharedCollection).toContain(directeur);
        expect(comp.programmesSharedCollection).toContain(programme);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<NiveauxCalification>>();
        const niveauxCalification = { id: 123 };
        jest.spyOn(niveauxCalificationService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ niveauxCalification });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: niveauxCalification }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(niveauxCalificationService.update).toHaveBeenCalledWith(niveauxCalification);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<NiveauxCalification>>();
        const niveauxCalification = new NiveauxCalification();
        jest.spyOn(niveauxCalificationService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ niveauxCalification });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: niveauxCalification }));
        saveSubject.complete();

        // THEN
        expect(niveauxCalificationService.create).toHaveBeenCalledWith(niveauxCalification);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<NiveauxCalification>>();
        const niveauxCalification = { id: 123 };
        jest.spyOn(niveauxCalificationService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ niveauxCalification });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(niveauxCalificationService.update).toHaveBeenCalledWith(niveauxCalification);
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

      describe('trackDirecteurEtudeById', () => {
        it('Should return tracked DirecteurEtude primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackDirecteurEtudeById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackProgrammeById', () => {
        it('Should return tracked Programme primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackProgrammeById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
