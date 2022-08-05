jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { StatusService } from '../service/status.service';
import { IStatus, Status } from '../status.model';
import { IApprenant } from 'app/entities/apprenant/apprenant.model';
import { ApprenantService } from 'app/entities/apprenant/service/apprenant.service';
import { ILyceeTechnique } from 'app/entities/lycee-technique/lycee-technique.model';
import { LyceeTechniqueService } from 'app/entities/lycee-technique/service/lycee-technique.service';

import { StatusUpdateComponent } from './status-update.component';

describe('Component Tests', () => {
  describe('Status Management Update Component', () => {
    let comp: StatusUpdateComponent;
    let fixture: ComponentFixture<StatusUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let statusService: StatusService;
    let apprenantService: ApprenantService;
    let lyceeTechniqueService: LyceeTechniqueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [StatusUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(StatusUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StatusUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      statusService = TestBed.inject(StatusService);
      apprenantService = TestBed.inject(ApprenantService);
      lyceeTechniqueService = TestBed.inject(LyceeTechniqueService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call apprenant query and add missing value', () => {
        const status: IStatus = { id: 456 };
        const apprenant: IApprenant = { id: 80176 };
        status.apprenant = apprenant;

        const apprenantCollection: IApprenant[] = [{ id: 55468 }];
        jest.spyOn(apprenantService, 'query').mockReturnValue(of(new HttpResponse({ body: apprenantCollection })));
        const expectedCollection: IApprenant[] = [apprenant, ...apprenantCollection];
        jest.spyOn(apprenantService, 'addApprenantToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ status });
        comp.ngOnInit();

        expect(apprenantService.query).toHaveBeenCalled();
        expect(apprenantService.addApprenantToCollectionIfMissing).toHaveBeenCalledWith(apprenantCollection, apprenant);
        expect(comp.apprenantsCollection).toEqual(expectedCollection);
      });

      it('Should call LyceeTechnique query and add missing value', () => {
        const status: IStatus = { id: 456 };
        const lyceeTechnique: ILyceeTechnique = { id: 45015 };
        status.lyceeTechnique = lyceeTechnique;

        const lyceeTechniqueCollection: ILyceeTechnique[] = [{ id: 70141 }];
        jest.spyOn(lyceeTechniqueService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceeTechniqueCollection })));
        const additionalLyceeTechniques = [lyceeTechnique];
        const expectedCollection: ILyceeTechnique[] = [...additionalLyceeTechniques, ...lyceeTechniqueCollection];
        jest.spyOn(lyceeTechniqueService, 'addLyceeTechniqueToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ status });
        comp.ngOnInit();

        expect(lyceeTechniqueService.query).toHaveBeenCalled();
        expect(lyceeTechniqueService.addLyceeTechniqueToCollectionIfMissing).toHaveBeenCalledWith(
          lyceeTechniqueCollection,
          ...additionalLyceeTechniques
        );
        expect(comp.lyceeTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const status: IStatus = { id: 456 };
        const apprenant: IApprenant = { id: 87828 };
        status.apprenant = apprenant;
        const lyceeTechnique: ILyceeTechnique = { id: 74716 };
        status.lyceeTechnique = lyceeTechnique;

        activatedRoute.data = of({ status });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(status));
        expect(comp.apprenantsCollection).toContain(apprenant);
        expect(comp.lyceeTechniquesSharedCollection).toContain(lyceeTechnique);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Status>>();
        const status = { id: 123 };
        jest.spyOn(statusService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ status });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: status }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(statusService.update).toHaveBeenCalledWith(status);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Status>>();
        const status = new Status();
        jest.spyOn(statusService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ status });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: status }));
        saveSubject.complete();

        // THEN
        expect(statusService.create).toHaveBeenCalledWith(status);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Status>>();
        const status = { id: 123 };
        jest.spyOn(statusService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ status });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(statusService.update).toHaveBeenCalledWith(status);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackApprenantById', () => {
        it('Should return tracked Apprenant primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackApprenantById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

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
