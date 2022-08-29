jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { LyceesTechniquesService } from '../service/lycees-techniques.service';
import { ILyceesTechniques, LyceesTechniques } from '../lycees-techniques.model';

import { LyceesTechniquesUpdateComponent } from './lycees-techniques-update.component';

describe('Component Tests', () => {
  describe('LyceesTechniques Management Update Component', () => {
    let comp: LyceesTechniquesUpdateComponent;
    let fixture: ComponentFixture<LyceesTechniquesUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let lyceesTechniquesService: LyceesTechniquesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [LyceesTechniquesUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(LyceesTechniquesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LyceesTechniquesUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      lyceesTechniquesService = TestBed.inject(LyceesTechniquesService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const lyceesTechniques: ILyceesTechniques = { id: 456 };

        activatedRoute.data = of({ lyceesTechniques });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(lyceesTechniques));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<LyceesTechniques>>();
        const lyceesTechniques = { id: 123 };
        jest.spyOn(lyceesTechniquesService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ lyceesTechniques });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: lyceesTechniques }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(lyceesTechniquesService.update).toHaveBeenCalledWith(lyceesTechniques);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<LyceesTechniques>>();
        const lyceesTechniques = new LyceesTechniques();
        jest.spyOn(lyceesTechniquesService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ lyceesTechniques });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: lyceesTechniques }));
        saveSubject.complete();

        // THEN
        expect(lyceesTechniquesService.create).toHaveBeenCalledWith(lyceesTechniques);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<LyceesTechniques>>();
        const lyceesTechniques = { id: 123 };
        jest.spyOn(lyceesTechniquesService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ lyceesTechniques });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(lyceesTechniquesService.update).toHaveBeenCalledWith(lyceesTechniques);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
