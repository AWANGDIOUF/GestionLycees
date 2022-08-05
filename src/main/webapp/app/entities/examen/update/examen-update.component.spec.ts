jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ExamenService } from '../service/examen.service';
import { IExamen, Examen } from '../examen.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';
import { DirecteurEtudeService } from 'app/entities/directeur-etude/service/directeur-etude.service';
import { ISerie } from 'app/entities/serie/serie.model';
import { SerieService } from 'app/entities/serie/service/serie.service';
import { IFiliere } from 'app/entities/filiere/filiere.model';
import { FiliereService } from 'app/entities/filiere/service/filiere.service';
import { IApprenant } from 'app/entities/apprenant/apprenant.model';
import { ApprenantService } from 'app/entities/apprenant/service/apprenant.service';

import { ExamenUpdateComponent } from './examen-update.component';

describe('Component Tests', () => {
  describe('Examen Management Update Component', () => {
    let comp: ExamenUpdateComponent;
    let fixture: ComponentFixture<ExamenUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let examenService: ExamenService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let directeurEtudeService: DirecteurEtudeService;
    let serieService: SerieService;
    let filiereService: FiliereService;
    let apprenantService: ApprenantService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ExamenUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ExamenUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExamenUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      examenService = TestBed.inject(ExamenService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      directeurEtudeService = TestBed.inject(DirecteurEtudeService);
      serieService = TestBed.inject(SerieService);
      filiereService = TestBed.inject(FiliereService);
      apprenantService = TestBed.inject(ApprenantService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceesTechniques query and add missing value', () => {
        const examen: IExamen = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 2976 };
        examen.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 6060 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ examen });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call DirecteurEtude query and add missing value', () => {
        const examen: IExamen = { id: 456 };
        const directeur: IDirecteurEtude = { id: 47301 };
        examen.directeur = directeur;

        const directeurEtudeCollection: IDirecteurEtude[] = [{ id: 33466 }];
        jest.spyOn(directeurEtudeService, 'query').mockReturnValue(of(new HttpResponse({ body: directeurEtudeCollection })));
        const additionalDirecteurEtudes = [directeur];
        const expectedCollection: IDirecteurEtude[] = [...additionalDirecteurEtudes, ...directeurEtudeCollection];
        jest.spyOn(directeurEtudeService, 'addDirecteurEtudeToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ examen });
        comp.ngOnInit();

        expect(directeurEtudeService.query).toHaveBeenCalled();
        expect(directeurEtudeService.addDirecteurEtudeToCollectionIfMissing).toHaveBeenCalledWith(
          directeurEtudeCollection,
          ...additionalDirecteurEtudes
        );
        expect(comp.directeurEtudesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Serie query and add missing value', () => {
        const examen: IExamen = { id: 456 };
        const serie: ISerie = { id: 7422 };
        examen.serie = serie;

        const serieCollection: ISerie[] = [{ id: 29550 }];
        jest.spyOn(serieService, 'query').mockReturnValue(of(new HttpResponse({ body: serieCollection })));
        const additionalSeries = [serie];
        const expectedCollection: ISerie[] = [...additionalSeries, ...serieCollection];
        jest.spyOn(serieService, 'addSerieToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ examen });
        comp.ngOnInit();

        expect(serieService.query).toHaveBeenCalled();
        expect(serieService.addSerieToCollectionIfMissing).toHaveBeenCalledWith(serieCollection, ...additionalSeries);
        expect(comp.seriesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Filiere query and add missing value', () => {
        const examen: IExamen = { id: 456 };
        const filiere: IFiliere = { id: 45738 };
        examen.filiere = filiere;

        const filiereCollection: IFiliere[] = [{ id: 94782 }];
        jest.spyOn(filiereService, 'query').mockReturnValue(of(new HttpResponse({ body: filiereCollection })));
        const additionalFilieres = [filiere];
        const expectedCollection: IFiliere[] = [...additionalFilieres, ...filiereCollection];
        jest.spyOn(filiereService, 'addFiliereToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ examen });
        comp.ngOnInit();

        expect(filiereService.query).toHaveBeenCalled();
        expect(filiereService.addFiliereToCollectionIfMissing).toHaveBeenCalledWith(filiereCollection, ...additionalFilieres);
        expect(comp.filieresSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Apprenant query and add missing value', () => {
        const examen: IExamen = { id: 456 };
        const apprenant: IApprenant = { id: 94913 };
        examen.apprenant = apprenant;

        const apprenantCollection: IApprenant[] = [{ id: 58380 }];
        jest.spyOn(apprenantService, 'query').mockReturnValue(of(new HttpResponse({ body: apprenantCollection })));
        const additionalApprenants = [apprenant];
        const expectedCollection: IApprenant[] = [...additionalApprenants, ...apprenantCollection];
        jest.spyOn(apprenantService, 'addApprenantToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ examen });
        comp.ngOnInit();

        expect(apprenantService.query).toHaveBeenCalled();
        expect(apprenantService.addApprenantToCollectionIfMissing).toHaveBeenCalledWith(apprenantCollection, ...additionalApprenants);
        expect(comp.apprenantsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const examen: IExamen = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 15788 };
        examen.lyceesTechniques = lyceesTechniques;
        const directeur: IDirecteurEtude = { id: 74874 };
        examen.directeur = directeur;
        const serie: ISerie = { id: 40453 };
        examen.serie = serie;
        const filiere: IFiliere = { id: 44654 };
        examen.filiere = filiere;
        const apprenant: IApprenant = { id: 26461 };
        examen.apprenant = apprenant;

        activatedRoute.data = of({ examen });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(examen));
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.directeurEtudesSharedCollection).toContain(directeur);
        expect(comp.seriesSharedCollection).toContain(serie);
        expect(comp.filieresSharedCollection).toContain(filiere);
        expect(comp.apprenantsSharedCollection).toContain(apprenant);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Examen>>();
        const examen = { id: 123 };
        jest.spyOn(examenService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ examen });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: examen }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(examenService.update).toHaveBeenCalledWith(examen);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Examen>>();
        const examen = new Examen();
        jest.spyOn(examenService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ examen });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: examen }));
        saveSubject.complete();

        // THEN
        expect(examenService.create).toHaveBeenCalledWith(examen);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Examen>>();
        const examen = { id: 123 };
        jest.spyOn(examenService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ examen });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(examenService.update).toHaveBeenCalledWith(examen);
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

      describe('trackApprenantById', () => {
        it('Should return tracked Apprenant primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackApprenantById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
