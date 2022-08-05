jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { FormationService } from '../service/formation.service';
import { IFormation, Formation } from '../formation.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IDirecteurEtude } from 'app/entities/directeur-etude/directeur-etude.model';
import { DirecteurEtudeService } from 'app/entities/directeur-etude/service/directeur-etude.service';

import { FormationUpdateComponent } from './formation-update.component';

describe('Component Tests', () => {
  describe('Formation Management Update Component', () => {
    let comp: FormationUpdateComponent;
    let fixture: ComponentFixture<FormationUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let formationService: FormationService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let directeurEtudeService: DirecteurEtudeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [FormationUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(FormationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormationUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      formationService = TestBed.inject(FormationService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      directeurEtudeService = TestBed.inject(DirecteurEtudeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceesTechniques query and add missing value', () => {
        const formation: IFormation = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 95478 };
        formation.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 35409 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ formation });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call DirecteurEtude query and add missing value', () => {
        const formation: IFormation = { id: 456 };
        const directeur: IDirecteurEtude = { id: 61064 };
        formation.directeur = directeur;

        const directeurEtudeCollection: IDirecteurEtude[] = [{ id: 91199 }];
        jest.spyOn(directeurEtudeService, 'query').mockReturnValue(of(new HttpResponse({ body: directeurEtudeCollection })));
        const additionalDirecteurEtudes = [directeur];
        const expectedCollection: IDirecteurEtude[] = [...additionalDirecteurEtudes, ...directeurEtudeCollection];
        jest.spyOn(directeurEtudeService, 'addDirecteurEtudeToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ formation });
        comp.ngOnInit();

        expect(directeurEtudeService.query).toHaveBeenCalled();
        expect(directeurEtudeService.addDirecteurEtudeToCollectionIfMissing).toHaveBeenCalledWith(
          directeurEtudeCollection,
          ...additionalDirecteurEtudes
        );
        expect(comp.directeurEtudesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const formation: IFormation = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 3864 };
        formation.lyceesTechniques = lyceesTechniques;
        const directeur: IDirecteurEtude = { id: 54532 };
        formation.directeur = directeur;

        activatedRoute.data = of({ formation });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(formation));
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.directeurEtudesSharedCollection).toContain(directeur);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Formation>>();
        const formation = { id: 123 };
        jest.spyOn(formationService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ formation });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: formation }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(formationService.update).toHaveBeenCalledWith(formation);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Formation>>();
        const formation = new Formation();
        jest.spyOn(formationService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ formation });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: formation }));
        saveSubject.complete();

        // THEN
        expect(formationService.create).toHaveBeenCalledWith(formation);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Formation>>();
        const formation = { id: 123 };
        jest.spyOn(formationService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ formation });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(formationService.update).toHaveBeenCalledWith(formation);
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
