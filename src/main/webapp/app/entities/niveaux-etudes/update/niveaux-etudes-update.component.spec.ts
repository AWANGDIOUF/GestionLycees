jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { NiveauxEtudesService } from '../service/niveaux-etudes.service';
import { INiveauxEtudes, NiveauxEtudes } from '../niveaux-etudes.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';
import { DirecteurEtudeService } from 'app/entities/directeur-etude/service/directeur-etude.service';
import { ISerie } from 'app/entities/serie/serie.model';
import { SerieService } from 'app/entities/serie/service/serie.service';

import { NiveauxEtudesUpdateComponent } from './niveaux-etudes-update.component';

describe('Component Tests', () => {
  describe('NiveauxEtudes Management Update Component', () => {
    let comp: NiveauxEtudesUpdateComponent;
    let fixture: ComponentFixture<NiveauxEtudesUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let niveauxEtudesService: NiveauxEtudesService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let directeurEtudeService: DirecteurEtudeService;
    let serieService: SerieService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [NiveauxEtudesUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(NiveauxEtudesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NiveauxEtudesUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      niveauxEtudesService = TestBed.inject(NiveauxEtudesService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      directeurEtudeService = TestBed.inject(DirecteurEtudeService);
      serieService = TestBed.inject(SerieService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceesTechniques query and add missing value', () => {
        const niveauxEtudes: INiveauxEtudes = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 40888 };
        niveauxEtudes.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 88062 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ niveauxEtudes });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call DirecteurEtude query and add missing value', () => {
        const niveauxEtudes: INiveauxEtudes = { id: 456 };
        const directeur: IDirecteurEtude = { id: 51198 };
        niveauxEtudes.directeur = directeur;

        const directeurEtudeCollection: IDirecteurEtude[] = [{ id: 20083 }];
        jest.spyOn(directeurEtudeService, 'query').mockReturnValue(of(new HttpResponse({ body: directeurEtudeCollection })));
        const additionalDirecteurEtudes = [directeur];
        const expectedCollection: IDirecteurEtude[] = [...additionalDirecteurEtudes, ...directeurEtudeCollection];
        jest.spyOn(directeurEtudeService, 'addDirecteurEtudeToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ niveauxEtudes });
        comp.ngOnInit();

        expect(directeurEtudeService.query).toHaveBeenCalled();
        expect(directeurEtudeService.addDirecteurEtudeToCollectionIfMissing).toHaveBeenCalledWith(
          directeurEtudeCollection,
          ...additionalDirecteurEtudes
        );
        expect(comp.directeurEtudesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Serie query and add missing value', () => {
        const niveauxEtudes: INiveauxEtudes = { id: 456 };
        const serie: ISerie = { id: 20470 };
        niveauxEtudes.serie = serie;

        const serieCollection: ISerie[] = [{ id: 58844 }];
        jest.spyOn(serieService, 'query').mockReturnValue(of(new HttpResponse({ body: serieCollection })));
        const additionalSeries = [serie];
        const expectedCollection: ISerie[] = [...additionalSeries, ...serieCollection];
        jest.spyOn(serieService, 'addSerieToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ niveauxEtudes });
        comp.ngOnInit();

        expect(serieService.query).toHaveBeenCalled();
        expect(serieService.addSerieToCollectionIfMissing).toHaveBeenCalledWith(serieCollection, ...additionalSeries);
        expect(comp.seriesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const niveauxEtudes: INiveauxEtudes = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 84366 };
        niveauxEtudes.lyceesTechniques = lyceesTechniques;
        const directeur: IDirecteurEtude = { id: 90602 };
        niveauxEtudes.directeur = directeur;
        const serie: ISerie = { id: 66382 };
        niveauxEtudes.serie = serie;

        activatedRoute.data = of({ niveauxEtudes });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(niveauxEtudes));
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.directeurEtudesSharedCollection).toContain(directeur);
        expect(comp.seriesSharedCollection).toContain(serie);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<NiveauxEtudes>>();
        const niveauxEtudes = { id: 123 };
        jest.spyOn(niveauxEtudesService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ niveauxEtudes });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: niveauxEtudes }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(niveauxEtudesService.update).toHaveBeenCalledWith(niveauxEtudes);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<NiveauxEtudes>>();
        const niveauxEtudes = new NiveauxEtudes();
        jest.spyOn(niveauxEtudesService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ niveauxEtudes });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: niveauxEtudes }));
        saveSubject.complete();

        // THEN
        expect(niveauxEtudesService.create).toHaveBeenCalledWith(niveauxEtudes);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<NiveauxEtudes>>();
        const niveauxEtudes = { id: 123 };
        jest.spyOn(niveauxEtudesService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ niveauxEtudes });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(niveauxEtudesService.update).toHaveBeenCalledWith(niveauxEtudes);
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
    });
  });
});
