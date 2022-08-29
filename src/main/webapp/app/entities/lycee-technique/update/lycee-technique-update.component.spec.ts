jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { LyceeTechniqueService } from '../service/lycee-technique.service';
import { ILyceeTechnique, LyceeTechnique } from '../lycee-technique.model';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { ProviseurService } from 'app/entities/proviseur/service/proviseur.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';

import { LyceeTechniqueUpdateComponent } from './lycee-technique-update.component';

describe('Component Tests', () => {
  describe('LyceeTechnique Management Update Component', () => {
    let comp: LyceeTechniqueUpdateComponent;
    let fixture: ComponentFixture<LyceeTechniqueUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let lyceeTechniqueService: LyceeTechniqueService;
    let proviseurService: ProviseurService;
    let lyceesTechniquesService: LyceesTechniquesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [LyceeTechniqueUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(LyceeTechniqueUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LyceeTechniqueUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      lyceeTechniqueService = TestBed.inject(LyceeTechniqueService);
      proviseurService = TestBed.inject(ProviseurService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call proviseur query and add missing value', () => {
        const lyceeTechnique: ILyceeTechnique = { id: 456 };
        const proviseur: IProviseur = { id: 90229 };
        lyceeTechnique.proviseur = proviseur;

        const proviseurCollection: IProviseur[] = [{ id: 68231 }];
        jest.spyOn(proviseurService, 'query').mockReturnValue(of(new HttpResponse({ body: proviseurCollection })));
        const expectedCollection: IProviseur[] = [proviseur, ...proviseurCollection];
        jest.spyOn(proviseurService, 'addProviseurToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ lyceeTechnique });
        comp.ngOnInit();

        expect(proviseurService.query).toHaveBeenCalled();
        expect(proviseurService.addProviseurToCollectionIfMissing).toHaveBeenCalledWith(proviseurCollection, proviseur);
        expect(comp.proviseursCollection).toEqual(expectedCollection);
      });

      it('Should call nomLycee query and add missing value', () => {
        const lyceeTechnique: ILyceeTechnique = { id: 456 };
        const nomLycee: ILyceesTechniques = { id: 8408 };
        lyceeTechnique.nomLycee = nomLycee;

        const nomLyceeCollection: ILyceesTechniques[] = [{ id: 11348 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: nomLyceeCollection })));
        const expectedCollection: ILyceesTechniques[] = [nomLycee, ...nomLyceeCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ lyceeTechnique });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(nomLyceeCollection, nomLycee);
        expect(comp.nomLyceesCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const lyceeTechnique: ILyceeTechnique = { id: 456 };
        const proviseur: IProviseur = { id: 58494 };
        lyceeTechnique.proviseur = proviseur;
        const nomLycee: ILyceesTechniques = { id: 22005 };
        lyceeTechnique.nomLycee = nomLycee;

        activatedRoute.data = of({ lyceeTechnique });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(lyceeTechnique));
        expect(comp.proviseursCollection).toContain(proviseur);
        expect(comp.nomLyceesCollection).toContain(nomLycee);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<LyceeTechnique>>();
        const lyceeTechnique = { id: 123 };
        jest.spyOn(lyceeTechniqueService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ lyceeTechnique });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: lyceeTechnique }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(lyceeTechniqueService.update).toHaveBeenCalledWith(lyceeTechnique);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<LyceeTechnique>>();
        const lyceeTechnique = new LyceeTechnique();
        jest.spyOn(lyceeTechniqueService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ lyceeTechnique });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: lyceeTechnique }));
        saveSubject.complete();

        // THEN
        expect(lyceeTechniqueService.create).toHaveBeenCalledWith(lyceeTechnique);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<LyceeTechnique>>();
        const lyceeTechnique = { id: 123 };
        jest.spyOn(lyceeTechniqueService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ lyceeTechnique });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(lyceeTechniqueService.update).toHaveBeenCalledWith(lyceeTechnique);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackProviseurById', () => {
        it('Should return tracked Proviseur primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackProviseurById(0, entity);
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
    });
  });
});
