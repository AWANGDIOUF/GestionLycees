jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { LyceesTechniquesService } from '../service/lycees-techniques.service';

import { LyceesTechniquesDeleteDialogComponent } from './lycees-techniques-delete-dialog.component';

describe('Component Tests', () => {
  describe('LyceesTechniques Management Delete Component', () => {
    let comp: LyceesTechniquesDeleteDialogComponent;
    let fixture: ComponentFixture<LyceesTechniquesDeleteDialogComponent>;
    let service: LyceesTechniquesService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [LyceesTechniquesDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(LyceesTechniquesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LyceesTechniquesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(LyceesTechniquesService);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({})));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        jest.spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.close).not.toHaveBeenCalled();
        expect(mockActiveModal.dismiss).toHaveBeenCalled();
      });
    });
  });
});
