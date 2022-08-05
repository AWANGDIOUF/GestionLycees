jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { OrganeGestionService } from '../service/organe-gestion.service';
import { IOrganeGestion, OrganeGestion } from '../organe-gestion.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { ProviseurService } from 'app/entities/proviseur/service/proviseur.service';

import { OrganeGestionUpdateComponent } from './organe-gestion-update.component';

describe('Component Tests', () => {
  describe('OrganeGestion Management Update Component', () => {
    let comp: OrganeGestionUpdateComponent;
    let fixture: ComponentFixture<OrganeGestionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let organeGestionService: OrganeGestionService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let proviseurService: ProviseurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [OrganeGestionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(OrganeGestionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrganeGestionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      organeGestionService = TestBed.inject(OrganeGestionService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      proviseurService = TestBed.inject(ProviseurService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceesTechniques query and add missing value', () => {
        const organeGestion: IOrganeGestion = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 47719 };
        organeGestion.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 35099 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ organeGestion });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Proviseur query and add missing value', () => {
        const organeGestion: IOrganeGestion = { id: 456 };
        const proviseur: IProviseur = { id: 88049 };
        organeGestion.proviseur = proviseur;

        const proviseurCollection: IProviseur[] = [{ id: 1580 }];
        jest.spyOn(proviseurService, 'query').mockReturnValue(of(new HttpResponse({ body: proviseurCollection })));
        const additionalProviseurs = [proviseur];
        const expectedCollection: IProviseur[] = [...additionalProviseurs, ...proviseurCollection];
        jest.spyOn(proviseurService, 'addProviseurToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ organeGestion });
        comp.ngOnInit();

        expect(proviseurService.query).toHaveBeenCalled();
        expect(proviseurService.addProviseurToCollectionIfMissing).toHaveBeenCalledWith(proviseurCollection, ...additionalProviseurs);
        expect(comp.proviseursSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const organeGestion: IOrganeGestion = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 58924 };
        organeGestion.lyceesTechniques = lyceesTechniques;
        const proviseur: IProviseur = { id: 82061 };
        organeGestion.proviseur = proviseur;

        activatedRoute.data = of({ organeGestion });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(organeGestion));
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.proviseursSharedCollection).toContain(proviseur);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<OrganeGestion>>();
        const organeGestion = { id: 123 };
        jest.spyOn(organeGestionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ organeGestion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: organeGestion }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(organeGestionService.update).toHaveBeenCalledWith(organeGestion);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<OrganeGestion>>();
        const organeGestion = new OrganeGestion();
        jest.spyOn(organeGestionService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ organeGestion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: organeGestion }));
        saveSubject.complete();

        // THEN
        expect(organeGestionService.create).toHaveBeenCalledWith(organeGestion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<OrganeGestion>>();
        const organeGestion = { id: 123 };
        jest.spyOn(organeGestionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ organeGestion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(organeGestionService.update).toHaveBeenCalledWith(organeGestion);
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
