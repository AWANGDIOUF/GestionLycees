jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PartenaireService } from '../service/partenaire.service';
import { IPartenaire, Partenaire } from '../partenaire.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IProviseur } from 'app/entities/proviseur/proviseur.model';
import { ProviseurService } from 'app/entities/proviseur/service/proviseur.service';

import { PartenaireUpdateComponent } from './partenaire-update.component';

describe('Component Tests', () => {
  describe('Partenaire Management Update Component', () => {
    let comp: PartenaireUpdateComponent;
    let fixture: ComponentFixture<PartenaireUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let partenaireService: PartenaireService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let proviseurService: ProviseurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PartenaireUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PartenaireUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PartenaireUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      partenaireService = TestBed.inject(PartenaireService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      proviseurService = TestBed.inject(ProviseurService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceesTechniques query and add missing value', () => {
        const partenaire: IPartenaire = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 36732 };
        partenaire.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 67705 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ partenaire });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Proviseur query and add missing value', () => {
        const partenaire: IPartenaire = { id: 456 };
        const proviseur: IProviseur = { id: 96541 };
        partenaire.proviseur = proviseur;

        const proviseurCollection: IProviseur[] = [{ id: 55112 }];
        jest.spyOn(proviseurService, 'query').mockReturnValue(of(new HttpResponse({ body: proviseurCollection })));
        const additionalProviseurs = [proviseur];
        const expectedCollection: IProviseur[] = [...additionalProviseurs, ...proviseurCollection];
        jest.spyOn(proviseurService, 'addProviseurToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ partenaire });
        comp.ngOnInit();

        expect(proviseurService.query).toHaveBeenCalled();
        expect(proviseurService.addProviseurToCollectionIfMissing).toHaveBeenCalledWith(proviseurCollection, ...additionalProviseurs);
        expect(comp.proviseursSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const partenaire: IPartenaire = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 91996 };
        partenaire.lyceesTechniques = lyceesTechniques;
        const proviseur: IProviseur = { id: 67643 };
        partenaire.proviseur = proviseur;

        activatedRoute.data = of({ partenaire });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(partenaire));
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.proviseursSharedCollection).toContain(proviseur);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Partenaire>>();
        const partenaire = { id: 123 };
        jest.spyOn(partenaireService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ partenaire });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: partenaire }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(partenaireService.update).toHaveBeenCalledWith(partenaire);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Partenaire>>();
        const partenaire = new Partenaire();
        jest.spyOn(partenaireService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ partenaire });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: partenaire }));
        saveSubject.complete();

        // THEN
        expect(partenaireService.create).toHaveBeenCalledWith(partenaire);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Partenaire>>();
        const partenaire = { id: 123 };
        jest.spyOn(partenaireService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ partenaire });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(partenaireService.update).toHaveBeenCalledWith(partenaire);
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
