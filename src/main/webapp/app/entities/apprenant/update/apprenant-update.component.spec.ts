jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ApprenantService } from '../service/apprenant.service';
import { IApprenant, Apprenant } from '../apprenant.model';
import { ISerie } from 'app/entities/serie/serie.model';
import { SerieService } from 'app/entities/serie/service/serie.service';
import { IFiliere } from 'app/entities/filiere/filiere.model';
import { FiliereService } from 'app/entities/filiere/service/filiere.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';
import { DirecteurEtudeService } from 'app/entities/directeur-etude/service/directeur-etude.service';

import { ApprenantUpdateComponent } from './apprenant-update.component';

describe('Component Tests', () => {
  describe('Apprenant Management Update Component', () => {
    let comp: ApprenantUpdateComponent;
    let fixture: ComponentFixture<ApprenantUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let apprenantService: ApprenantService;
    let serieService: SerieService;
    let filiereService: FiliereService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let directeurEtudeService: DirecteurEtudeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ApprenantUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ApprenantUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ApprenantUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      apprenantService = TestBed.inject(ApprenantService);
      serieService = TestBed.inject(SerieService);
      filiereService = TestBed.inject(FiliereService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      directeurEtudeService = TestBed.inject(DirecteurEtudeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call serie query and add missing value', () => {
        const apprenant: IApprenant = { id: 456 };
        const serie: ISerie = { id: 5264 };
        apprenant.serie = serie;

        const serieCollection: ISerie[] = [{ id: 93840 }];
        jest.spyOn(serieService, 'query').mockReturnValue(of(new HttpResponse({ body: serieCollection })));
        const expectedCollection: ISerie[] = [serie, ...serieCollection];
        jest.spyOn(serieService, 'addSerieToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ apprenant });
        comp.ngOnInit();

        expect(serieService.query).toHaveBeenCalled();
        expect(serieService.addSerieToCollectionIfMissing).toHaveBeenCalledWith(serieCollection, serie);
        expect(comp.seriesCollection).toEqual(expectedCollection);
      });

      it('Should call filiere query and add missing value', () => {
        const apprenant: IApprenant = { id: 456 };
        const filiere: IFiliere = { id: 60243 };
        apprenant.filiere = filiere;

        const filiereCollection: IFiliere[] = [{ id: 81618 }];
        jest.spyOn(filiereService, 'query').mockReturnValue(of(new HttpResponse({ body: filiereCollection })));
        const expectedCollection: IFiliere[] = [filiere, ...filiereCollection];
        jest.spyOn(filiereService, 'addFiliereToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ apprenant });
        comp.ngOnInit();

        expect(filiereService.query).toHaveBeenCalled();
        expect(filiereService.addFiliereToCollectionIfMissing).toHaveBeenCalledWith(filiereCollection, filiere);
        expect(comp.filieresCollection).toEqual(expectedCollection);
      });

      it('Should call LyceesTechniques query and add missing value', () => {
        const apprenant: IApprenant = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 87016 };
        apprenant.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 15845 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ apprenant });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call DirecteurEtude query and add missing value', () => {
        const apprenant: IApprenant = { id: 456 };
        const directeur: IDirecteurEtude = { id: 91195 };
        apprenant.directeur = directeur;

        const directeurEtudeCollection: IDirecteurEtude[] = [{ id: 9653 }];
        jest.spyOn(directeurEtudeService, 'query').mockReturnValue(of(new HttpResponse({ body: directeurEtudeCollection })));
        const additionalDirecteurEtudes = [directeur];
        const expectedCollection: IDirecteurEtude[] = [...additionalDirecteurEtudes, ...directeurEtudeCollection];
        jest.spyOn(directeurEtudeService, 'addDirecteurEtudeToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ apprenant });
        comp.ngOnInit();

        expect(directeurEtudeService.query).toHaveBeenCalled();
        expect(directeurEtudeService.addDirecteurEtudeToCollectionIfMissing).toHaveBeenCalledWith(
          directeurEtudeCollection,
          ...additionalDirecteurEtudes
        );
        expect(comp.directeurEtudesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const apprenant: IApprenant = { id: 456 };
        const serie: ISerie = { id: 22088 };
        apprenant.serie = serie;
        const filiere: IFiliere = { id: 34861 };
        apprenant.filiere = filiere;
        const lyceesTechniques: ILyceesTechniques = { id: 52880 };
        apprenant.lyceesTechniques = lyceesTechniques;
        const directeur: IDirecteurEtude = { id: 39862 };
        apprenant.directeur = directeur;

        activatedRoute.data = of({ apprenant });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(apprenant));
        expect(comp.seriesCollection).toContain(serie);
        expect(comp.filieresCollection).toContain(filiere);
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.directeurEtudesSharedCollection).toContain(directeur);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Apprenant>>();
        const apprenant = { id: 123 };
        jest.spyOn(apprenantService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ apprenant });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: apprenant }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(apprenantService.update).toHaveBeenCalledWith(apprenant);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Apprenant>>();
        const apprenant = new Apprenant();
        jest.spyOn(apprenantService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ apprenant });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: apprenant }));
        saveSubject.complete();

        // THEN
        expect(apprenantService.create).toHaveBeenCalledWith(apprenant);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Apprenant>>();
        const apprenant = { id: 123 };
        jest.spyOn(apprenantService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ apprenant });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(apprenantService.update).toHaveBeenCalledWith(apprenant);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
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
    });
  });
});
