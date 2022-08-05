jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ProblemeService } from '../service/probleme.service';
import { IProbleme, Probleme } from '../probleme.model';
import { ILyceeTechnique } from 'app/entities/lycee-technique/lycee-technique.model';
import { LyceeTechniqueService } from 'app/entities/lycee-technique/service/lycee-technique.service';

import { ProblemeUpdateComponent } from './probleme-update.component';

describe('Component Tests', () => {
  describe('Probleme Management Update Component', () => {
    let comp: ProblemeUpdateComponent;
    let fixture: ComponentFixture<ProblemeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let problemeService: ProblemeService;
    let lyceeTechniqueService: LyceeTechniqueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProblemeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ProblemeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProblemeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      problemeService = TestBed.inject(ProblemeService);
      lyceeTechniqueService = TestBed.inject(LyceeTechniqueService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceeTechnique query and add missing value', () => {
        const probleme: IProbleme = { id: 456 };
        const lyceeTechnique: ILyceeTechnique = { id: 43737 };
        probleme.lyceeTechnique = lyceeTechnique;

        const lyceeTechniqueCollection: ILyceeTechnique[] = [{ id: 246 }];
        jest.spyOn(lyceeTechniqueService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceeTechniqueCollection })));
        const additionalLyceeTechniques = [lyceeTechnique];
        const expectedCollection: ILyceeTechnique[] = [...additionalLyceeTechniques, ...lyceeTechniqueCollection];
        jest.spyOn(lyceeTechniqueService, 'addLyceeTechniqueToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ probleme });
        comp.ngOnInit();

        expect(lyceeTechniqueService.query).toHaveBeenCalled();
        expect(lyceeTechniqueService.addLyceeTechniqueToCollectionIfMissing).toHaveBeenCalledWith(
          lyceeTechniqueCollection,
          ...additionalLyceeTechniques
        );
        expect(comp.lyceeTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const probleme: IProbleme = { id: 456 };
        const lyceeTechnique: ILyceeTechnique = { id: 64286 };
        probleme.lyceeTechnique = lyceeTechnique;

        activatedRoute.data = of({ probleme });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(probleme));
        expect(comp.lyceeTechniquesSharedCollection).toContain(lyceeTechnique);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Probleme>>();
        const probleme = { id: 123 };
        jest.spyOn(problemeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ probleme });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: probleme }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(problemeService.update).toHaveBeenCalledWith(probleme);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Probleme>>();
        const probleme = new Probleme();
        jest.spyOn(problemeService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ probleme });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: probleme }));
        saveSubject.complete();

        // THEN
        expect(problemeService.create).toHaveBeenCalledWith(probleme);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Probleme>>();
        const probleme = { id: 123 };
        jest.spyOn(problemeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ probleme });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(problemeService.update).toHaveBeenCalledWith(probleme);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackLyceeTechniqueById', () => {
        it('Should return tracked LyceeTechnique primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackLyceeTechniqueById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
