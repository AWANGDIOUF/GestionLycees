jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ComptableMatiereService } from '../service/comptable-matiere.service';
import { IComptableMatiere, ComptableMatiere } from '../comptable-matiere.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';

import { ComptableMatiereUpdateComponent } from './comptable-matiere-update.component';

describe('Component Tests', () => {
  describe('ComptableMatiere Management Update Component', () => {
    let comp: ComptableMatiereUpdateComponent;
    let fixture: ComponentFixture<ComptableMatiereUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let comptableMatiereService: ComptableMatiereService;
    let userService: UserService;
    let lyceesTechniquesService: LyceesTechniquesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ComptableMatiereUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ComptableMatiereUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ComptableMatiereUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      comptableMatiereService = TestBed.inject(ComptableMatiereService);
      userService = TestBed.inject(UserService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call User query and add missing value', () => {
        const comptableMatiere: IComptableMatiere = { id: 456 };
        const user: IUser = { id: 97608 };
        comptableMatiere.user = user;

        const userCollection: IUser[] = [{ id: 49442 }];
        jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
        const additionalUsers = [user];
        const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
        jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ comptableMatiere });
        comp.ngOnInit();

        expect(userService.query).toHaveBeenCalled();
        expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
        expect(comp.usersSharedCollection).toEqual(expectedCollection);
      });

      it('Should call nomLycee query and add missing value', () => {
        const comptableMatiere: IComptableMatiere = { id: 456 };
        const nomLycee: ILyceesTechniques = { id: 78682 };
        comptableMatiere.nomLycee = nomLycee;

        const nomLyceeCollection: ILyceesTechniques[] = [{ id: 82668 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: nomLyceeCollection })));
        const expectedCollection: ILyceesTechniques[] = [nomLycee, ...nomLyceeCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ comptableMatiere });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(nomLyceeCollection, nomLycee);
        expect(comp.nomLyceesCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const comptableMatiere: IComptableMatiere = { id: 456 };
        const user: IUser = { id: 82137 };
        comptableMatiere.user = user;
        const nomLycee: ILyceesTechniques = { id: 20497 };
        comptableMatiere.nomLycee = nomLycee;

        activatedRoute.data = of({ comptableMatiere });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(comptableMatiere));
        expect(comp.usersSharedCollection).toContain(user);
        expect(comp.nomLyceesCollection).toContain(nomLycee);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ComptableMatiere>>();
        const comptableMatiere = { id: 123 };
        jest.spyOn(comptableMatiereService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ comptableMatiere });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: comptableMatiere }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(comptableMatiereService.update).toHaveBeenCalledWith(comptableMatiere);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ComptableMatiere>>();
        const comptableMatiere = new ComptableMatiere();
        jest.spyOn(comptableMatiereService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ comptableMatiere });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: comptableMatiere }));
        saveSubject.complete();

        // THEN
        expect(comptableMatiereService.create).toHaveBeenCalledWith(comptableMatiere);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ComptableMatiere>>();
        const comptableMatiere = { id: 123 };
        jest.spyOn(comptableMatiereService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ comptableMatiere });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(comptableMatiereService.update).toHaveBeenCalledWith(comptableMatiere);
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
