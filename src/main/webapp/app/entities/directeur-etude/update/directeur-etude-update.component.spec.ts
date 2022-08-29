jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DirecteurEtudeService } from '../service/directeur-etude.service';
import { IDirecteurEtude, DirecteurEtude } from '../directeur-etude.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { ILyceesTechniques } from 'app/entities/lycees-techniques/lycees-techniques.model';
import { LyceesTechniquesService } from 'app/entities/lycees-techniques/service/lycees-techniques.service';

import { DirecteurEtudeUpdateComponent } from './directeur-etude-update.component';

describe('Component Tests', () => {
  describe('DirecteurEtude Management Update Component', () => {
    let comp: DirecteurEtudeUpdateComponent;
    let fixture: ComponentFixture<DirecteurEtudeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let directeurEtudeService: DirecteurEtudeService;
    let userService: UserService;
    let lyceesTechniquesService: LyceesTechniquesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DirecteurEtudeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DirecteurEtudeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DirecteurEtudeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      directeurEtudeService = TestBed.inject(DirecteurEtudeService);
      userService = TestBed.inject(UserService);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call User query and add missing value', () => {
        const directeurEtude: IDirecteurEtude = { id: 456 };
        const user: IUser = { id: 21991 };
        directeurEtude.user = user;

        const userCollection: IUser[] = [{ id: 37457 }];
        jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
        const additionalUsers = [user];
        const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
        jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ directeurEtude });
        comp.ngOnInit();

        expect(userService.query).toHaveBeenCalled();
        expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
        expect(comp.usersSharedCollection).toEqual(expectedCollection);
      });

      it('Should call nomLycee query and add missing value', () => {
        const directeurEtude: IDirecteurEtude = { id: 456 };
        const nomLycee: ILyceesTechniques = { id: 86914 };
        directeurEtude.nomLycee = nomLycee;

        const nomLyceeCollection: ILyceesTechniques[] = [{ id: 3420 }];
        jest.spyOn(lyceesTechniquesService, 'query').mockReturnValue(of(new HttpResponse({ body: nomLyceeCollection })));
        const expectedCollection: ILyceesTechniques[] = [nomLycee, ...nomLyceeCollection];
        jest.spyOn(lyceesTechniquesService, 'addLyceesTechniquesToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ directeurEtude });
        comp.ngOnInit();

        expect(lyceesTechniquesService.query).toHaveBeenCalled();
        expect(lyceesTechniquesService.addLyceesTechniquesToCollectionIfMissing).toHaveBeenCalledWith(nomLyceeCollection, nomLycee);
        expect(comp.nomLyceesCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const directeurEtude: IDirecteurEtude = { id: 456 };
        const user: IUser = { id: 52862 };
        directeurEtude.user = user;
        const nomLycee: ILyceesTechniques = { id: 82285 };
        directeurEtude.nomLycee = nomLycee;

        activatedRoute.data = of({ directeurEtude });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(directeurEtude));
        expect(comp.usersSharedCollection).toContain(user);
        expect(comp.nomLyceesCollection).toContain(nomLycee);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DirecteurEtude>>();
        const directeurEtude = { id: 123 };
        jest.spyOn(directeurEtudeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ directeurEtude });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: directeurEtude }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(directeurEtudeService.update).toHaveBeenCalledWith(directeurEtude);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DirecteurEtude>>();
        const directeurEtude = new DirecteurEtude();
        jest.spyOn(directeurEtudeService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ directeurEtude });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: directeurEtude }));
        saveSubject.complete();

        // THEN
        expect(directeurEtudeService.create).toHaveBeenCalledWith(directeurEtude);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DirecteurEtude>>();
        const directeurEtude = { id: 123 };
        jest.spyOn(directeurEtudeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ directeurEtude });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(directeurEtudeService.update).toHaveBeenCalledWith(directeurEtude);
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
