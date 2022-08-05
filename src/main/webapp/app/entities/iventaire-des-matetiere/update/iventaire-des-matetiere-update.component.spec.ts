jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { IventaireDesMatetiereService } from '../service/iventaire-des-matetiere.service';
import { IIventaireDesMatetiere, IventaireDesMatetiere } from '../iventaire-des-matetiere.model';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { ComptableMatiereService } from 'app/entities/comptable-matiere/service/comptable-matiere.service';

import { IventaireDesMatetiereUpdateComponent } from './iventaire-des-matetiere-update.component';

describe('Component Tests', () => {
  describe('IventaireDesMatetiere Management Update Component', () => {
    let comp: IventaireDesMatetiereUpdateComponent;
    let fixture: ComponentFixture<IventaireDesMatetiereUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let iventaireDesMatetiereService: IventaireDesMatetiereService;
    let lyceesTechniquesService: LyceesTechniquesService;
    let comptableMatiereService: ComptableMatiereService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [IventaireDesMatetiereUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(IventaireDesMatetiereUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IventaireDesMatetiereUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      iventaireDesMatetiereService = TestBed.inject(IventaireDesMatetiereService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);
      comptableMatiereService = TestBed.inject(ComptableMatiereService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call LyceesTechniques query and add missing value', () => {
        const iventaireDesMatetiere: IIventaireDesMatetiere = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 93828 };
        iventaireDesMatetiere.lyceesTechniques = lyceesTechniques;

        const lyceesTechniquesCollection: ILyceesTechniques[] = [{ id: 74306 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: lyceesTechniquesCollection })));
        const additionalLyceesTechniques = [lyceesTechniques];
        const expectedCollection: ILyceesTechniques[] = [...additionalLyceesTechniques, ...lyceesTechniquesCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ iventaireDesMatetiere });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(
          lyceesTechniquesCollection,
          ...additionalLyceesTechniques
        );
        expect(comp.lyceesTechniquesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call ComptableMatiere query and add missing value', () => {
        const iventaireDesMatetiere: IIventaireDesMatetiere = { id: 456 };
        const comptableMatiere: IComptableMatiere = { id: 27653 };
        iventaireDesMatetiere.comptableMatiere = comptableMatiere;

        const comptableMatiereCollection: IComptableMatiere[] = [{ id: 84706 }];
        jest.spyOn(comptableMatiereService, 'query').mockReturnValue(of(new HttpResponse({ body: comptableMatiereCollection })));
        const additionalComptableMatieres = [comptableMatiere];
        const expectedCollection: IComptableMatiere[] = [...additionalComptableMatieres, ...comptableMatiereCollection];
        jest.spyOn(comptableMatiereService, 'addComptableMatiereToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ iventaireDesMatetiere });
        comp.ngOnInit();

        expect(comptableMatiereService.query).toHaveBeenCalled();
        expect(comptableMatiereService.addComptableMatiereToCollectionIfMissing).toHaveBeenCalledWith(
          comptableMatiereCollection,
          ...additionalComptableMatieres
        );
        expect(comp.comptableMatieresSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const iventaireDesMatetiere: IIventaireDesMatetiere = { id: 456 };
        const lyceesTechniques: ILyceesTechniques = { id: 71014 };
        iventaireDesMatetiere.lyceesTechniques = lyceesTechniques;
        const comptableMatiere: IComptableMatiere = { id: 7719 };
        iventaireDesMatetiere.comptableMatiere = comptableMatiere;

        activatedRoute.data = of({ iventaireDesMatetiere });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(iventaireDesMatetiere));
        expect(comp.lyceesTechniquesSharedCollection).toContain(lyceesTechniques);
        expect(comp.comptableMatieresSharedCollection).toContain(comptableMatiere);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<IventaireDesMatetiere>>();
        const iventaireDesMatetiere = { id: 123 };
        jest.spyOn(iventaireDesMatetiereService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ iventaireDesMatetiere });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: iventaireDesMatetiere }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(iventaireDesMatetiereService.update).toHaveBeenCalledWith(iventaireDesMatetiere);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<IventaireDesMatetiere>>();
        const iventaireDesMatetiere = new IventaireDesMatetiere();
        jest.spyOn(iventaireDesMatetiereService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ iventaireDesMatetiere });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: iventaireDesMatetiere }));
        saveSubject.complete();

        // THEN
        expect(iventaireDesMatetiereService.create).toHaveBeenCalledWith(iventaireDesMatetiere);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<IventaireDesMatetiere>>();
        const iventaireDesMatetiere = { id: 123 };
        jest.spyOn(iventaireDesMatetiereService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ iventaireDesMatetiere });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(iventaireDesMatetiereService.update).toHaveBeenCalledWith(iventaireDesMatetiere);
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

      describe('trackComptableMatiereById', () => {
        it('Should return tracked ComptableMatiere primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackComptableMatiereById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
