jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { BonService } from '../service/bon.service';
import { IBon, Bon } from '../bon.model';
import { IMateriel } from 'app/entities/materiel/materiel.model';
import { MaterielService } from 'app/entities/materiel/service/materiel.service';

import { BonUpdateComponent } from './bon-update.component';

describe('Component Tests', () => {
  describe('Bon Management Update Component', () => {
    let comp: BonUpdateComponent;
    let fixture: ComponentFixture<BonUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let bonService: BonService;
    let materielService: MaterielService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [BonUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(BonUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BonUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      bonService = TestBed.inject(BonService);
      materielService = TestBed.inject(MaterielService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Materiel query and add missing value', () => {
        const bon: IBon = { id: 456 };
        const materiel: IMateriel = { id: 52470 };
        bon.materiel = materiel;

        const materielCollection: IMateriel[] = [{ id: 68992 }];
        jest.spyOn(materielService, 'query').mockReturnValue(of(new HttpResponse({ body: materielCollection })));
        const additionalMateriels = [materiel];
        const expectedCollection: IMateriel[] = [...additionalMateriels, ...materielCollection];
        jest.spyOn(materielService, 'addMaterielToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ bon });
        comp.ngOnInit();

        expect(materielService.query).toHaveBeenCalled();
        expect(materielService.addMaterielToCollectionIfMissing).toHaveBeenCalledWith(materielCollection, ...additionalMateriels);
        expect(comp.materielsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const bon: IBon = { id: 456 };
        const materiel: IMateriel = { id: 673 };
        bon.materiel = materiel;

        activatedRoute.data = of({ bon });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(bon));
        expect(comp.materielsSharedCollection).toContain(materiel);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Bon>>();
        const bon = { id: 123 };
        jest.spyOn(bonService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ bon });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: bon }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(bonService.update).toHaveBeenCalledWith(bon);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Bon>>();
        const bon = new Bon();
        jest.spyOn(bonService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ bon });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: bon }));
        saveSubject.complete();

        // THEN
        expect(bonService.create).toHaveBeenCalledWith(bon);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Bon>>();
        const bon = { id: 123 };
        jest.spyOn(bonService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ bon });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(bonService.update).toHaveBeenCalledWith(bon);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackMaterielById', () => {
        it('Should return tracked Materiel primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMaterielById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
