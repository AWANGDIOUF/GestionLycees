jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SerieService } from '../service/serie.service';
import { ISerie, Serie } from '../serie.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';
import { DirecteurEtudeService } from 'app/entities/directeur-etude/service/directeur-etude.service';

import { SerieUpdateComponent } from './serie-update.component';

describe('Component Tests', () => {
  describe('Serie Management Update Component', () => {
    let comp: SerieUpdateComponent;
    let fixture: ComponentFixture<SerieUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let serieService: SerieService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let directeurEtudeService: DirecteurEtudeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SerieUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(SerieUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SerieUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      serieService = TestBed.inject(SerieService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      directeurEtudeService = TestBed.inject(DirecteurEtudeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceesTechniques query and add missing value', () => {
        const serie: ISerie = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 29823 };
        serie.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 33556 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ serie });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call DirecteurEtude query and add missing value', () => {
        const serie: ISerie = { id: 456 };
        const directeur: IDirecteurEtude = { id: 5315 };
        serie.directeur = directeur;

        const directeurEtudeCollection: IDirecteurEtude[] = [{ id: 64617 }];
        jest.spyOn(directeurEtudeService, 'query').mockReturnValue(of(new HttpResponse({ body: directeurEtudeCollection })));
        const additionalDirecteurEtudes = [directeur];
        const expectedCollection: IDirecteurEtude[] = [...additionalDirecteurEtudes, ...directeurEtudeCollection];
        jest.spyOn(directeurEtudeService, 'addDirecteurEtudeToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ serie });
        comp.ngOnInit();

        expect(directeurEtudeService.query).toHaveBeenCalled();
        expect(directeurEtudeService.addDirecteurEtudeToCollectionIfMissing).toHaveBeenCalledWith(
          directeurEtudeCollection,
          ...additionalDirecteurEtudes
        );
        expect(comp.directeurEtudesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const serie: ISerie = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 69520 };
        serie.lyceesTechniques = lyceesTechniques;
        const directeur: IDirecteurEtude = { id: 12587 };
        serie.directeur = directeur;

        activatedRoute.data = of({ serie });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(serie));
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.directeurEtudesSharedCollection).toContain(directeur);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Serie>>();
        const serie = { id: 123 };
        jest.spyOn(serieService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ serie });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: serie }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(serieService.update).toHaveBeenCalledWith(serie);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Serie>>();
        const serie = new Serie();
        jest.spyOn(serieService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ serie });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: serie }));
        saveSubject.complete();

        // THEN
        expect(serieService.create).toHaveBeenCalledWith(serie);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Serie>>();
        const serie = { id: 123 };
        jest.spyOn(serieService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ serie });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(serieService.update).toHaveBeenCalledWith(serie);
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
    });
  });
});
