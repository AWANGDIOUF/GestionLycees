jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ComptableFinancierService } from '../service/comptable-financier.service';
import { IComptableFinancier, ComptableFinancier } from '../comptable-financier.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';

import { ComptableFinancierUpdateComponent } from './comptable-financier-update.component';

describe('Component Tests', () => {
  describe('ComptableFinancier Management Update Component', () => {
    let comp: ComptableFinancierUpdateComponent;
    let fixture: ComponentFixture<ComptableFinancierUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let comptableFinancierService: ComptableFinancierService;
    let userService: UserService;
    let lyceesTechniquesService: LyceesTechniquesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ComptableFinancierUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ComptableFinancierUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ComptableFinancierUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      comptableFinancierService = TestBed.inject(ComptableFinancierService);
      userService = TestBed.inject(UserService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call User query and add missing value', () => {
        const comptableFinancier: IComptableFinancier = { id: 456 };
        const user: IUser = { id: 26378 };
        comptableFinancier.user = user;

        const userCollection: IUser[] = [{ id: 13336 }];
        jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
        const additionalUsers = [user];
        const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
        jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ comptableFinancier });
        comp.ngOnInit();

        expect(userService.query).toHaveBeenCalled();
        expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
        expect(comp.usersSharedCollection).toEqual(expectedCollection);
      });

      it('Should call nomLycee query and add missing value', () => {
        const comptableFinancier: IComptableFinancier = { id: 456 };
        const nomLycee: ILyceesTechniques = { id: 82175 };
        comptableFinancier.nomLycee = nomLycee;

        const nomLyceeCollection: ILyceesTechniques[] = [{ id: 68266 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: nomLyceeCollection })));
        const expectedCollection: ILyceesTechniques[] = [nomLycee, ...nomLyceeCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ comptableFinancier });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(nomLyceeCollection, nomLycee);
        expect(comp.nomLyceesCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const comptableFinancier: IComptableFinancier = { id: 456 };
        const user: IUser = { id: 73365 };
        comptableFinancier.user = user;
        const nomLycee: ILyceesTechniques = { id: 65144 };
        comptableFinancier.nomLycee = nomLycee;

        activatedRoute.data = of({ comptableFinancier });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(comptableFinancier));
        expect(comp.usersSharedCollection).toContain(user);
        expect(comp.nomLyceesCollection).toContain(nomLycee);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ComptableFinancier>>();
        const comptableFinancier = { id: 123 };
        jest.spyOn(comptableFinancierService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ comptableFinancier });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: comptableFinancier }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(comptableFinancierService.update).toHaveBeenCalledWith(comptableFinancier);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ComptableFinancier>>();
        const comptableFinancier = new ComptableFinancier();
        jest.spyOn(comptableFinancierService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ comptableFinancier });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: comptableFinancier }));
        saveSubject.complete();

        // THEN
        expect(comptableFinancierService.create).toHaveBeenCalledWith(comptableFinancier);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ComptableFinancier>>();
        const comptableFinancier = { id: 123 };
        jest.spyOn(comptableFinancierService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ comptableFinancier });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(comptableFinancierService.update).toHaveBeenCalledWith(comptableFinancier);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackUserById', () => {
        it('Should return tracked User primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackUserById(0, entity);
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
