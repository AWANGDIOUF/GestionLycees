jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { BesoinService } from '../service/besoin.service';
import { IBesoin, Besoin } from '../besoin.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { ProviseurService } from 'app/entities/proviseur/service/proviseur.service';

import { BesoinUpdateComponent } from './besoin-update.component';

describe('Component Tests', () => {
  describe('Besoin Management Update Component', () => {
    let comp: BesoinUpdateComponent;
    let fixture: ComponentFixture<BesoinUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let besoinService: BesoinService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let proviseurService: ProviseurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [BesoinUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(BesoinUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BesoinUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      besoinService = TestBed.inject(BesoinService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      proviseurService = TestBed.inject(ProviseurService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceesTechniques query and add missing value', () => {
        const besoin: IBesoin = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 77597 };
        besoin.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 80648 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ besoin });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Proviseur query and add missing value', () => {
        const besoin: IBesoin = { id: 456 };
        const proviseur: IProviseur = { id: 66371 };
        besoin.proviseur = proviseur;

        const proviseurCollection: IProviseur[] = [{ id: 72456 }];
        jest.spyOn(proviseurService, 'query').mockReturnValue(of(new HttpResponse({ body: proviseurCollection })));
        const additionalProviseurs = [proviseur];
        const expectedCollection: IProviseur[] = [...additionalProviseurs, ...proviseurCollection];
        jest.spyOn(proviseurService, 'addProviseurToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ besoin });
        comp.ngOnInit();

        expect(proviseurService.query).toHaveBeenCalled();
        expect(proviseurService.addProviseurToCollectionIfMissing).toHaveBeenCalledWith(proviseurCollection, ...additionalProviseurs);
        expect(comp.proviseursSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const besoin: IBesoin = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 62429 };
        besoin.lyceesTechniques = lyceesTechniques;
        const proviseur: IProviseur = { id: 59508 };
        besoin.proviseur = proviseur;

        activatedRoute.data = of({ besoin });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(besoin));
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.proviseursSharedCollection).toContain(proviseur);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Besoin>>();
        const besoin = { id: 123 };
        jest.spyOn(besoinService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ besoin });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: besoin }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(besoinService.update).toHaveBeenCalledWith(besoin);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Besoin>>();
        const besoin = new Besoin();
        jest.spyOn(besoinService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ besoin });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: besoin }));
        saveSubject.complete();

        // THEN
        expect(besoinService.create).toHaveBeenCalledWith(besoin);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Besoin>>();
        const besoin = { id: 123 };
        jest.spyOn(besoinService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ besoin });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(besoinService.update).toHaveBeenCalledWith(besoin);
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
