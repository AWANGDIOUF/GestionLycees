jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ProviseurService } from '../service/proviseur.service';
import { IProviseur, Proviseur } from '../proviseur.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';

import { ProviseurUpdateComponent } from './proviseur-update.component';

describe('Component Tests', () => {
  describe('Proviseur Management Update Component', () => {
    let comp: ProviseurUpdateComponent;
    let fixture: ComponentFixture<ProviseurUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let proviseurService: ProviseurService;
    let userService: UserService;
    let lyceesTechniquesService: LyceesTechniquesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProviseurUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ProviseurUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProviseurUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      proviseurService = TestBed.inject(ProviseurService);
      userService = TestBed.inject(UserService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call User query and add missing value', () => {
        const proviseur: IProviseur = { id: 456 };
        const user: IUser = { id: 95225 };
        proviseur.user = user;

        const userCollection: IUser[] = [{ id: 15382 }];
        jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
        const additionalUsers = [user];
        const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
        jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ proviseur });
        comp.ngOnInit();

        expect(userService.query).toHaveBeenCalled();
        expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
        expect(comp.usersSharedCollection).toEqual(expectedCollection);
      });

      it('Should call nomLycee query and add missing value', () => {
        const proviseur: IProviseur = { id: 456 };
        const nomLycee: ILyceesTechniques = { id: 24389 };
        proviseur.nomLycee = nomLycee;

        const nomLyceeCollection: ILyceesTechniques[] = [{ id: 7665 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: nomLyceeCollection })));
        const expectedCollection: ILyceesTechniques[] = [nomLycee, ...nomLyceeCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ proviseur });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(nomLyceeCollection, nomLycee);
        expect(comp.nomLyceesCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const proviseur: IProviseur = { id: 456 };
        const user: IUser = { id: 41410 };
        proviseur.user = user;
        const nomLycee: ILyceesTechniques = { id: 28704 };
        proviseur.nomLycee = nomLycee;

        activatedRoute.data = of({ proviseur });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(proviseur));
        expect(comp.usersSharedCollection).toContain(user);
        expect(comp.nomLyceesCollection).toContain(nomLycee);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Proviseur>>();
        const proviseur = { id: 123 };
        jest.spyOn(proviseurService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ proviseur });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: proviseur }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(proviseurService.update).toHaveBeenCalledWith(proviseur);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Proviseur>>();
        const proviseur = new Proviseur();
        jest.spyOn(proviseurService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ proviseur });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: proviseur }));
        saveSubject.complete();

        // THEN
        expect(proviseurService.create).toHaveBeenCalledWith(proviseur);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Proviseur>>();
        const proviseur = { id: 123 };
        jest.spyOn(proviseurService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ proviseur });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(proviseurService.update).toHaveBeenCalledWith(proviseur);
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
