jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EnseignantService } from '../service/enseignant.service';
import { IEnseignant, Enseignant } from '../enseignant.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { ISerie } from 'app/entities/serie/serie.model';
import { SerieService } from 'app/entities/serie/service/serie.service';
import { IFiliere } from 'app/entities/filiere/filiere.model';
import { FiliereService } from 'app/entities/filiere/service/filiere.service';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { ProviseurService } from 'app/entities/proviseur/service/proviseur.service';

import { EnseignantUpdateComponent } from './enseignant-update.component';

describe('Component Tests', () => {
  describe('Enseignant Management Update Component', () => {
    let comp: EnseignantUpdateComponent;
    let fixture: ComponentFixture<EnseignantUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let enseignantService: EnseignantService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let serieService: SerieService;
    let filiereService: FiliereService;
    let proviseurService: ProviseurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EnseignantUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EnseignantUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EnseignantUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      enseignantService = TestBed.inject(EnseignantService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      serieService = TestBed.inject(SerieService);
      filiereService = TestBed.inject(FiliereService);
      proviseurService = TestBed.inject(ProviseurService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceesTechniques query and add missing value', () => {
        const enseignant: IEnseignant = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 99550 };
        enseignant.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 27140 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ enseignant });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Serie query and add missing value', () => {
        const enseignant: IEnseignant = { id: 456 };
        const serie: ISerie = { id: 93 };
        enseignant.serie = serie;

        const serieCollection: ISerie[] = [{ id: 48985 }];
        jest.spyOn(serieService, 'query').mockReturnValue(of(new HttpResponse({ body: serieCollection })));
        const additionalSeries = [serie];
        const expectedCollection: ISerie[] = [...additionalSeries, ...serieCollection];
        jest.spyOn(serieService, 'addSerieToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ enseignant });
        comp.ngOnInit();

        expect(serieService.query).toHaveBeenCalled();
        expect(serieService.addSerieToCollectionIfMissing).toHaveBeenCalledWith(serieCollection, ...additionalSeries);
        expect(comp.seriesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Filiere query and add missing value', () => {
        const enseignant: IEnseignant = { id: 456 };
        const filiere: IFiliere = { id: 7992 };
        enseignant.filiere = filiere;

        const filiereCollection: IFiliere[] = [{ id: 37577 }];
        jest.spyOn(filiereService, 'query').mockReturnValue(of(new HttpResponse({ body: filiereCollection })));
        const additionalFilieres = [filiere];
        const expectedCollection: IFiliere[] = [...additionalFilieres, ...filiereCollection];
        jest.spyOn(filiereService, 'addFiliereToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ enseignant });
        comp.ngOnInit();

        expect(filiereService.query).toHaveBeenCalled();
        expect(filiereService.addFiliereToCollectionIfMissing).toHaveBeenCalledWith(filiereCollection, ...additionalFilieres);
        expect(comp.filieresSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Proviseur query and add missing value', () => {
        const enseignant: IEnseignant = { id: 456 };
        const proviseur: IProviseur = { id: 13407 };
        enseignant.proviseur = proviseur;

        const proviseurCollection: IProviseur[] = [{ id: 43975 }];
        jest.spyOn(proviseurService, 'query').mockReturnValue(of(new HttpResponse({ body: proviseurCollection })));
        const additionalProviseurs = [proviseur];
        const expectedCollection: IProviseur[] = [...additionalProviseurs, ...proviseurCollection];
        jest.spyOn(proviseurService, 'addProviseurToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ enseignant });
        comp.ngOnInit();

        expect(proviseurService.query).toHaveBeenCalled();
        expect(proviseurService.addProviseurToCollectionIfMissing).toHaveBeenCalledWith(proviseurCollection, ...additionalProviseurs);
        expect(comp.proviseursSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const enseignant: IEnseignant = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 82012 };
        enseignant.lyceesTechniques = lyceesTechniques;
        const serie: ISerie = { id: 21883 };
        enseignant.serie = serie;
        const filiere: IFiliere = { id: 20916 };
        enseignant.filiere = filiere;
        const proviseur: IProviseur = { id: 57980 };
        enseignant.proviseur = proviseur;

        activatedRoute.data = of({ enseignant });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(enseignant));
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.seriesSharedCollection).toContain(serie);
        expect(comp.filieresSharedCollection).toContain(filiere);
        expect(comp.proviseursSharedCollection).toContain(proviseur);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Enseignant>>();
        const enseignant = { id: 123 };
        jest.spyOn(enseignantService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ enseignant });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: enseignant }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(enseignantService.update).toHaveBeenCalledWith(enseignant);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Enseignant>>();
        const enseignant = new Enseignant();
        jest.spyOn(enseignantService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ enseignant });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: enseignant }));
        saveSubject.complete();

        // THEN
        expect(enseignantService.create).toHaveBeenCalledWith(enseignant);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Enseignant>>();
        const enseignant = { id: 123 };
        jest.spyOn(enseignantService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ enseignant });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(enseignantService.update).toHaveBeenCalledWith(enseignant);
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

      describe('trackSerieById', () => {
        it('Should return tracked Serie primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackSerieById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackFiliereById', () => {
        it('Should return tracked Filiere primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackFiliereById(0, entity);
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
