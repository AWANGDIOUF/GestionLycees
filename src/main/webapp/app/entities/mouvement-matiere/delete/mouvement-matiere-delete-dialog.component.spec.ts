jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { MouvementMatiereService } from '../service/mouvement-matiere.service';

import { MouvementMatiereDeleteDialogComponent } from './mouvement-matiere-delete-dialog.component';

describe('Component Tests', () => {
  describe('MouvementMatiere Management Delete Component', () => {
    let comp: MouvementMatiereDeleteDialogComponent;
    let fixture: ComponentFixture<MouvementMatiereDeleteDialogComponent>;
    let service: MouvementMatiereService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MouvementMatiereDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(MouvementMatiereDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MouvementMatiereDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(MouvementMatiereService);
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
