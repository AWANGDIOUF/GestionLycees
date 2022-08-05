jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { OrganeService } from '../service/organe.service';
import { IOrgane, Organe } from '../organe.model';
import { ILyceeTechnique } from 'app/entities/lycee-technique/lycee-technique.model';
import { LyceeTechniqueService } from 'app/entities/lycee-technique/service/lycee-technique.service';

import { OrganeUpdateComponent } from './organe-update.component';

describe('Component Tests', () => {
  describe('Organe Management Update Component', () => {
    let comp: OrganeUpdateComponent;
    let fixture: ComponentFixture<OrganeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let organeService: OrganeService;
    let lyceeTechniqueService: LyceeTechniqueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [OrganeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(OrganeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrganeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      organeService = TestBed.inject(OrganeService);
      lyceeTechniqueService = TestBed.inject(LyceeTechniqueService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceeTechnique query and add missing value', () => {
        const organe: IOrgane = { id: 456 };
        const lyceeTechnique: ILyceeTechnique = { id: 54661 };
        organe.lyceeTechnique = lyceeTechnique;

        const lyceeTechniqueCollection: ILyceeTechnique[] = [{ id: 69838 }];
        jest.spyOn(lyceeTechniqueService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceeTechniqueCollection })));
        const additionalLyceeTechniques = [lyceeTechnique];
        const expectedCollection: ILyceeTechnique[] = [...additionalLyceeTechniques, ...lyceeTechniqueCollection];
        jest.spyOn(lyceeTechniqueService, 'addLyceeTechniqueToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ organe });
        comp.ngOnInit();

        expect(lyceeTechniqueService.query).toHaveBeenCalled();
        expect(lyceeTechniqueService.addLyceeTechniqueToCollectionIfMissing).toHaveBeenCalledWith(
          lyceeTechniqueCollection,
          ...additionalLyceeTechniques
        );
        expect(comp.lyceeTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const organe: IOrgane = { id: 456 };
        const lyceeTechnique: ILyceeTechnique = { id: 54842 };
        organe.lyceeTechnique = lyceeTechnique;

        activatedRoute.data = of({ organe });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(organe));
        expect(comp.lyceeTechniquesSharedCollection).toContain(lyceeTechnique);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Organe>>();
        const organe = { id: 123 };
        jest.spyOn(organeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ organe });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: organe }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(organeService.update).toHaveBeenCalledWith(organe);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Organe>>();
        const organe = new Organe();
        jest.spyOn(organeService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ organe });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: organe }));
        saveSubject.complete();

        // THEN
        expect(organeService.create).toHaveBeenCalledWith(organe);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Organe>>();
        const organe = { id: 123 };
        jest.spyOn(organeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ organe });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(organeService.update).toHaveBeenCalledWith(organe);
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
